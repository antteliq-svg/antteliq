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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar step={6} total={6} label="最後に購入意向と受け取り方法" onBack={onBack} progress={90} />
      <div className="screen-body">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, marginTop: 4 }}>
          クラブの買い替え、考えていますか？
        </h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 14 }}>
          紹介するクラブの価格帯に反映します。
        </p>

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

        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 8, marginTop: 4 }}>予算感（任意）</div>
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

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, marginTop: 8 }}>
          診断結果の受け取り方法
        </h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 14 }}>
          複数選択できます。
        </p>

        <div className="notify-row">
          {[
            { key: 'screen', icon: '📱', label: 'この画面で見る' },
            { key: 'email', icon: '📧', label: 'メールで受け取る' },
            { key: 'line', icon: '💬', label: 'LINEで受け取る' },
          ].map(o => (
            <button
              key={o.key}
              className={`notify-btn${notify.includes(o.key) ? ' active' : ''}`}
              onClick={() => toggleNotify(o.key)}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{o.icon}</div>
              <div style={{ fontSize: 12 }}>{o.label}</div>
            </button>
          ))}
        </div>

        {notify.includes('email') && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 6 }}>メールアドレス</div>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); update({ email: e.target.value }) }}
              placeholder="example@email.com"
              style={{
                width: '100%', padding: '12px 14px', border: '1.5px solid #ddd',
                borderRadius: 10, fontSize: 14, outline: 'none', color: '#1a1a1a',
              }}
            />
            <p style={{ fontSize: 12, color: '#aaa', marginTop: 6 }}>
              診断結果のみ送信します。広告メールは送りません。
            </p>
          </div>
        )}

        {notify.includes('line') && (
          <div style={{ background: '#F5EFE6', border: '1px solid #d4c9b8', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#8B6914', fontWeight: 600, marginBottom: 4 }}>💬 LINE友だち追加</div>
            <div style={{ fontSize: 12, color: '#8B6914', lineHeight: 1.6 }}>
              診断完了後に友だち追加ページが表示されます。<br />
              追加するとLINEに結果が届きます。
            </div>
          </div>
        )}
      </div>
      <div className="screen-footer">
        <button className="btn-main" onClick={onNext} disabled={!valid}>
          AIに診断してもらう
        </button>
        {!valid && <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', marginTop: 8 }}>受け取り方法を1つ以上選んでください</p>}
      </div>
    </div>
  )
}
