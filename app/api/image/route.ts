import { Response } from "express";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { prompt, num_outputs = 1, resolution = "512x512" } = body.values;

    if (!prompt) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    let startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
        body: JSON.stringify({
          version:
            "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
          input: {
            prompt,
            a_prompt:
              "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning",
            n_prompt:
              "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
            // num_outputs,
            // resolution,
          },
        }),
      }
    );

    console.log(startResponse, ":::::");

    if (startResponse.status !== 201) {
      let error = await startResponse.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }

    const jsonStartResponse = await startResponse.json();

    let endpointUrl = jsonStartResponse.urls.get;

    let restoredImage: string | null = null;
    while (!restoredImage) {
      let finalResponse = await fetch(endpointUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
      });
      let jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        restoredImage = jsonFinalResponse.output;
      } else if (jsonFinalResponse.status === "failed") {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return NextResponse.json(
      restoredImage ? restoredImage : "Failed to restore image"
    );
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
