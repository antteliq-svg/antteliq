'use client'

export default function ScreenUpsell({ onPay, onBack }: { onPay: () => void; onBack: () => void }) {
  return (
    <div className="screen screen--dark">
      <div className="dark-topline" />

      <div className="upsell-header">
        <button className="btn btn--back" style={{ color: 'var(--color-accent)' }} onClick={onBack}>
          ← 戻る
        </button>
      </div>

      <div className="upsell-body">
        <p className="eyebrow">PREMIUM REPORT</p>
        <h2 className="page-title page-title--lg" style={{ color: 'white' }}>
          あなただけの<br />フィッティング<br />レポート
        </h2>
        <p className="page-sub" style={{ color: '#888' }}>
          無料診断では見えなかったシャフト・番手構成・ライ角まで、すべてを詳細に提案します。
        </p>

        <div className="upsell-price">
          <span className="upsell-price__num">¥1,980</span>
          <span className="upsell-price__note">税込・買い切り</span>
        </div>

        {[
          ['クラブ写真から自動スペック読み取り', '撮影するだけでAIが判定'],
          ['シャフト銘柄・重量・キックポイント指定', '最適な1本を名指しで提案'],
          ['FW・UTの番手構成とギャップ分析', 'セット全体を最適化'],
          ['ライ角・シャフト長の補正アドバイス', '体格に合わせた微調整'],
          ['PDF形式でメール・LINE送信', 'ショップでそのまま見せられる'],
        ].map(([title, sub]) => (
          <div key={title} className="upsell-benefit">
            <div className="upsell-benefit__dot">
              <span className="upsell-benefit__check">✓</span>
            </div>
            <div>
              <div className="upsell-benefit__title">{title}</div>
              <div className="upsell-benefit__sub">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="upsell-footer">
        <button className="btn btn--gold btn--block" onClick={onPay}>
          購入して詳細を見る
        </button>
        <button
          className="btn btn--outline btn--block"
          style={{ color: '#666', borderColor: 'var(--color-dark-2)', marginTop: 10 }}
          onClick={onBack}
        >
          無料版に戻る
        </button>
        <p className="upsell-footer__note">Stripe決済 · 購入後すぐに閲覧できます</p>
      </div>

    </div>
  )
}