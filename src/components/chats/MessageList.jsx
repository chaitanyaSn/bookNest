function MessageList({ messages, currentUserId }) {
    return (
      <div className="space-y-4">
        {messages.map((message) => {
          const isSender = message.senderId === currentUserId;
          
          return (
            <div
              key={message.id}
              className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  isSender
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  isSender ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  export default MessageList; 