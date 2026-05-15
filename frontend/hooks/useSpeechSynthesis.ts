"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface UseSpeechSynthesisOptions {
  language: string;
}

export function useSpeechSynthesis({ language }: UseSpeechSynthesisOptions) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [language]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return;

      window.speechSynthesis.cancel();

      const cleanText = text
        .replace(/[\u{1F600}-\u{1F6FF}]/gu, "")
        .replace(/[\u{2700}-\u{27BF}]/gu, "")
        .replace(/⚠️|🚨|🙏|✓/g, "")
        .replace(/\n+/g, ". ")
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language;
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(
        (v) => v.lang === language || v.lang.startsWith(language.split("-")[0])
      );
      if (matchingVoice) utterance.voice = matchingVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, language]
  );

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return { isSpeaking, isSupported, speak, stop };
}