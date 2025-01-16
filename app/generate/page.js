"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const Generate = () => {
  const searchParams = useSearchParams();

  // const [link, setLink] = useState("")
  // const [linktext, setlinktext] = useState("")
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [picture, setpicture] = useState("");
  const [description, setDescription] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    async function getData(params) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        handle: handle,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const r = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/get`,
        requestOptions
      );
      const result = await r.json();
      if(result.success){
        const links = result.result.links;
        console.log(links)
        if (!links) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      }
      else{
        setDisable(true);
      }
    }
    console.log(handle)
    getData();
  }, []);

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linktext };
        } else {
          return item;
        }
      });
    });
  };

  const addLink = () => {
    setLinks(links.concat([{ link: "", linktext: "" }]));
  };

  const submitLink = async (links, handle, picture) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handle_1 = handle.toLowerCase();

    const raw = JSON.stringify({
      links: links,
      handle: handle_1,
      picture: picture,
      description: description,
    });

    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/add`,
      requestOptions
    );
    const result = await r.json();
    if (result.success) {
      toast.success(result.message);
      setLinks([{ link: "", linktext: "" }]);
      setHandle("");
      setpicture("");
    } else {
      toast.error(result.message);
    }
  };

  const copyToClipboard = () => {
    const link = `${process.env.NEXT_PUBLIC_HOST}/${handle}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch(err => {
      toast.error("Failed to copy link.");
    });
  };

  return (
    <div className="bg-[#225abf] min-h-screen grid grid-cols-2">
      <div className="col1 flex items-center justify-center flex-col gap-3 text-white ml-28">
        <div className="flex flex-col gap-4 my-2 w-[100%] mt-16">
          <h1 className="font-bold text-5xl">Create your Link Tree</h1>
          <h1 className="font-bold text-xl">Step 1 : Claim your handle</h1>
          <input
            type="text"
            placeholder="Claim your handle"
            className="p-2 focus:outline-[#225abf] w-1/2 rounded-xl text-black"
            value={handle || ""}
            onChange={(e) => setHandle(e.target.value)}
          ></input>
          <h1 className="font-bold text-xl">
            Step 2 : Add link text and links
          </h1>
          {links &&
            links.map((item, index) => {
              return (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    value={item.linktext || ""}
                    onChange={(e) => {
                      if (e.target.value.length <= 20) {
                        handleChange(index, item.link, e.target.value);
                      }
                    }}
                    className="p-2 focus:outline-[#225abf] w-1/2 rounded-xl text-black"
                    type="text"
                    placeholder="Enter link text"
                  />
                  <input
                    value={item.link || ""}
                    onChange={(e) => {
                      handleChange(index, e.target.value, item.linktext);
                    }}
                    className="p-2 focus:outline-[#225abf] w-1/2 rounded-xl text-black"
                    type="text"
                    placeholder="Enter link"
                  />
                </div>
              );
            })}
          <button
            className="font-bold rounded-full bg-blue-400 hover:bg-blue-500 px-3 py-2 w-fit"
            onClick={() => addLink()}
          >
            + Add link
          </button>
          <h1 className="font-bold text-xl">
            Step 3 : Add profile picture and description
          </h1>
          <input
            type="text"
            placeholder="Enter link to profile picture"
            className="p-2 focus:outline-[#225abf] w-1/2 rounded-xl  text-black"
            value={picture || ""}
            onChange={(e) => setpicture(e.target.value)}
          ></input>
          <textarea
            placeholder="Enter description (maximum 100 characters)"
            className="p-2 focus:outline-[#225abf] w-1/2 rounded-xl  text-black"
            value={description || ""}
            onChange={(e) => {
              if (e.target.value.length < 101) {
                setDescription(e.target.value);
              }
            }}
          ></textarea>
          <button
            disabled={!handle || !picture || links[0].linktext == ""}
            className="disabled:bg-slate-500 font-semibold w-fit rounded-full bg-blue-400 hover:bg-blue-500 px-3 py-2"
            onClick={() => submitLink(links, handle, picture)}
          >
            Create your Linktree
          </button>
          <button
            disabled={disable}
            className="disabled:bg-slate-500 font-semibold w-fit rounded-full bg-blue-400 hover:bg-blue-500 px-3 py-2"
            onClick={() => copyToClipboard()}
          >
            Copy your Linktree link 🔗
          </button>
        </div>
      </div>
      <div className="col2 w-full h-screen">
        <img
          className="h-full object-contain ml-28"
          src="/generate.png"
          alt="generate image"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Generate;
