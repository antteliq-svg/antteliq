'use client'
import { useState } from 'react'

export function Topbar({
  step, total, label, onBack, progress
}: {
  step: number; total: number; label: string; onBack: () => void; progress: number
}) {
  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: '#2d7a4f', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
        >
          ← 戻る
        </button>
        <span style={{ fontSize: 12, color: '#aaa' }}>{step} / {total}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>{label}</div>
    </div>
  )
}

export function HelpPopup({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="help-btn" onClick={() => setOpen(v => !v)} aria-label="ヘルプ">?</button>
      {open && (
        <div className="help-popup" style={{ marginTop: 4 }}>
          {text}
        </div>
      )}
    </>
  )
}

export function SingleChips({
  options, value, onChange
}: {
  options: { label: string; sub?: string }[];
  value?: string;
  onChange: (v: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
      {options.map(o => (
        <button
          key={o.label}
          className={`chip-single${value === o.label ? ' active' : ''}`}
          onClick={() => onChange(o.label)}
        >
          {o.label}
          {o.sub && <span style={{ fontSize: 11, opacity: 0.7, display: 'block' }}>{o.sub}</span>}
        </button>
      ))}
    </div>
  )
}

export function MultiChips({
  options, values, onChange
}: {
  options: string[];
  values: string[];
  onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt))
    } else {
      onChange([...values, opt])
    }
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
      {options.map(o => (
        <button
          key={o}
          className={`chip-multi${values.includes(o) ? ' active' : ''}`}
          onClick={() => toggle(o)}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function ListOption({
  label, sub, active, onClick
}: {
  label: string; sub?: string; active: boolean; onClick: () => void
}) {
  return (
    <button className={`list-option${active ? ' active' : ''}`} onClick={onClick} style={{ marginBottom: 8 }}>
      <span>
        <span style={{ display: 'block', fontSize: 15 }}>{label}</span>
        {sub && <span style={{ display: 'block', fontSize: 12, color: active ? '#2d7a4f' : '#888', marginTop: 2 }}>{sub}</span>}
      </span>
      <span className="radio-dot" />
    </button>
  )
}
