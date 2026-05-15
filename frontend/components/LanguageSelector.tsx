"use client";
import { LANGUAGES, Language } from "../types";
import { X } from "lucide-react";

interface Props {
  currentLanguage: string;
  onSelect: (language: Language) => void;
  onClose: () => void;
}

export default function LanguageSelector({ currentLanguage, onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl shadow-2xl z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            भाषा चुनें / Choose Language
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 p-6">
          {LANGUAGES.map((lang: Language) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang)}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                currentLanguage === lang.code
                  ? "border-[#25D366] bg-[#DCF8C6]"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <p className="font-bold text-gray-800 text-base">{lang.name}</p>
                <p className="text-xs text-gray-500">{lang.english}</p>
              </div>
              {currentLanguage === lang.code && (
                <span className="ml-auto text-[#25D366] font-bold">✓</span>
              )}
            </button>
          ))}
        </div>

        <div className="px-6 pb-8">
          <p className="text-xs text-center text-gray-400">
            Language change will start a new conversation
          </p>
        </div>
      </div>
    </div>
  );
}