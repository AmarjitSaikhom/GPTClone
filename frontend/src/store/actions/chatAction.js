import axios from "../../api/axiosconfic";
import { createChat } from "../reducers/chatSlice";

export const create_new_chat = (chat) => async (dispatch) => {
  try {
    const res = await axios.post("/api/chat", chat, { withCredentials: true });

    dispatch(createChat(res.data.chat));
  } catch (error) {
    console.log("No chat found", error);
  }
};


