'use client'
import { useState, useEffect } from 'react'
import { Answers } from '../app/page'
import { Topbar, SingleChips, HelpPopup } from './UI'
import { supabase } from '../lib/supabase'

type ClubSuggestion = {
  name: string
  type: string
  badge: string
}

export default function ScreenClub({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const [driverInput, setDriverInput] = useState(answers.driverModel || '')
  const [showSuggest, setShowSuggest] = useState(false)
  const [suggestions, setSuggestions] = useState<ClubSuggestion[]>([])

  useEffect(() => {
    if (driverInput.length < 1) { setSuggestions([]); return }
    const search = async () => {
      const { data } = await supabase
        .from('club_master')
        .select('maker, model, head_type')
        .eq('category', 'driver')
        .ilike('keywords::text', `%${driverInput}%`)
        .limit(5)
      if (data) {
        setSuggestions(data.map(d => ({
          name: `${d.maker} ${d.model}`,
          type: d.head_type === 'MAX' ? 'MAX' : d.head_type === 'LS' ? 'LS' : 'STD',
          badge: d.head_type === 'MAX' ? 'badge-max' : d.head_type === 'LS' ? 'badge-ls' : 'badge-std',
        })))
      }
    }
    search()
  }, [driverInput])

  const handleInput = (val: string) => {
    setDriverInput(val)
    setShowSuggest(val.length > 0)
    update({ driverModel: val, driverType: 'unknown' })
  }

  const selectSuggest = (name: string, type: string) => {
    setDriverInput(name)
    update({ driverModel: name, driverType: type })
    setShowSuggest(false)
  }

  const valid = !!answers.driverModel && answers.driverModel.length > 0 && !!answers.driverFlex

  return (
    <div className="screen">
      <Topbar step={3} total={6} label="今使っているクラブ" onBack={onBack} progress={45} />

      <div className="screen-body">
        <h2 className="page-title">今のドライバーを教えてください</h2>
        <p className="page-sub">
          知っている範囲で入力してください。AIが内容を解釈して診断します。
        </p>

        <div className="photo-option">
          <span className="photo-option__tag">有料オプション</span>
          <div className="photo-option__icon">📷</div>
          <div className="photo-option__title">写真で自動読み取り</div>
          <p className="photo-option__sub">
            ソールとシャフトを撮るだけ。<br />AIが自動判定します。
          </p>
          <span className="photo-option__badge">詳細レポート（¥1,980）に含まれます</span>
        </div>

        <div className="divider">
          <div className="divider__line" />
          <span className="divider__text">名前で入力（無料）</span>
          <div className="divider__line" />
        </div>

        <div className="field-label">
          ドライバー名
          <HelpPopup text="メーカー名・モデル名など知っている情報を入力してください。「ステルス2 HD SR」のように書いてもOKです。" />
        </div>

        <input
          className="text-input"
          type="text"
          value={driverInput}
          onChange={e => handleInput(e.target.value)}
          onBlur={() => setTimeout(() => setShowSuggest(false), 200)}
          placeholder="例：ステルス2 HD、G430 MAX、パラダイム…"
        />

        {showSuggest && suggestions.length > 0 && (
          <div className="suggest-list">
            {suggestions.map(s => (
              <div key={s.name} className="suggest-item" onClick={() => selectSuggest(s.name, s.type)}>
                <span>{s.name}</span>
                <span className={`type-badge ${s.badge}`}>{s.type}</span>
              </div>
            ))}
          </div>
        )}

        <p className="hint-text">候補から選ぶか、そのまま入力して次へ進んでもOKです</p>

        <button
          className="btn btn--skip"
          onClick={() => {
            setDriverInput('わからない')
            update({ driverModel: 'わからない', driverType: 'unknown' })
            setShowSuggest(false)
          }}
        >
          クラブ名がわからない → スキップする
        </button>

        <div className="section-divider" />

        <div className="field-label">
          シャフトの硬さ（フレックス）
          <HelpPopup text="シャフトに「R」「SR」「S」などの刻印があります。わからない場合はHSから推定します。" />
        </div>
        <SingleChips
          options={[
            { label: 'L', sub: '女性・やわらかめ' },
            { label: 'A', sub: 'シニア向け' },
            { label: 'R', sub: '一般男性向け' },
            { label: 'SR', sub: '中間' },
            { label: 'S', sub: 'やや硬め' },
            { label: 'X', sub: '上級者・硬め' },
            { label: 'わからない', sub: 'HSから推定' },
          ]}
          value={answers.driverFlex}
          onChange={v => update({ driverFlex: v })}
        />

        <div className="section-divider" />

        <div className="field-label">
          アイアン名（任意）
          <HelpPopup text="番手の背面に書いてあります。シャフト名・フレックスもわかれば入力してください。" />
        </div>
        <input
          className="text-input"
          type="text"
          defaultValue={answers.ironModel}
          onChange={e => update({ ironModel: e.target.value })}
          placeholder="例：MP-20 スチールS、T200 カーボンR… 空欄でもOK"
          style={{ marginBottom: 12 }}
        />

        <div className="field-label">アイアンのシャフト</div>
        <SingleChips
          options={[
            { label: 'カーボン', sub: '軽め・やわらかめ' },
            { label: 'スチール R', sub: '一般男性向け' },
            { label: 'スチール S', sub: 'やや硬め' },
            { label: 'わからない' },
          ]}
          value={answers.ironFlex}
          onChange={v => update({ ironFlex: v })}
        />
      </div>

      <div className="screen-footer">
        <button className="btn btn--primary btn--block" onClick={onNext} disabled={!valid}>
          次へ
        </button>
        {!valid && (
          <p className="hint-text" style={{ textAlign: 'center', marginTop: 8 }}>
            ドライバー名とフレックスを入力してください
          </p>
        )}
      </div>
    </div>
  )
}