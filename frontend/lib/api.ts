import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export interface ChatRequest {
  message: string;
  language: string;
}

export interface ChatResponse {
  response: string;
  language: string;
  is_emergency: boolean;
}

export const sendMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  const { data } = await apiClient.post<ChatResponse>("/api/chat", request);
  return data;
};