import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const speechFile = path.resolve("./speech.mp3");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { podcastDescription: input, voiceType } = body;

    if (!input) {
      return new NextResponse("Prompt required", { status: 400 });
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voiceType as SpeechCreateParams["voice"],
      input,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return NextResponse.json(buffer);
  } catch (error) {
    // console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
