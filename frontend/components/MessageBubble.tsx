"use client";
import { Message } from "../types";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.sender === "user";
  const time = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (message.isEmergency) {
    return (
      <div className="flex justify-center my-2 px-2">
        <div className="bg-red-600 text-white rounded-2xl px-4 py-3 max-w-sm shadow-lg text-center animate-pulse">
          <p className="text-base font-bold">{message.text}</p>
          <p className="text-xs mt-2 opacity-80">{time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-2`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">
          🏥
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2 shadow-sm ${
          isUser
            ? "bg-[#DCF8C6] text-gray-800 rounded-tr-sm"
            : "bg-white text-gray-800 rounded-tl-sm"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
        <p className={`text-xs mt-1 ${isUser ? "text-right text-green-600" : "text-gray-400"}`}>
          {time} {isUser && "✓✓"}
        </p>
      </div>
    </div>
  );
}