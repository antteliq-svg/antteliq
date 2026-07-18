'use client'
import { useState, useCallback, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../lib/supabase'
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
  lpSlug?: string
}

export type LpPattern = {
  slug: string
  title: string
  lead: string
  cta_text: string
  target?: string
  content?: {
    problem?: string
    features?: string[]
    price_hook?: string
  }
}

function HomeInner() {
  const searchParams = useSearchParams()
  const [screen, setScreen] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [lpPattern, setLpPattern] = useState<LpPattern | null>(null)
  const [loading, setLoading] = useState(true)

  // URLパラメータからスラグ取得
  const slug = searchParams.get('p') || 'default'

  // DBからLPパターン取得
  useEffect(() => {
    const fetchPattern = async () => {
      const { data } = await supabase
        .from('lp_patterns')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (data) {
        setLpPattern(data)
        setAnswers(prev => ({ ...prev, lpSlug: slug }))
      } else {
        // フォールバック：defaultを取得
        const { data: fallback } = await supabase
          .from('lp_patterns')
          .select('*')
          .eq('slug', 'default')
          .single()
        if (fallback) {
          setLpPattern(fallback)
          setAnswers(prev => ({ ...prev, lpSlug: 'default' }))
        }
      }
      setLoading(false)
    }

    fetchPattern()

    // クリック数をカウント
    const countClick = async () => {
      await supabase.rpc('increment_lp_click', { p_slug: slug })
    }
    countClick()
  }, [slug])

  const go = useCallback((n: number) => {
    setScreen(n)
    window.scrollTo(0, 0)
  }, [])

  const update = useCallback((patch: Partial<Answers>) => {
    setAnswers(prev => ({ ...prev, ...patch }))
  }, [])

  if (loading) {
    return (
      <div className="app-outer">
        <div className="app-wrap" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 40 }}>
            <div className="spinner" style={{ width: 32, height: 32, border: '2px solid #E8E4DE', borderTopColor: '#B8966E', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        </div>
      </div>
    )
  }

  const screens: Record<number, React.ReactNode> = {
    0:  <ScreenLP pattern={lpPattern} onNext={() => go(1)} />,
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
    <div className="app-outer">
      <div className="app-wrap">
        {screens[screen]}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  )
}