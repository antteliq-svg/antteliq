'use client'
import { useState } from 'react'
import { Answers } from '../app/page'
import { Topbar, SingleChips } from './UI'

export default function ScreenNotify({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const [email, setEmail] = useState(answers.email || '')
  const notify = answers.notify || []

  const toggleNotify = (v: string) => {
    if (notify.includes(v)) {
      update({ notify: notify.filter(n => n !== v) })
    } else {
      update({ notify: [...notify, v] })
    }
  }

  const valid = notify.length > 0

  return (
    <div className="screen">
      <Topbar step={6} total={6} label="購入意向と受け取り方法" onBack={onBack} progress={90} />

      <div className="screen-body">
        <h2 className="page-title">クラブの買い替え、考えていますか？</h2>
        <p className="page-sub">紹介するクラブの価格帯に反映します。</p>

        <SingleChips
          options={[
            { label: '今すぐ買いたい' },
            { label: '3ヶ月以内に検討' },
            { label: '半年〜1年以内' },
            { label: 'まだ未定' },
          ]}
          value={answers.timing}
          onChange={v => update({ timing: v })}
        />

        <div className="field-label">予算感（任意）</div>
        <SingleChips
          options={[
            { label: '〜3万円' },
            { label: '3〜7万円' },
            { label: '7〜15万円' },
            { label: 'こだわらない' },
          ]}
          value={answers.budget}
          onChange={v => update({ budget: v })}
        />

        <div className="section-divider" />

        <h2 className="page-title">診断結果の受け取り方法</h2>
        <p className="page-sub">複数選択できます。</p>

        <div className="notify-group">
          {[
            { key: 'screen', icon: '📱', label: 'この画面で見る' },
            { key: 'email',  icon: '📧', label: 'メールで受け取る' },
            { key: 'line',   icon: '💬', label: 'LINEで受け取る' },
          ].map(o => (
            <button
              key={o.key}
              className={`notify-btn${notify.includes(o.key) ? ' is-active' : ''}`}
              onClick={() => toggleNotify(o.key)}
            >
              <span className="notify-btn__icon">{o.icon}</span>
              {o.label}
            </button>
          ))}
        </div>

        {notify.includes('email') && (
          <div style={{ marginBottom: 14 }}>
            <div className="field-label">メールアドレス</div>
            <input
              className="text-input"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); update({ email: e.target.value }) }}
              placeholder="example@email.com"
            />
            <p className="hint-text">診断結果のみ送信します。広告メールは送りません。</p>
          </div>
        )}

        {notify.includes('line') && (
          <div className="card card--gold">
            <div className="card__eyebrow">LINE友だち追加</div>
            <p style={{ fontSize: 13, color: 'var(--color-primary)', lineHeight: 1.7 }}>
              診断完了後に友だち追加ページが表示されます。<br />
              追加するとLINEに結果が届きます。
            </p>
          </div>
        )}
      </div>

      <div className="screen-footer">
        <button className="btn btn--primary btn--block" onClick={onNext} disabled={!valid}>
          AIに診断してもらう
        </button>
        {!valid && (
          <p className="hint-text" style={{ textAlign: 'center', marginTop: 8 }}>
            受け取り方法を1つ以上選んでください
          </p>
        )}
      </div>
    </div>
  )
}