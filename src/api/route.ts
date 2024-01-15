"use client";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const Configuration = {
  api_key: process.env.OPENAI_API_KEY,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
};

const openai = new OpenAI(Configuration);

export async function handler(req: Request, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ error: "Method not allowed. Use POST method." });
    }

    const body = await req.json();

    const completion = await openai.chat.completions.create({
      messages: body.messages,
      model: "gpt-3.5-turbo",
    });

    const theResponse = completion.choices[0].message.content;

    return res.status(200).json({ output: theResponse });
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
