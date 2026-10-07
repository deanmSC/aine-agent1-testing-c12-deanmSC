'use client'

import type { Message } from './AgentHarness'

interface AgentOutputProps {
  messages: Message[]
}

export default function AgentOutput({ messages }: AgentOutputProps) {
  return (
    <div className="border border-gray-300 rounded-md h-96 overflow-y-auto p-4 bg-gray-50">
      {messages.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">
          No messages yet. Start a conversation with the agent!
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-100 ml-8'
                  : message.role === 'agent'
                  ? 'bg-green-100 mr-8'
                  : 'bg-red-100'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm text-gray-700 capitalize">
                  {message.role}
                </span>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-900 whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
