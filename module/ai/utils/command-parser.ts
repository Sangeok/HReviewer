import { PRCommand } from "../types";

export function parseCommand(comment: string): PRCommand | null {
  const normalizedComment = comment.trim().toLowerCase();
  const commandPattern = /^[/@]hreviewer\s+(summary|review)/;
  const match = normalizedComment.match(commandPattern);

  if (!match) {
    return null;
  }

  return { type: match[1] as "summary" | "review" };
}
