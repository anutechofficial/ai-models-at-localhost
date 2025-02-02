import "dotenv/config"; 
import express from "express";
import cors from "cors";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize the chat model
const model = new ChatOllama({
    baseUrl: "http://localhost:11434", 
    model: "llama3.2:1b" 
});

// Create a prompt template
const promptTemplate = PromptTemplate.fromTemplate(`
    You are a helpful assistant. Answer the following question:
    {question}
    `);

    // Create a processing chain
const chain = RunnableSequence.from([
    promptTemplate,
    model,
    new StringOutputParser()
]);

app.get("/", (req, res) => {
    res.send("Welcome to Chat API");
});

app.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    try {
         // Chat memory example
         const messages = [];
         async function chat(userInput) {
             messages.push({ role: "user", content: userInput });
             const response = await model.call(messages);
             messages.push(response);
             return response.content;
         }

        res.json({ reply: await chat(message) });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Failed to process request" });
    }
});

app.post("/chat-completions", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    try {
          // Simple question answering
          const result = await chain.invoke({
            question: message
        });
        res.json({ reply: result});
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Failed to process request" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
