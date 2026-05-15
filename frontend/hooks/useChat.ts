"use client";
import { useState, useCallback } from "react";
import { Message } from "../types";
import { sendMessage } from "../lib/api";

export function useChat(language: string, onAiResponse?: (text: string) => void) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: getWelcomeMessage(language),
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendUserMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await sendMessage({ message: text.trim(), language });

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.response,
          sender: "ai",
          timestamp: new Date(),
          isEmergency: response.is_emergency,
        };

        setMessages((prev) => [...prev, aiMessage]);

        // Trigger voice output
        onAiResponse?.(response.response);

      } catch {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "⚠️ Sorry, something went wrong. Please try again.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [language, isLoading, onAiResponse]
  );

  const clearChat = useCallback((newLanguage: string) => {
    window.speechSynthesis?.cancel();
    setMessages([
      {
        id: "welcome",
        text: getWelcomeMessage(newLanguage),
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return { messages, isLoading, sendUserMessage, clearChat };
}

function getWelcomeMessage(language: string): string {
  const messages: Record<string, string> = {
    "hi-IN": "🙏 नमस्ते! मैं स्वास्थ्य मित्र हूँ। अपने लक्षण बताइए।",
    "bn-IN": "🙏 নমস্কার! আমি স্বাস্থ্য মিত্র। আপনার লক্ষণগুলি বলুন।",
    "ta-IN": "🙏 வணக்கம்! நான் ஸ்வாஸ்த்ய மித்ரா. உங்கள் அறிகுறிகளை சொல்லுங்கள்.",
    "te-IN": "🙏 నమస్కారం! నేను స్వాస్థ్య మిత్ర. మీ లక్షణాలు చెప్పండి.",
    "or-IN": "🙏 ନମସ୍କାର! ମୁଁ ସ୍ୱାସ୍ଥ୍ୟ ମିତ୍ର। ଆପଣଙ୍କ ଲକ୍ଷଣ କୁହନ୍ତୁ।",
    "mr-IN": "🙏 नमस्कार! मी स्वास्थ्य मित्र. तुमची लक्षणे सांगा.",
  };
  return messages[language] || messages["hi-IN"];
}