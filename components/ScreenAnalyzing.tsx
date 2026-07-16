'use client'
import { useEffect, useState } from 'react'
import { Answers } from '../app/page'
import { saveAnswers, saveDiagnosis } from '../lib/saveSession'

const STEPS = [
  { label: 'スイングタイプを判定', detail: 'ミス傾向・出球方向を解析中' },
  { label: 'クラブスペックを照合', detail: '現行クラブとのミスマッチを検出中' },
  { label: '最適クラブを選定', detail: 'メーカー横断でマッチングを実行中' },
  { label: 'レポートを生成', detail: 'フィッティングアドバイスを作成中' },
]

function getSwingType(a: Answers): string {
  if (a.missFirst === '右へ出る') return 'スライス傾向'
  if (a.missFirst === '左へ出る') return 'フック傾向'
  return 'バラつき型'
}

export default function ScreenAnalyzing({
  answers, onDone,
}: {
  answers: Answers; onDone: () => void
}) {
  const [step, setStep] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setStep(i + 1), (i + 1) * 900)
    )
    const done = setTimeout(onDone, STEPS.length * 900 + 600)

    if (!saved) {
      setSaved(true)
      const save = async () => {
        const quizAnswerId = await saveAnswers(answers)
        if (quizAnswerId) {
          const swingType = getSwingType(answers)
          await saveDiagnosis({
            quizAnswerId,
            swingType,
            freeResult: { swingType, goal: answers.goal, missFirst: answers.missFirst },
          })
        }
      }
      save()
    }

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(done)
    }
  }, [])

  const progress = (step / STEPS.length) * 100

  return (
    <div className="screen screen--dark">
      <div className="dark-topline" />

      <div className="analyzing-center">

        <div className="analyzing-icon">
          <svg
            width="80" height="80" viewBox="0 0 80 80"
            className="analyzing-icon__ring"
          >
            <circle
              cx="40" cy="40" r="36"
              fill="none" stroke="#B8966E"
              strokeWidth="0.5" strokeDasharray="4 6"
            />
          </svg>
          <div className="analyzing-icon__box">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <line x1="10" y1="4" x2="10" y2="28" stroke="#B8966E" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 4 L24 9 L10 14 Z" fill="#B8966E" opacity="0.9"/>
              <line x1="4" y1="28" x2="28" y2="28" stroke="#555" strokeWidth="1" strokeLinecap="round"/>
              <circle cx="22" cy="26" r="2.5" fill="white" opacity="0.8"/>
            </svg>
          </div>
        </div>

        <p className="eyebrow">AI DIAGNOSIS</p>
        <h2 className="page-title" style={{ color: 'white', textAlign: 'center' }}>
          診断しています
        </h2>
        <p className="page-sub" style={{ color: '#666', textAlign: 'center' }}>
          あなたの回答をもとに<br />最適なクラブを選定しています
        </p>

        <div className="step-list">
          <div className="progress-dark">
            <div className="progress-dark__fill" style={{ width: `${progress}%` }} />
          </div>

          {STEPS.map((s, i) => (
            <div
              key={s.label}
              className={`step-item${i < step ? ' is-done' : ' is-pending'}`}
            >
              <div className="step-item__dot">
                {i < step && <span className="step-item__check">✓</span>}
              </div>
              <div>
                <div className="step-item__label">{s.label}</div>
                <div className="step-item__detail">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}