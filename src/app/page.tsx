"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessage] = useState([
    {
      role: "assistant",
      content: "Hello, how can I help you today? 😁",
    },
  ]);
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = [...messages];
    temp.push({ role: "user", content: theInput });
    setTheInput("");
    console.log("Calling AI...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: temp }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const { output } = data;

      setMessage((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: output },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle error appropriately, e.g., show a user-friendly message
    } finally {
      setIsLoading(false);
    }
  };

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "user", content: "Hello, who are you?" },
              {
                role: "assistant",
                content: "I am an AI created by OpenAI. How can I help you today?",
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        const { output } = data;

        setMessage((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: output },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 py-5 bg-slate-900">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-sans p-4">Lui Chat</h1>

      <div className="flex flex-col items-center bg-slate-500 rounded-xl hover:drop-shadow-xl shadow-white w-full sm:w-[36rem] lg:w-[40rem]">
        <div className="flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          <p className="text-md font-sans font-bold text-pretty">We are gonna do something here</p>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          {messages.map((e) => (
            <div
              key={e.content}
              className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${e.role === "assistant"
                ? "self-start bg-gray-200 text-gray-800"
                : "self-end bg-gray-800 text-gray-50"
                } `}
            >
              {e.content}
            </div>
          ))}

          {isLoading ? (
            <div className="self-start bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">*thinking*</div>
          ) : (
            ""
          )}
        </div>
        <div className="relative w-full sm:w-[80%] bottom-4 flex justify-center">
          <textarea
            value={theInput}
            onChange={(event) => setTheInput(event.target.value)}
            className="w-full h-10 px-3 py-2 resize-none overflow-y-auto text-black bg-slate-50 rounded-full outline-none"
            onKeyDown={Submit}
          />
          <button
            onClick={callGetResponse}
            className="w-1/4 sm:w-[15%] bg-blue-800 px-4 py-2 cursor-pointer hover:bg-blue-700 rounded-xl ml-3"
          >
            send
          </button>
        </div>
      </div>
    </main>
  );
}
