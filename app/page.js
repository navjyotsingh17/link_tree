"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, settext] = useState("linktr.ee/");
  const router = useRouter();

  const createTree = (params) => {
    let link;
    if (text.includes("linktr.ee/")) {
      link = text.split("/")[1];
      console.log(link);
      router.push(`/generate?handle=${link}`);
    }
  };

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex flex-col justify-center ml-[10vw] gap-3">
          <p className="text-[#d2e823] font-bold text-7xl">Everything you</p>
          <p className="text-[#d2e823] font-bold text-7xl">
            are. In one, simple
          </p>
          <p className="text-[#d2e823] font-bold text-7xl">link in bio.</p>
          <p className="text-[#d2e823] text-lg">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="flex mt-8">
            <input
              type="text"
              value={text}
              onChange={(e) => settext(e.target.value.trim())}
              // placeholder="linktr.ee/ yourname"
              className="p-4 rounded-lg border-white"
            ></input>

            <button
              disabled={
                !text.includes("linktr.ee/") || text.split("/")[1] === ""
              }
              className="disabled:bg-slate-500 font-semibold rounded-full bg-[#e9c0e9] p-4 mx-2"
              onClick={() => createTree()}
            >
              Claim your Linktree
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mr-[10vw] mt-20">
          <Image src="/home.png" alt="home image" width={600} height={500} />
        </div>
      </section>
      <section className="bg-[#780016] min-h-[100vh] grid grid-cols-2">
        <div className="flex flex-col justify-center ml-[10vw] gap-3">
          <p className="text-[#e9c0e9] font-bold text-7xl">Everything you</p>
          <p className="text-[#e9c0e9] font-bold text-7xl">
            are. In one, simple
          </p>
          <p className="text-[#e9c0e9] font-bold text-7xl">link in bio.</p>
          <p className="text-[#e9c0e9] text-lg">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="button">
            <Link href="/generate"><button className="w-fit font-semibold rounded-full bg-[#e9c0e9] p-4 mt-4">
              Claim your Linktree
            </button></Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mr-[10vw] mt-20">
          <Image src="/home_2.png" alt="home image" width={600} height={500} />
        </div>
      </section>
    </main>
  );
}
