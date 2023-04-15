import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv'

// Setting up env variables
dotenv.config()

// Initializing OpenAI session
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}); 

const openai = new OpenAIApi(configuration);

// Starting the server
const app = express()

// Adding middleware functions to the express server
app.use(express.json())
app.use(cors());

// Server Routes
app.get('/', (req, res) => {
  res.status(200).send("Welcome to AI Image Generator")
})

app.post('/magic', async (req, res) => {

try {
  const response = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: "1024x1024",
    });
  const image_url = response.data.data[0].url;
  
  res.status(200).json({
    imageUrl: image_url
  })
} catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message || 'Something went wrong')
}

})

app.listen(8080, () => console.log("Server listening on port 8080"))