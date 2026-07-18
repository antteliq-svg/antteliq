'use client'
import { LpPattern } from '../app/page'

const DEFAULT_PATTERN: LpPattern = {
  slug: 'default',
  title: 'OBが止まらないのはクラブのせいかもしれない',
  lead: 'スライス・フックの原因はスイングではなくクラブの可能性があります。あなたのミス傾向から最適解を診断します。',
  cta_text: 'ミスの原因を診断する（無料）',
  content: {
    problem: 'OB・スライス・フックが止まらない',
    features: ['ミス傾向を分析', 'クラブとの相性を診断', '改善策を提案'],
    price_hook: 'フィッティング代¥5,000〜30,000が不要になるかも',
  }
}

export default function ScreenLP({
  pattern, onNext
}: {
  pattern: LpPattern | null
  onNext: () => void
}) {
  const p = pattern || DEFAULT_PATTERN
  const features = p.content?.features || ['ミス傾向を分析', 'クラブとの相性を診断', '改善策を提案']
  const priceHook = p.content?.price_hook || 'フィッティング代¥5,000〜30,000が不要になるかも'

  return (
    <div className="screen">

      <div className="lp-hero">
        <p className="lp-hero__label">GOLF CLUB DIAGNOSIS</p>
        <h1 className="lp-hero__title">{p.title}</h1>
        <p className="lp-hero__sub">{p.lead}</p>
        <div className="lp-stats">
          {[
            ['3 min', '答えるだけ'],
            ['Free', '初回診断'],
            ['AI', '自動解析'],
          ].map(([num, label]) => (
            <div key={num}>
              <div className="lp-stats__num">{num}</div>
              <div className="lp-stats__label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-features">
        <p className="lp-features__title">この診断でわかること</p>
        {features.map(text => (
          <div key={text} className="lp-feature-item">
            <span className="lp-feature-item__dot" />
            <span>{text}</span>
          </div>
        ))}
        <div style={{
          marginTop: 20,
          padding: '12px 16px',
          background: 'var(--color-accent-light)',
          border: '1px solid var(--color-accent)',
          borderRadius: 'var(--radius-md)',
          fontSize: 13,
          color: 'var(--color-primary)',
          lineHeight: 1.7,
        }}>
          💡 {priceHook}
        </div>
      </div>

      <div className="lp-cta">
        <button className="btn btn--primary btn--block" onClick={onNext}>
          {p.cta_text}
        </button>
        <p className="lp-cta__note">会員登録不要・クレジットカード不要</p>
      </div>

    </div>
  )
}