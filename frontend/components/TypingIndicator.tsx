export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-2">
      <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">
        🏥
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}