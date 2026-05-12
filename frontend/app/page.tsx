import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#075E54] text-white px-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🏥</div>
        <h1 className="text-3xl font-bold mb-2">Swasthya Mitra</h1>
        <p className="text-lg mb-1 opacity-90">स्वास्थ्य मित्र</p>
        <p className="text-sm opacity-75 mb-8">
          Regional Language Medical Voice Assistant
        </p>
        <Link
          href="/chat"
          className="bg-[#25D366] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg active:scale-95 transition-transform"
        >
          Start / शुरू करें
        </Link>
      </div>
      <p className="absolute bottom-6 text-xs opacity-50 text-center px-4">
        This is not a substitute for professional medical advice.
      </p>
    </main>
  );
}