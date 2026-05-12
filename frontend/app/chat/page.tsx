export default function ChatPage() {
  return (
    <main className="flex flex-col h-screen bg-[#ECE5DD]">
      <header className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-xl">
          🏥
        </div>
        <div>
          <h1 className="font-semibold text-base">Swasthya Mitra</h1>
          <p className="text-xs opacity-75">Medical Voice Assistant</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {/* Messages will go here in Phase 3 */}
        <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm self-start">
          <p className="text-sm text-gray-800">
            नमस्ते! मैं Swasthya Mitra हूँ। आप अपने लक्षण बताइए।
          </p>
          <p className="text-xs text-gray-400 mt-1 text-right">✓✓</p>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <p className="text-xs text-center text-gray-500">
          ⚠️ This is not a substitute for professional medical advice.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <input
            type="text"
            placeholder="Type or speak your symptoms..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          />
          <button className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow">
            🎤
          </button>
        </div>
      </div>
    </main>
  );
}