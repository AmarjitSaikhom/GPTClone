// Import the Pinecone library
const { Pinecone } = require("@pinecone-database/pinecone");

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

let cohortGptIndex;

async function getIndex() {
  if (!cohortGptIndex) {
    try {
      cohortGptIndex = pc.index("cohort-gpt");
    } catch (error) {
      console.error("Failed to connect to Pinecone index:", error);
      throw new Error("Vector DB connection error");
    }
  }

  return cohortGptIndex;
}

async function createMemory({ vectors, metadata, messageId }) {
  try {
    const index = await getIndex();

    await index.upsert([
      {
        id: messageId,
        values: vectors,
        metadata,
      },
    ]);
  } catch (error) {
    console.error("Pinecone upsert error:", error);
  }
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
  try {
    const index = await getIndex();

    const data = await index.query({
      vector: queryVector,
      topK: limit,
      filter: metadata ? metadata : undefined,
      includeMetadata: true,
    });

    return data.matches;

  } catch (error) {

    console.error("Pinecone query error:", error);
    
  }
}

module.exports = {
  createMemory,
  queryMemory,
};
