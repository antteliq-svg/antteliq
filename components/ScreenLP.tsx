'use client'

export default function ScreenLP({ onNext }: { onNext: () => void }) {
  return (
    <div className="screen">

      <div className="lp-hero">
        <p className="lp-hero__label">GOLF CLUB DIAGNOSIS</p>
        <h1 className="lp-hero__title">
          あなたのクラブ、<br />本当に合っていますか？
        </h1>
        <p className="lp-hero__sub">
          いま使っているクラブが合っているか、<br />
          何を変えれば飛距離や方向性が上がるか。<br />
          AIが3〜5分で診断します。
        </p>
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
        <p className="lp-features__title">こんな方に</p>
        {[
          'クラブを初めて買い替えたい',
          '100切りを目指している',
          '自分に合うシャフト硬さがわからない',
          'スライスやフックを直したい',
          '予算内で最適なクラブが知りたい',
        ].map(text => (
          <div key={text} className="lp-feature-item">
            <span className="lp-feature-item__dot" />
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div className="lp-cta">
        <button className="btn btn--primary btn--block" onClick={onNext}>
          無料診断をはじめる
        </button>
        <p className="lp-cta__note">会員登録不要・クレジットカード不要</p>
      </div>

    </div>
  )
}