import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const doc = await collection.findOne({ handle: body.handle });

  if (doc) {
    return Response.json({
      success: false,
      error: true,
      message: "This handle is already taken",
    });
  } else {
    const result = await collection.insertOne(body);

    return Response.json({
      success: true,
      error: false,
      message: "Your link tree has been created successfully",
      result: result,
    });
  }
}
