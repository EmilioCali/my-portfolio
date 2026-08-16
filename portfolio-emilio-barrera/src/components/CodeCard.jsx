const tokenPattern = /(\/\/.*|'.*?'|".*?"|`.*?`|\b(?:import|from|export|const|class|async|await|return|try|catch|throw|new|if|true|false|null)\b)/g

function highlightCode(line) {
  return line.split(tokenPattern).map((token, index) => {
    if (!token) return null
    if (token.startsWith('//')) return <span key={index} className="text-[#6FB1FF]">{token}</span>
    if (/^['"`]/.test(token)) return <span key={index} className="text-[#FFD166]">{token}</span>
    if (/^(true|false|null)$/.test(token)) return <span key={index} className="text-[#B388FF]">{token}</span>
    if (/^(import|from|export|const|class|async|await|return|try|catch|throw|new|if)$/.test(token)) return <span key={index} className="text-[#FF5C8A]">{token}</span>
    return <span key={index}>{token}</span>
  })
}

export default function CodeCard({ fileName, codeLines, variant }) {
  const lines = codeLines.map((line) => (typeof line === 'string' ? { content: line, type: 'normal' } : line))

  return (
    <div className="overflow-hidden rounded-2xl border border-[#6FB1FF]/25 bg-black font-jetbrains text-[10px] leading-5 text-[#E8F0FF] shadow-2xl shadow-black/30 sm:text-xs">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#111218] px-4 py-3 text-[10px] text-[#6FB1FF]">
        <span className="h-2 w-2 rounded-full bg-[#FF5C8A]" />
        <span className="h-2 w-2 rounded-full bg-[#FFD166]" />
        <span className="h-2 w-2 rounded-full bg-[#61E294]" />
        <span className="ml-2 truncate">{fileName}</span>
      </div>
      <div className="max-h-[22rem] overflow-hidden py-3">
        {lines.map(({ content, type }, index) => (
          <div
            key={`${content}-${index}`}
            className={`grid grid-cols-[2.5rem_1fr] px-3 ${
              type === 'added' ? 'bg-emerald-400/10 text-emerald-100' : type === 'removed' ? 'bg-rose-400/10 text-rose-100' : ''
            }`}
          >
            <span className="select-none pr-3 text-right text-[#6FB1FF]/55">{index + 1}</span>
            <code className="min-w-0 overflow-hidden text-ellipsis whitespace-pre">{variant === 'diff' && type === 'added' ? '+ ' : variant === 'diff' && type === 'removed' ? '- ' : ''}{highlightCode(content)}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
