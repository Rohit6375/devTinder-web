import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constans";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const socketRef=useRef(null);
  const currentUser = useSelector((store) => store.user);
const userId=currentUser?._id;

  const [targetUser, setTargetUser] = useState(null);
  
  const [newMessage,setNewMessage]=useState("");

  // TEMP messages (later replace with backend)
  const [messages, setMessages] = useState([]);

  const fetchChatMessages=async()=>{
    const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true});
    console.log(chat);
  }

  useEffect(() => {
  fetchTargetUser();
}, [targetUserId]);

  useEffect(() => {
    
    
    socketRef.current=createSocketConnection();
// as soon as the page loaded, the socket connection is made and joinChat event is emitted
    socketRef.current.emit("joinChat",{firstName:currentUser.firstName,userId,targetUserId})

   socketRef.current.on("messageReceived", (data) => {
  setMessages(prev => [...prev, data]);
  console.log(messages);
});


    return ()=>{
      socketRef.current.disconnect();
    }
  }, [userId,targetUserId]);

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/users/" + targetUserId,
        { withCredentials: true }
      );
      setTargetUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    
   socketRef.current.emit("sendMessage",{firstName:currentUser.firstName,senderId:userId,receiverId:targetUserId,text:newMessage,photoUrl:currentUser?.photoUrl});
   setNewMessage("");
  };

  if (!targetUser) return null;

 return (
  <div className="flex justify-center items-center min-h-[80vh]">

    <div className="w-[620px] h-[620px] bg-base-300 rounded-xl shadow-lg flex flex-col">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-3 border-b">

        <img
          src={targetUser.photoUrl}
          className="w-10 h-10 rounded-full"
        />

        <h2 className="font-semibold">
          {targetUser.firstName} {targetUser.lastName}
        </h2>

      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">

        {messages.map((msg, idx) =>{
          return (
            <div key={idx} className={`chat ${msg.senderId === userId ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img src={msg.photoUrl} />
                </div>
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ) 
        }
        )}

      </div>

      {/* INPUT */}
      <div className="p-3 flex gap-2 border-t">

        <input
          className="input input-bordered w-full input-sm"
          placeholder="Type..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button className="btn btn-primary btn-sm" onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  </div>
);

};

export default Chat;
