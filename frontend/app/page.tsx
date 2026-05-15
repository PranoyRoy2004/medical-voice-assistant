import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#075E54] text-white px-6">
      <div className="text-center max-w-sm">
        <div className="text-7xl mb-6">🏥</div>
        <h1 className="text-4xl font-bold mb-2">Swasthya Mitra</h1>
        <p className="text-xl mb-1 opacity-90 font-medium">स्वास्थ्य मित्र</p>
        <p className="text-xs opacity-50 mb-10 leading-relaxed">
          Regional Language Medical Voice Assistant for Rural India
        </p>
        <Link
          href="/chat"
          className="inline-block bg-[#25D366] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl active:scale-95 transition-transform"
        >
          Start / शुरू करें
        </Link>
        <div className="mt-8 flex flex-wrap justify-center gap-2 opacity-60">
          {["हिंदी", "বাংলা", "தமிழ்", "తెలుగు", "ଓଡ଼ିଆ", "मराठी"].map((lang) => (
            <span key={lang} className="text-xs border border-white/30 px-2 py-1 rounded-full">
              {lang}
            </span>
          ))}
        </div>
      </div>
      <p className="absolute bottom-6 text-xs opacity-40 text-center px-4">
        ⚠️ Not a substitute for professional medical advice
      </p>
    </main>
  );
}