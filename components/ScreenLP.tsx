'use client'

export default function ScreenLP({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

      {/* Hero */}
      <div style={{
        background: '#1a1a1a',
        padding: '52px 20px 40px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #B8966E, #E8C97A, #B8966E)' }} />
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: '#B8966E', marginBottom: 20 }}>
          GOLF CLUB DIAGNOSIS
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.35, marginBottom: 16, letterSpacing: '-0.01em' }}>
          あなたのクラブ、<br />本当に合っていますか？
        </h1>
        <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.8 }}>
          いま使っているクラブが合っているか、<br />
          何を変えれば飛距離や方向性が上がるか。<br />
          AIが3〜5分で診断します。
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 28, paddingTop: 24, borderTop: '1px solid #333' }}>
          {[['3 min', '答えるだけ'], ['Free', '初回診断'], ['AI', '自動解析']].map(([n, l]) => (
            <div key={n}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#B8966E' }}>{n}</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '28px 20px', flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: '0.08em', marginBottom: 16 }}>
          こんな方に
        </div>
        {[
          'クラブを初めて買い替えたい',
          '100切りを目指している',
          '自分に合うシャフト硬さがわからない',
          'スライスやフックを直したい',
          '予算内で最適なクラブが知りたい',
        ].map(text => (
          <div key={text} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 0', borderBottom: '1px solid #f0ede8',
            fontSize: 14, color: '#333',
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#B8966E', flexShrink: 0 }} />
            {text}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 20px 40px', background: 'white', borderTop: '1px solid #e8e4de' }}>
        <button className="btn-main" onClick={onNext}>
          無料診断をはじめる
        </button>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 10 }}>
          会員登録不要・クレジットカード不要
        </p>
      </div>
    </div>
  )
}