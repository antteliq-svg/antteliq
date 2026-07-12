'use client'

export default function ScreenUpsell({ onPay, onBack }: { onPay: () => void; onBack: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#1a1a1a', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Gold top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #B8966E, #E8C97A, #B8966E)' }} />

      {/* Header */}
      <div style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#B8966E', fontSize: 13, cursor: 'pointer', padding: 0 }}>
          ← 戻る
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'y-auto', padding: '24px 24px 0' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#B8966E', letterSpacing: '0.12em', marginBottom: 16 }}>
          PREMIUM REPORT
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, marginBottom: 12, letterSpacing: '-0.01em' }}>
          あなただけの<br />フィッティング<br />レポート
        </h2>
        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7, marginBottom: 32 }}>
          無料診断では見えなかったシャフト・番手構成・ライ角まで、すべてを詳細に提案します。
        </p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #2a2a2a' }}>
          <span style={{ fontSize: 36, fontWeight: 600, color: '#B8966E', letterSpacing: '-0.02em' }}>¥1,980</span>
          <span style={{ fontSize: 13, color: '#666' }}>税込・買い切り</span>
        </div>

        {/* Benefits */}
        <div style={{ marginBottom: 32 }}>
          {[
            ['クラブ写真から自動スペック読み取り', '撮影するだけでAIが判定'],
            ['シャフト銘柄・重量・キックポイント指定', '最適な1本を名指しで提案'],
            ['FW・UTの番手構成とギャップ分析', 'セット全体を最適化'],
            ['ライ角・シャフト長の補正アドバイス', '体格に合わせた微調整'],
            ['PDF形式でメール・LINE送信', 'ショップでそのまま見せられる'],
          ].map(([title, sub]) => (
            <div key={title} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                border: '1px solid #B8966E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 1,
              }}>
                <span style={{ fontSize: 9, color: '#B8966E' }}>✓</span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'white', marginBottom: 3 }}>{title}</div>
                <div style={{ fontSize: 11, color: '#666' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 24px 40px', borderTop: '1px solid #2a2a2a', background: '#1a1a1a' }}>
        <button
          onClick={onPay}
          style={{
            width: '100%', padding: '16px',
            background: 'linear-gradient(135deg, #B8966E, #E8C97A)',
            color: 'white', border: 'none', borderRadius: 6,
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
            letterSpacing: '0.03em', marginBottom: 10,
          }}
        >
          購入して詳細を見る
        </button>
        <button onClick={onBack} style={{
          width: '100%', padding: '13px',
          background: 'none', color: '#666',
          border: '1px solid #2a2a2a', borderRadius: 6,
          fontSize: 14, cursor: 'pointer',
        }}>
          無料版に戻る
        </button>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#444', marginTop: 12 }}>
          Stripe決済 · 購入後すぐに閲覧できます
        </p>
      </div>
    </div>
  )
}