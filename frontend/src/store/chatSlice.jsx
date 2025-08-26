import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (messageData) => {
        const response = await axios.post('/api/chat/send', messageData);
        return response.data;
    }
);

// Async thunk for fetching chat history
export const fetchChatHistory = createAsyncThunk(
    'chat/fetchHistory',
    async () => {
        const response = await axios.get('/api/chat/history');
        return response.data;
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        conversations: [],
        currentConversation: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },
        clearChat: (state) => {
            state.messages = [];
            state.currentConversation = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle sendMessage
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle fetchChatHistory
            .addCase(fetchChatHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchChatHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.conversations = action.payload;
            })
            .addCase(fetchChatHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCurrentConversation, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
