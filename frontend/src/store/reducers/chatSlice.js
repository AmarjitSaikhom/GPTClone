import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  // messages: [],
  selectedChat: null,
  chatMessages: {}, // keyed by chatId
  isLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChat: (state, action) => {
      const newChat = action.payload;
      state.chats.unshift(newChat);
      state.selectedChat = newChat.id;
      state.chatMessages[newChat.id] = [];
    },
    deleteChat: (state, action) => {
      const chatId = action.payload;
      state.chats = state.chats.filter((chat) => chat.id !== chatId);
      delete state.chatMessages[chatId];
      if (state.selectedChat === chatId) {
        state.selectedChat = null;
      }
    },
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    sendMessage: (state, action) => {
      const { chatId, message } = action.payload;

      state.chatMessages[chatId] = [
        ...(state.chatMessages[chatId] || []),
        message,
      ];
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chatMessages[chatId] = messages;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  createChat,
  deleteChat,
  selectChat,
  sendMessage,
  setMessages,
  setLoading,
} = chatSlice.actions;

export default chatSlice.reducer;
