"use client";
import { useState, useRef, useCallback } from "react";
import { Globe, Send } from "lucide-react";
import { Language, LANGUAGES } from "../../types";
import { useChat } from "../../hooks/useChat";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import ChatWindow from "../../components/ChatWindow";
import LanguageSelector from "../../components/LanguageSelector";
import VoiceInputButton from "../../components/VoiceInputButton";
import SpeakerButton from "../../components/SpeakerButton";

export default function ChatPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [inputText, setInputText] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { speak, stop, isSpeaking, isSupported: ttsSupported } =
    useSpeechSynthesis({ language: currentLanguage.code });

  const handleAiResponse = useCallback(
    (text: string) => {
      speak(text);
    },
    [speak]
  );

  const { messages, isLoading, sendUserMessage, clearChat } = useChat(
    currentLanguage.code,
    handleAiResponse
  );

  const handleVoiceResult = useCallback(
    (transcript: string) => {
      setInputText(transcript);
      setTimeout(() => {
        sendUserMessage(transcript);
        setInputText("");
      }, 500);
    },
    [sendUserMessage]
  );

  const handleVoiceError = useCallback((error: string) => {
    setVoiceError(error);
    setTimeout(() => setVoiceError(""), 4000);
  }, []);

  const {
    isListening,
    isSupported: sttSupported,
    interimTranscript,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    language: currentLanguage.code,
    onResult: handleVoiceResult,
    onError: handleVoiceError,
  });

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    stop(); // Stop any ongoing speech
    const text = inputText.trim();
    setInputText("");
    await sendUserMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    stop();
    setCurrentLanguage(lang);
    clearChat(lang.code);
    setShowLanguageSelector(false);
  };

  const getStatusText = () => {
    if (isListening) return `🎤 Listening in ${currentLanguage.name}...`;
    if (isSpeaking) return `🔊 Speaking in ${currentLanguage.name}...`;
    if (isLoading) return "typing...";
    return "Medical Voice Assistant • " + currentLanguage.name;
  };

  return (
    <main className="flex flex-col h-screen max-w-lg mx-auto relative">
      {/* Header */}
      <header className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shadow-md z-10">
        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-xl flex-shrink-0">
          🏥
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-base leading-tight">Swasthya Mitra</h1>
          <p className="text-xs opacity-75 truncate">{getStatusText()}</p>
        </div>
        <button
          onClick={() => { stop(); setShowLanguageSelector(true); }}
          className="flex items-center gap-1.5 bg-[#128C7E] px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-transform"
        >
          <Globe size={14} />
          {currentLanguage.english}
        </button>
      </header>

      {/* Disclaimer Banner */}
      <div className="bg-[#FFF3CD] border-b border-yellow-300 px-4 py-2">
        <p className="text-xs text-yellow-800 text-center">
          ⚠️ This is not a substitute for professional medical advice
        </p>
      </div>

      {/* Voice Error Toast */}
      {voiceError && (
        <div className="bg-red-500 text-white text-xs text-center py-2 px-4">
          {voiceError}
        </div>
      )}

      {/* Listening Indicator */}
      {isListening && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 flex items-center justify-center gap-2">
          <div className="flex gap-1 items-center">
            {[0, 100, 200, 300, 400].map((delay) => (
              <div
                key={delay}
                className="w-1.5 bg-red-500 rounded-full animate-bounce"
                style={{
                  height: delay === 100 || delay === 300 ? "24px" : "16px",
                  animationDelay: `${delay}ms`,
                }}
              />
            ))}
          </div>
          <p className="text-red-600 text-xs font-medium">
            Listening in {currentLanguage.name}...
          </p>
        </div>
      )}

      {/* Speaking Indicator */}
      {isSpeaking && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2 flex items-center justify-center gap-2">
          <div className="flex gap-1 items-center">
            {[0, 150, 300, 150, 0].map((delay, i) => (
              <div
                key={i}
                className="w-1.5 bg-green-500 rounded-full animate-bounce"
                style={{
                  height: i === 2 ? "24px" : i === 1 || i === 3 ? "18px" : "12px",
                  animationDelay: `${delay}ms`,
                }}
              />
            ))}
          </div>
          <p className="text-green-700 text-xs font-medium">
            Speaking in {currentLanguage.name}...
          </p>
          <button onClick={stop} className="text-green-700 text-xs underline ml-1">
            stop
          </button>
        </div>
      )}

      {/* Chat Window */}
      <ChatWindow messages={messages} isLoading={isLoading} />

      {/* Floating stop-speech button */}
      <SpeakerButton
        isSpeaking={isSpeaking}
        isSupported={ttsSupported}
        onStop={stop}
      />

      {/* Input Area */}
      <div className="bg-[#F0F0F0] px-3 py-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 shadow-sm min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={isListening ? interimTranscript || "🎤 Listening..." : inputText}
              onChange={(e) => !isListening && setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder(currentLanguage.code)}
              readOnly={isListening}
              className={`flex-1 outline-none text-sm bg-transparent min-w-0 ${
                isListening ? "text-red-500 italic" : "text-gray-800"
              }`}
            />
          </div>

          <VoiceInputButton
            isListening={isListening}
            isSupported={sttSupported}
            isLoading={isLoading}
            interimTranscript={interimTranscript}
            onStart={() => { stop(); startListening(); }}
            onStop={stopListening}
          />

          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading || isListening}
            className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform disabled:opacity-40"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Language Selector */}
      {showLanguageSelector && (
        <LanguageSelector
          currentLanguage={currentLanguage.code}
          onSelect={handleLanguageSelect}
          onClose={() => setShowLanguageSelector(false)}
        />
      )}
    </main>
  );
}

function getPlaceholder(langCode: string): string {
  const placeholders: Record<string, string> = {
    "hi-IN": "अपने लक्षण लिखें या बोलें...",
    "bn-IN": "লক্ষণ লিখুন বা বলুন...",
    "ta-IN": "அறிகுறிகளை எழுதுங்கள் அல்லது பேசுங்கள்...",
    "te-IN": "లక్షణాలు రాయండి లేదా చెప్పండి...",
    "or-IN": "ଲକ୍ଷଣ ଲେଖନ୍ତୁ ବା କୁହନ୍ତୁ...",
    "mr-IN": "लक्षणे लिहा किंवा बोला...",
  };
  return placeholders[langCode] || "Type or speak your symptoms...";
}