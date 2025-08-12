import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ChatMessage = { role: 'user' | 'ai'; content: string }

interface ChatState {
  messages: ChatMessage[]
  addMessage: (m: ChatMessage) => void
  clear: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
      clear: () => set({ messages: [] }),
    }),
    {
      name: 'ai-chat-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
