import { ReactNode } from 'react'

export default function TerritoryCLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="border-b border-neutral-800 bg-neutral-900/50">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold text-neutral-50">Territory C - Professional Efficiency</h1>
              <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
                Power User Interface
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700 rounded">Ctrl+K</kbd>
              <span>Quick Search</span>
              <kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700 rounded ml-2">?</kbd>
              <span>Shortcuts</span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}