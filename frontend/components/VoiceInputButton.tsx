"use client";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface Props {
  isListening: boolean;
  isSupported: boolean;
  isLoading: boolean;
  interimTranscript: string;
  onStart: () => void;
  onStop: () => void;
}

export default function VoiceInputButton({
  isListening,
  isSupported,
  isLoading,
  interimTranscript,
  onStart,
  onStop,
}: Props) {
  if (!isSupported) {
    return (
      <button
        disabled
        className="w-11 h-11 bg-gray-400 rounded-full flex items-center justify-center shadow-md opacity-50 cursor-not-allowed"
        title="Voice not supported in this browser"
      >
        <MicOff size={20} className="text-white" />
      </button>
    );
  }

  return (
    <div className="relative flex items-center">
      {/* Interim transcript bubble */}
      {isListening && interimTranscript && (
        <div className="absolute bottom-14 right-0 bg-black/80 text-white text-xs px-3 py-2 rounded-2xl max-w-48 text-center whitespace-nowrap overflow-hidden text-ellipsis">
          {interimTranscript}
        </div>
      )}

      {/* Ripple animation when listening */}
      {isListening && (
        <>
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-40 animate-ping" />
          <span className="absolute inline-flex h-14 w-14 rounded-full bg-red-300 opacity-20 animate-ping [animation-delay:300ms]" />
        </>
      )}

      <button
        onClick={isListening ? onStop : onStart}
        disabled={isLoading}
        className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 relative z-10 ${
          isListening
            ? "bg-red-500 scale-110"
            : "bg-[#075E54]"
        } disabled:opacity-40`}
      >
        {isLoading ? (
          <Loader2 size={20} className="text-white animate-spin" />
        ) : isListening ? (
          <MicOff size={20} className="text-white" />
        ) : (
          <Mic size={20} className="text-white" />
        )}
      </button>
    </div>
  );
}