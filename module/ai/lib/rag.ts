import { pineconeIndex } from "@/lib/pinecone";
import { embed } from "ai";
import { google } from "@ai-sdk/google";

export async function generateEmbedding(text: string) {
  const { embedding } = await embed({
    model: google.textEmbeddingModel("text-embedding-004"),
    value: text,
  });

  return embedding;
}

export async function indexCodebase(repoId: string, files: { path: string; content: string }[]) {
  const vectors = [];

  // Iterate over each file and:
  // 1) build a text payload that includes the file path + file content,
  // 2) truncate it to 8,000 characters to control embedding limits/cost,
  // 3) generate an embedding vector and collect a Pinecone upsert record (id/values/metadata).
  // If embedding fails for a file, log the error and continue with the next file.
  for (const file of files) {
    const content = `File : ${file.path}\n\n${file.content}`;

    const truncatedContent = content.substring(0, 8000);

    try {
      const embedding = await generateEmbedding(truncatedContent);
      vectors.push({
        id: `${repoId}-${file.path.replace(/\//g, "_")}`,
        values: embedding,
        metadata: {
          repoId,
          path: file.path,
          content: truncatedContent,
        },
      });
    } catch (error) {
      console.error(`Error generating embedding for file ${file.path}`, error);
    }
  }

  if (vectors.length > 0) {
    const batchSize = 100;

    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await pineconeIndex.upsert(batch);
    }
  }

  console.log("indexing complete");
}

export async function retrieveContext(query: string, repoId: string, topK: number = 5) {
  const embedding = await generateEmbedding(query);

  const results = await pineconeIndex.query({
    vector: embedding,
    topK,
    includeMetadata: true,
    filter: {
      repoId,
    },
  });

  return results.matches.map((match) => match.metadata?.content as string).filter(Boolean);
}
