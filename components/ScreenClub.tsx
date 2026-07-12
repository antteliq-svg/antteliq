'use client'
import { useState } from 'react'
import { Answers } from '../app/page'
import { Topbar, SingleChips, HelpPopup } from './UI'

const DRIVER_SUGGESTIONS = [
  { name: 'TaylorMade ステルス2 HD', type: 'MAX', badge: 'badge-max' },
  { name: 'TaylorMade ステルス2', type: 'STD', badge: 'badge-std' },
  { name: 'TaylorMade ステルス2 Plus', type: 'LS', badge: 'badge-ls' },
  { name: 'Callaway パラダイム MAX', type: 'MAX', badge: 'badge-max' },
  { name: 'Callaway パラダイム', type: 'STD', badge: 'badge-std' },
  { name: 'PING G430 MAX', type: 'MAX', badge: 'badge-max' },
  { name: 'PING G430 LST', type: 'LS', badge: 'badge-ls' },
  { name: 'Titleist TSR2', type: 'STD', badge: 'badge-std' },
  { name: 'Titleist TSR3', type: 'LS', badge: 'badge-ls' },
]

export default function ScreenClub({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const [driverInput, setDriverInput] = useState(answers.driverModel || '')
  const [showSuggest, setShowSuggest] = useState(false)
  const [confirmed, setConfirmed] = useState(!!answers.driverModel)

  const filtered = driverInput.length >= 1
    ? DRIVER_SUGGESTIONS.filter(s => s.name.toLowerCase().includes(driverInput.toLowerCase()))
    : []

  const selectDriver = (name: string, type: string) => {
    setDriverInput(name)
    update({ driverModel: name, driverType: type })
    setShowSuggest(false)
    setConfirmed(true)
  }

  const valid = (!!answers.driverModel || driverInput === 'わからない') && !!answers.driverFlex

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar step={3} total={6} label="今使っているクラブ" onBack={onBack} progress={45} />
      <div className="screen-body">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, marginTop: 4 }}>
          今のドライバーを教えてください
        </h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 18, lineHeight: 1.6 }}>
          いまのクラブと比較することで、何を変えれば改善するかがわかります。
        </p>

        {/* Photo option - paid */}
        <div className="photo-option" style={{ marginBottom: 16 }}>
          <div className="paid-tag">有料オプション</div>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
            写真で自動読み取り
          </div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 12, lineHeight: 1.6 }}>
            ソールとシャフトを撮るだけ。<br />
            メーカー・モデル・スペックをAIが自動判定します。
          </div>
          <div style={{ display: 'inline-block', background: '#fdf6e9', border: '1.5px solid #c8973a', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#92400e', fontWeight: 500 }}>
            詳細レポート（¥1,980）に含まれます
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 16px' }}>
          <div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
          <span style={{ fontSize: 12, color: '#aaa' }}>または名前で入力（無料）</span>
          <div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
        </div>

        <div className="field-label">
          ドライバーのメーカー・モデル名
          <HelpPopup text="クラブのソール（底面）や袋についているタグに書いてあります。メーカー名だけでも入力してみてください。" />
        </div>

        <input
          type="text"
          value={driverInput}
          onChange={e => {
            setDriverInput(e.target.value)
            setShowSuggest(true)
            setConfirmed(false)
            update({ driverModel: undefined, driverType: undefined })
          }}
          placeholder="例：ステルス、G430、パラダイム…"
          style={{
            width: '100%', padding: '12px 14px', border: '1.5px solid #ddd',
            borderRadius: 10, fontSize: 14, marginBottom: 4,
            outline: 'none', color: '#1a1a1a',
          }}
        />

        {showSuggest && filtered.length > 0 && (
          <div className="suggest-list">
            {filtered.map(s => (
              <div key={s.name} className="suggest-item" onClick={() => selectDriver(s.name, s.type)}>
                <span>{s.name}</span>
                <span className={`type-badge ${s.badge}`}>{s.type}</span>
              </div>
            ))}
          </div>
        )}

        {confirmed && answers.driverModel && (
          <div style={{ background: '#F5EFE6', border: '1px solid #B8966E', borderRadius: 6, padding: '10px 14px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#8b6914', fontWeight: 600, marginBottom: 4 }}>✓ {answers.driverModel}</div>
            <div style={{ fontSize: 12, color: '#B8966E' }}>
              {answers.driverType === 'MAX' && '高慣性モーメント・つかまりやすい設計'}
              {answers.driverType === 'LS' && '低スピン・飛距離重視設計'}
              {answers.driverType === 'STD' && 'スタンダード設計'}
              として診断に使います
            </div>
          </div>
        )}

        <button
          className="btn-ghost"
          onClick={() => { setDriverInput('わからない'); update({ driverModel: 'わからない', driverType: 'unknown' }); setConfirmed(true) }}
          style={{ textAlign: 'left', fontSize: 13, color: '#B8966E', padding: '6px 0', marginBottom: 16 }}
        >
          クラブ名がわからない → スキップする
        </button>

        <div className="field-label">
          シャフトの硬さ（フレックス）
          <HelpPopup text="シャフトに「R」「SR」「S」などの刻印があります。わからない場合は「わからない」を選ぶと、ヘッドスピードから推定します。" />
        </div>
        <SingleChips
          options={[
            { label: 'L', sub: '女性向け・柔らかめ' },
            { label: 'A', sub: 'やや柔らかめ' },
            { label: 'R', sub: '一般男性向け' },
            { label: 'SR', sub: '中間' },
            { label: 'S', sub: 'やや硬め' },
            { label: 'X', sub: '上級者向け・硬め' },
            { label: 'わからない', sub: 'HSから推定' },
          ]}
          value={answers.driverFlex}
          onChange={v => update({ driverFlex: v })}
        />

        <div className="field-label" style={{ marginTop: 4 }}>
          アイアンのメーカー・モデル名
          <HelpPopup text="アイアンはドライバーと別メーカーのことも多いです。番手（7番など）の背面に書いてあります。" />
        </div>
        <input
          type="text"
          defaultValue={answers.ironModel}
          onChange={e => update({ ironModel: e.target.value })}
          placeholder="例：MP-20、AP3、G430… わからなければ空欄OK"
          style={{
            width: '100%', padding: '12px 14px', border: '1.5px solid #ddd',
            borderRadius: 10, fontSize: 14, marginBottom: 8, outline: 'none', color: '#1a1a1a',
          }}
        />
        <div className="field-label">アイアンのフレックス</div>
        <SingleChips
          options={[
            { label: 'カーボン', sub: '軽くてやわらかめ' },
            { label: 'スチール・R' },
            { label: 'スチール・S' },
            { label: 'わからない' },
          ]}
          value={answers.ironFlex}
          onChange={v => update({ ironFlex: v })}
        />
      </div>
      <div className="screen-footer">
        <button className="btn-main" onClick={onNext} disabled={!valid}>次へ</button>
        {!valid && <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', marginTop: 8 }}>ドライバーとフレックスを入力してください</p>}
      </div>
    </div>
  )
}
