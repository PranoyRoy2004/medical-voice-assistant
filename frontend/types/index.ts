export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  isEmergency?: boolean;
}

export interface Language {
  code: string;
  name: string;
  english: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "hi-IN", name: "हिंदी",  english: "Hindi",   flag: "🇮🇳" },
  { code: "bn-IN", name: "বাংলা",  english: "Bengali", flag: "🟢" },
  { code: "ta-IN", name: "தமிழ்",  english: "Tamil",   flag: "🇮🇳" },
  { code: "te-IN", name: "తెలుగు", english: "Telugu",  flag: "🇮🇳" },
  { code: "or-IN", name: "ଓଡ଼ିଆ",  english: "Odia",    flag: "🟠" },
  { code: "mr-IN", name: "मराठी",  english: "Marathi", flag: "🇮🇳" },
];