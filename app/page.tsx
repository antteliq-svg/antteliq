'use client'
import { useState, useCallback } from 'react'
import ScreenLP from '../components/ScreenLP'
import ScreenProfile from '../components/ScreenProfile'
import ScreenScore from '../components/ScreenScore'
import ScreenClub from '../components/ScreenClub'
import ScreenGoal from '../components/ScreenGoal'
import ScreenMiss from '../components/ScreenMiss'
import ScreenNotify from '../components/ScreenNotify'
import ScreenAnalyzing from '../components/ScreenAnalyzing'
import ScreenResult from '../components/ScreenResult'
import ScreenUpsell from '../components/ScreenUpsell'
import ScreenResultPaid from '../components/ScreenResultPaid'

export type Answers = {
  gender?: string
  age?: string
  golfExp?: string
  sports?: string[]
  rounds?: string
  score?: string
  hsMeasure?: string
  hsMethod?: string
  driverModel?: string
  driverType?: string
  driverFlex?: string
  ironModel?: string
  ironFlex?: string
  favoriteClub?: string
  favoriteReasons?: string[]
  goal?: string
  missFirst?: string
  missCurve?: string
  feel?: string
  trajectory?: string
  budget?: string
  timing?: string
  notify?: string[]
  email?: string
}

export default function Home() {
  const [screen, setScreen] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const go = useCallback((n: number) => {
    setScreen(n)
    window.scrollTo(0, 0)
  }, [])

  const update = useCallback((patch: Partial<Answers>) => {
    setAnswers(prev => ({ ...prev, ...patch }))
  }, [])

  const screens: Record<number, React.ReactNode> = {
    0:  <ScreenLP onNext={() => go(1)} />,
    1:  <ScreenProfile answers={answers} update={update} onNext={() => go(2)} onBack={() => go(0)} />,
    2:  <ScreenScore answers={answers} update={update} onNext={() => go(3)} onBack={() => go(1)} />,
    3:  <ScreenClub answers={answers} update={update} onNext={() => go(4)} onBack={() => go(2)} />,
    4:  <ScreenGoal answers={answers} update={update} onNext={() => go(5)} onBack={() => go(3)} />,
    5:  <ScreenMiss answers={answers} update={update} onNext={() => go(6)} onBack={() => go(4)} />,
    6:  <ScreenNotify answers={answers} update={update} onNext={() => go(7)} onBack={() => go(5)} />,
    7:  <ScreenAnalyzing answers={answers} onDone={() => go(8)} />,
    8:  <ScreenResult answers={answers} onUpsell={() => go(9)} onBack={() => go(0)} />,
    9:  <ScreenUpsell onPay={() => go(10)} onBack={() => go(8)} />,
    10: <ScreenResultPaid answers={answers} onBack={() => go(0)} />,
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#F5F5F3',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div className="screen-wrap">
        {screens[screen]}
      </div>
    </div>
  )
}