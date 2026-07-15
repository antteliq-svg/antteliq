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
  answers,
  onDone,
}: {
  answers: Answers
  onDone: () => void
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      background: '#1a1a1a',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, #B8966E, #E8C97A, #B8966E)',
      }} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
      }}>
        <div style={{ marginBottom: 40, position: 'relative' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', top: -8, left: -8, animation: 'spin 3s linear infinite' }}>
            <circle cx="40" cy="40" r="36" fill="none" stroke="#B8966E" strokeWidth="0.5" strokeDasharray="4 6" />
          </svg>
          <div style={{
            width: 64, height: 64,
            border: '1px solid #333',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#111',
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <line x1="10" y1="4" x2="10" y2="28" stroke="#B8966E" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 4 L24 9 L10 14 Z" fill="#B8966E" opacity="0.9"/>
              <line x1="4" y1="28" x2="28" y2="28" stroke="#555" strokeWidth="1" strokeLinecap="round"/>
              <circle cx="22" cy="26" r="2.5" fill="white" opacity="0.8"/>
            </svg>
          </div>
        </div>

        <div style={{ fontSize: 10, fontWeight: 600, color: '#B8966E', letterSpacing: '0.16em', marginBottom: 10 }}>
          AI DIAGNOSIS
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em', textAlign: 'center' }}>
          診断しています
        </h2>
        <p style={{ fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 44, lineHeight: 1.7 }}>
          あなたの回答をもとに<br />最適なクラブを選定しています
        </p>

        <div style={{ width: '100%' }}>
          <div style={{ height: 1, background: '#2a2a2a', borderRadius: 1, overflow: 'hidden', marginBottom: 24 }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #B8966E, #E8C97A)',
              width: `${progress}%`,
              transition: 'width 0.8s ease',
            }} />
          </div>

          {STEPS.map((s, i) => (
            <div key={s.label} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              marginBottom: 18,
              opacity: i < step ? 1 : 0.25,
              transition: 'opacity 0.5s ease',
            }}>
              <div style={{
                width: 18, height: 18,
                borderRadius: '50%',
                border: `1px solid ${i < step ? '#B8966E' : '#333'}`,
                background: i < step ? '#B8966E' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 2,
                transition: 'all 0.4s ease',
              }}>
                {i < step && <span style={{ fontSize: 9, color: 'white', fontWeight: 700 }}>✓</span>}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: i < step ? 'white' : '#444', marginBottom: 3 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: i < step ? '#666' : '#333' }}>
                  {s.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}