"use client";
import { Volume2 } from "lucide-react";

interface Props {
  isSpeaking: boolean;
  isSupported: boolean;
  onStop: () => void;
}

export default function SpeakerButton({ isSpeaking, isSupported, onStop }: Props) {
  if (!isSupported || !isSpeaking) return null;

  return (
    <button
      onClick={onStop}
      className="fixed bottom-24 right-4 z-50 bg-[#075E54] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium animate-pulse"
    >
      <Volume2 size={16} />
      Speaking... tap to stop
    </button>
  );
}