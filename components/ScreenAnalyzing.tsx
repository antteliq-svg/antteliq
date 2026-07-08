'use client'
import { useEffect, useState } from 'react'

const STEPS = [
  'スイングタイプを判定中…',
  '現行クラブとのミスマッチを解析中…',
  'メーカー横断でクラブを選定中…',
  '診断レポートを作成中…',
]

export default function ScreenAnalyzing({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setStep(i + 1), (i + 1) * 900)
    )
    const done = setTimeout(onDone, STEPS.length * 900 + 600)
    return () => { timers.forEach(clearTimeout); clearTimeout(done) }
  }, [onDone])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '40px 24px' }}>
      <div style={{ background: '#1a4a2e', width: 72, height: 72, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 32 }}>
        🏌️
      </div>
      <div className="spinner" style={{ marginBottom: 24 }} />
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
        AIが診断しています
      </h2>
      <p style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 32, lineHeight: 1.6 }}>
        あなたの回答をもとに<br />最適なクラブを選定しています
      </p>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: i < step ? '#1a4a2e' : '#bbb' }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: i < step ? '#2d7a4f' : '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', flexShrink: 0 }}>
              {i < step ? '✓' : i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}
