import { generatePRSummary, parseCommand, reviewPullRequest } from "@/module/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = request.headers.get("x-github-event");

    if (event === "ping") {
      return NextResponse.json({ message: "Pong" }, { status: 200 });
    }

    if (event === "pull_request") {
      const action = body.action;
      const repo = body.repository.full_name;
      const prNumber = body.number;

      const [owner, repoName] = repo.split("/");

      if (action === "opened" || action === "synchronize") {
        reviewPullRequest(owner, repoName, prNumber)
          .then(() => console.log(`Review completed for ${repo} #${prNumber}`))
          .catch((error) => console.error(`Review failed for ${repo} #${prNumber}:`, error));
      }
    }

    if (event === "issue_comment") {
      const action = body.action;

      if (action === "created") {
        const comment = body.comment.body;
        const repo = body.repository.full_name;
        const prNumber = body.issue.number;
        const isPullRequest = body.issue.pull_request !== undefined;

        // if not a PR comment, return 200
        if (!isPullRequest) {
          return NextResponse.json({ message: "Not a PR comment" }, { status: 200 });
        }

        const command = parseCommand(comment);

        if (command?.type === "summary") {
          const [owner, repoName] = repo.split("/");

          generatePRSummary(owner, repoName, prNumber)
            .then(() => console.log(`Summary generated for ${repo} #${prNumber}`))
            .catch((error) => console.error(`Summary failed for ${repo} #${prNumber}:`, error));
        }
      }
    }

    return NextResponse.json({ message: "Event Processes" }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 });
  }
}
