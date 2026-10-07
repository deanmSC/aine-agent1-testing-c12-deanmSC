import AgentHarness from '@/components/AgentHarness'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Agentic Coding Harness
        </h1>
        <AgentHarness />
      </div>
    </main>
  )
}
