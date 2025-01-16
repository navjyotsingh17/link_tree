import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle;

  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const item = await collection.findOne({handle});

  if(!item){
    return notFound();
  }

  const item_1 = {
    _id: {
      $oid: "6780f1b3d25570e59ee60bb5",
    },
    links: [
      {
        link: "https://github.com/navjyotsingh17",
        linktext: "github",
      },
    ],
    handle: "navjyot",
    picture: "https://avatars.githubusercontent.com/u/113088362?v=4",
  };

  return (
    <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
      <div className="photo flex flex-col items-center justify-center gap-4">
        <img
          className="h-40 w-4h-40"
          src={item.picture}
          alt="profile_picture"
        />
        <span className="font-bold text-xl">@{item.handle}</span>
        <span className="desc w-80 flex justify-center items-center">
          {item.description}
        </span>
        <div className="links">
          {item.links.map((item, index) => {
            return (
              <Link href={item.link} target="_blank" key={index}>
              <div
                className="py-4 px-2 rounded-md bg-purple-100 hover:bg-purple-200 hover:underline font-bold min-w-96 flex justify-center shadow-lg border border-purple-300 transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {item.linktext}
              </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
