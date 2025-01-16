import clientPromise from "@/lib/mongodb";
import { Result } from "postcss";

export async function POST(req) {
  const body = await req.json();
  const { handle } = body;
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const doc = await collection.findOne({handle});
  console.log(doc)

  if (doc) {
    return Response.json({
      success: true,
      error: false,
      message: "Data found",
      result: doc
    });
  } else {
    return Response.json({
      success: false,
      error: true,
      message: "Not data found",
    });
  }
}
