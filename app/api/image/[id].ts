import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    `https://api.replicate.com/v1/predictions${req.query.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    }
  );

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    return new NextResponse(JSON.stringify({ detail: error.detail }));
  }

  const predictiion = await response.json();
  return NextResponse.json(predictiion);
}
