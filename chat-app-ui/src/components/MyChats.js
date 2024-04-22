import React from 'react'
import { useChatContext } from '../context/ChatProvider'

function MyChats() {
  const { chats } = useChatContext();
  return (
    <div>
        <h1>My Chats</h1>
        <ul>
            {chats.map((chat) => {
            return (
                <li key={chat._id}>
                {chat.chatName}
                </li>
            )
            })}
        </ul>
    </div>
  )
}

export default MyChats