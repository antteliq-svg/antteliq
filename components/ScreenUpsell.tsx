'use client'
import { Answers } from '../app/page'

export function ScreenUpsell({ onPay, onBack }: { onPay: () => void; onBack: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ padding: '12px 20px', background: 'white', borderBottom: '1px solid #e8e8e8', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#2d7a4f', fontSize: 14, cursor: 'pointer', padding: 0 }}>← 戻る</button>
        <span style={{ fontSize: 14, fontWeight: 600 }}>詳細レポート</span>
      </div>
      <div className="screen-body">
        <div className="gold-card" style={{ marginBottom: 16 }}>
          <div className="gold-badge">詳細診断レポート</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 10, lineHeight: 1.3 }}>
            あなただけの<br />フィッティングレポート
          </h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>¥1,980</span>
            <span style={{ fontSize: 13, color: '#7ec99a' }}>税込・買い切り</span>
          </div>
          {[
            'クラブ写真からスペック自動読み取り',
            'シャフト銘柄・重量・キックポイントを詳細指定',
            'FW・UTの最適番手構成とギャップ分析',
            'ライ角・シャフト長の補正アドバイス',
            'PDF形式でメール・LINE送信',
          ].map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, fontSize: 13, color: 'white' }}>
              <span style={{ color: '#7ec99a', flexShrink: 0, marginTop: 1 }}>✓</span>
              {b}
            </div>
          ))}
        </div>

        <button className="btn-main" onClick={onPay} style={{ background: '#c8973a', marginBottom: 10 }}>
          購入して詳細を見る
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#aaa', marginBottom: 16 }}>
          Stripe決済（クレジットカード対応）<br />購入後すぐに閲覧できます
        </p>
        <button className="btn-sub" onClick={onBack}>無料版に戻る</button>
      </div>
    </div>
  )
}

export default ScreenUpsell
