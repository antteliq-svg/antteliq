'use client'

export default function ScreenLP({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Hero */}
      <div style={{ background: '#1a4a2e', padding: '32px 24px 28px', color: 'white' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#7ec99a', marginBottom: 12 }}>
          AI クラブ診断
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>
          あなたに合う<br />クラブがわかる
        </h1>
        <p style={{ fontSize: 14, color: '#b2d9c0', lineHeight: 1.7 }}>
          いま使っているクラブが合っているか、<br />
          何を変えれば飛距離や方向性が上がるか、<br />
          AIが3〜5分で診断します。
        </p>
        <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
          {[['3分', '答えるだけ'], ['無料', '初回診断'], ['AI', '自動解析']].map(([n, l]) => (
            <div key={n} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 11, color: '#7ec99a', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 20px', flex: 1 }}>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>こんな方に向いています</p>
        {[
          ['🏌️', 'クラブを初めて買い替えたい'],
          ['📉', '100切りを目指している'],
          ['❓', '自分に合うシャフト硬さがわからない'],
          ['↗️', 'スライスやフックを直したい'],
          ['💰', '予算内で最適なクラブが知りたい'],
        ].map(([icon, text]) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid #f0f0f0', fontSize: 14 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
            <span style={{ color: '#1a1a1a' }}>{text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 20px 28px', background: 'white', borderTop: '1px solid #e8e8e8' }}>
        <button className="btn-main" onClick={onNext}>
          無料で診断をはじめる
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#aaa', marginTop: 10 }}>
          会員登録不要・クレジットカード不要
        </p>
      </div>
    </div>
  )
}
