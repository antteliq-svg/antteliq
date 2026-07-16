'use client'
import { Answers } from '../app/page'

export default function ScreenResultPaid({ answers, onBack }: { answers: Answers; onBack: () => void }) {
  return (
    <div className="screen">

      <div className="result-header result-header--dark">
        <span className="result-header__title">詳細レポート</span>
        <span className="result-header__badge result-header__badge--premium">PREMIUM</span>
      </div>

      <div className="screen-body">

        <div className="card card--dark">
          <div className="card__eyebrow">FITTING SUMMARY</div>
          <div className="card__title">
            シャフト交換が<br />最優先の改善策
          </div>
          <div className="card__body">
            現行のフレックスはヘッドスピードに対して硬すぎる可能性があります。
            SRまたはRへの変更でスライスが大幅に改善する見込みです。
          </div>
        </div>

        <div className="field-label">詳細推奨</div>

        {[
          {
            cat: 'SHAFT',
            name: 'Fujikura SPEEDER NX 50（SR）',
            reason: '先調子・軽量クラスでつかまりを改善。HS44m/s前後のテンポに合う50g台が適正です。',
            link: '詳細・購入',
          },
          {
            cat: 'FW / UT 構成',
            name: '5W（18°）＋ 22度UT を推奨',
            reason: 'ヘッドスピードから見て3Wのギャップが大きいため、5Wに替えてグリーンを狙えるゾーンを増やします。',
            link: 'おすすめUT一覧',
          },
          {
            cat: 'IRON SET',
            name: '5〜PWの6本セットへ変更',
            reason: '4番アイアンは難易度が高いため、UT22度で代替するとスコアが安定します。',
            link: '詳細を見る',
          },
        ].map(c => (
          <div key={c.cat} className="card">
            <div className="card__eyebrow">{c.cat}</div>
            <div className="card__title" style={{ fontSize: 15 }}>{c.name}</div>
            <div className="card__body" style={{ color: 'var(--color-text-mid)' }}>{c.reason}</div>
            <a className="card__link">{c.link} →</a>
          </div>
        ))}

        <div className="section-divider" />

        <div className="field-label">結果を送る</div>
        <div className="notify-group">
          {[
            { icon: '📧', label: 'メール送信' },
            { icon: '💬', label: 'LINEで送る' },
          ].map(b => (
            <button key={b.label} className="notify-btn">
              <span className="notify-btn__icon">{b.icon}</span>
              {b.label}
            </button>
          ))}
        </div>

        <button className="btn btn--outline btn--block" onClick={onBack}>
          トップへ戻る
        </button>

      </div>
    </div>
  )
}