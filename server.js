const express = require("express"); // Importing Express using require
const bodyParser = require("body-parser"); // Importing body-parser using require
const dotenv = require("dotenv"); // Importing dotenv using require
const { LlamaCloudApiClient } = require("@llamaindex/cloud"); // Importing LLaMA API client using require

dotenv.config(); // Load environment variables

const apiToken = process.env.API_TOKEN; // Get API token from environment variables

const app = express(); // Create an instance of Express application
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

const llamaAPI = new LlamaCloudApiClient({ token: apiToken }); // Initialize LLaMA API client

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body; // Extract prompt from request body

  try {
    const response = await llamaAPI.chat({ prompt }); // Send prompt to LLaMA API
    res.json({ response: response.output }); // Send back response from LLaMA
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

app.listen(3000, () => console.log("Server running on port 3000")); // Start server