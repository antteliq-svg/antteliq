'use client'
import { useState } from 'react'

/* ============================================
   Topbar
   ============================================ */
export function Topbar({
  step, total, label, onBack, progress
}: {
  step: number; total: number; label: string; onBack: () => void; progress: number
}) {
  return (
    <div className="topbar">
      <div className="topbar__row">
        <button className="btn btn--back" onClick={onBack}>← 戻る</button>
        <span className="topbar__step">{step} / {total}</span>
      </div>
      <div className="progress">
        <div className="progress__fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="topbar__label">{label}</div>
    </div>
  )
}

/* ============================================
   HelpPopup
   ============================================ */
export function HelpPopup({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="help-btn" onClick={() => setOpen(v => !v)} aria-label="ヘルプ">?</button>
      {open && <div className="help-popup">{text}</div>}
    </>
  )
}

/* ============================================
   SingleChips
   ============================================ */
export function SingleChips({
  options, value, onChange
}: {
  options: { label: string; sub?: string }[]
  value?: string
  onChange: (v: string) => void
}) {
  return (
    <div className="chip-group">
      {options.map(o => (
        <button
          key={o.label}
          className={`chip${value === o.label ? ' is-active' : ''}`}
          onClick={() => onChange(o.label)}
        >
          <span>{o.label}</span>
          {o.sub && <span className="chip__sub">{o.sub}</span>}
        </button>
      ))}
    </div>
  )
}

/* ============================================
   MultiChips
   ============================================ */
export function MultiChips({
  options, values, onChange
}: {
  options: string[]
  values: string[]
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
    <div className="chip-group">
      {options.map(o => (
        <button
          key={o}
          className={`chip chip--multi${values.includes(o) ? ' is-active' : ''}`}
          onClick={() => toggle(o)}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* ============================================
   ListOption
   ============================================ */
export function ListOption({
  label, sub, active, onClick
}: {
  label: string; sub?: string; active: boolean; onClick: () => void
}) {
  return (
    <button
      className={`option-item${active ? ' is-active' : ''}`}
      onClick={onClick}
    >
      <span className="option-item__text">
        <span className="option-item__label">{label}</span>
        {sub && <span className="option-item__sub">{sub}</span>}
      </span>
      <span className="option-item__radio" />
    </button>
  )
}