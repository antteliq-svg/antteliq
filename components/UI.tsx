'use client'
import { useState } from 'react'

export function Topbar({
  step, total, label, onBack, progress
}: {
  step: number; total: number; label: string; onBack: () => void; progress: number
}) {
  return (
    <div className="topbar">
      <div className="topbar-row">
        <button className="back-btn" onClick={onBack}>
          ← 戻る
        </button>
        <span style={{ fontSize: 11, color: '#bbb', letterSpacing: '0.04em' }}>{step} / {total}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div style={{ fontSize: 11, color: '#aaa', marginTop: 8, letterSpacing: '0.02em' }}>{label}</div>
    </div>
  )
}

export function HelpPopup({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="help-btn" onClick={() => setOpen(v => !v)} aria-label="ヘルプ">?</button>
      {open && (
        <div className="help-popup" style={{ marginTop: 6 }}>
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
          <span style={{ display: 'block' }}>{o.label}</span>
          {o.sub && (
            <span style={{ display: 'block', fontSize: 10, opacity: 0.7, marginTop: 2 }}>{o.sub}</span>
          )}
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
    <button className={`list-option${active ? ' active' : ''}`} onClick={onClick}>
      <span>
        <span style={{ display: 'block', fontSize: 14 }}>{label}</span>
        {sub && (
          <span style={{ display: 'block', fontSize: 12, color: active ? '#8B6914' : '#aaa', marginTop: 2 }}>
            {sub}
          </span>
        )}
      </span>
      <span className="radio-dot" />
    </button>
  )
}