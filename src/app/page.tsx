"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessage] = useState([
    {
      role: "assistant",
      content: "Hello, how can I help you today? 😁"
    }
  ]);
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({ role: "user", content: theInput });
    setTheInput("");
    console.log("Calling AI...");
  }
  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between px-24 py-5  bg-slate-900"
    >
      <h1 className="text-5xl font-semibold font-sans p-4">Lui Chat</h1>

      <div
        className="flex border-separate-2 border-1 border-slate-300 h-[35rem] w-[40rem] flex-col
         items-center bg-slate-500 rounded-xl  hover:drop-shadow-xl  shadow-white "
      >
        <div
          className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full"
        >
          <p className=" text-md font-sans font-bold text-pretty"> we are gonna do something here </p>
        </div>
        <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          {messages.map((e) => {
            return (
              <div
                key={e.content}
                className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${e.role === "assistant"
                  ? "self-start  bg-gray-200 text-gray-800"
                  : "self-end  bg-gray-800 text-gray-50"
                  } `}
              >
                {e.content}
              </div>
            );
          })}



          {isLoading ? <div className="self-start  bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">*thinking*</div> : ""}
        </div>
        <div className="relative  w-[80%] bottom-4 flex justify-center">
          <textarea value={theInput} onChange={(event) =>
            setTheInput(event.target.value)} className="w-[85%] h-10 px-3 py-2
        resize-none overflow-y-auto text-black bg-slate-50 rounded-full outline-none"
            onKeyDown={Submit} />
          <button
            onClick={callGetResponse}
            className="w-[15%] bg-blue-800 px-4 py-2  cursor-pointer hover:bg-blue-700 rounded-xl ml-3"
          >
            send
          </button>
        </div>
      </div>




    </main>
  )


}