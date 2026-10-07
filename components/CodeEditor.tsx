'use client'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
}

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-96 p-4 font-mono text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        spellCheck={false}
        placeholder="Enter your code here..."
      />
    </div>
  )
}
