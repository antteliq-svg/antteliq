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

  // DBからサジェスト（補助）
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

  // 入力した文字列をそのまま保存
  const handleDriverInput = (val: string) => {
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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar step={3} total={6} label="今使っているクラブ" onBack={onBack} progress={45} />
      <div className="screen-body">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, marginTop: 4, letterSpacing: '-0.01em' }}>
          今のドライバーを教えてください
        </h2>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 18, lineHeight: 1.7 }}>
          知っている範囲で入力してください。AIが内容を解釈して診断します。
        </p>

        {/* 有料：写真オプション */}
        <div className="photo-option" style={{ marginBottom: 16 }}>
          <div className="paid-tag">有料オプション</div>
          <div style={{ fontSize: 24, marginBottom: 8 }}>📷</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
            写真で自動読み取り
          </div>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 12, lineHeight: 1.6 }}>
            ソールとシャフトを撮るだけ。AIが自動判定します。
          </div>
          <div style={{
            display: 'inline-block',
            background: '#F5EFE6', border: '1px solid #B8966E',
            borderRadius: 4, padding: '6px 12px',
            fontSize: 12, color: '#8B6914', fontWeight: 500,
          }}>
            詳細レポート（¥1,980）に含まれます
          </div>
        </div>

        <div className="divider">
          <div className="divider-line" />
          <span>名前で入力（無料）</span>
          <div className="divider-line" />
        </div>

        <div className="field-label">
          ドライバー名
          <HelpPopup text="メーカー名・モデル名・シャフト名など知っている情報を入力してください。「ステルス2 HD SR」「G430 MAX Sフレックス」のように書いてもOKです。" />
        </div>

        <input
          type="text"
          value={driverInput}
          onChange={e => handleDriverInput(e.target.value)}
          onBlur={() => setTimeout(() => setShowSuggest(false), 200)}
          placeholder="例：ステルス2 HD、G430 MAX、パラダイム…"
          style={{
            width: '100%', padding: '12px 14px',
            border: '1px solid #D4C9B8', borderRadius: 6,
            fontSize: 14, marginBottom: 4,
            outline: 'none', color: '#1a1a1a', background: 'white',
          }}
        />

        {/* サジェスト（補助） */}
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

        <p style={{ fontSize: 11, color: '#bbb', marginBottom: 16, marginTop: 4 }}>
          候補から選ぶか、そのまま入力して次へ進んでもOKです
        </p>

        <button
          className="btn-ghost"
          onClick={() => {
            setDriverInput('わからない')
            update({ driverModel: 'わからない', driverType: 'unknown' })
            setShowSuggest(false)
          }}
          style={{ textAlign: 'left', fontSize: 13, color: '#B8966E', padding: '4px 0', marginBottom: 20 }}
        >
          クラブ名がわからない → スキップする
        </button>

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

        <div style={{ height: 1, background: '#E8E4DE', margin: '4px 0 20px' }} />

        <div className="field-label">
          アイアン名（任意）
          <HelpPopup text="番手の背面に書いてあります。シャフト名・フレックスもわかれば入力してください。" />
        </div>
        <input
          type="text"
          defaultValue={answers.ironModel}
          onChange={e => update({ ironModel: e.target.value })}
          placeholder="例：MP-20 スチールS、T200 カーボンR… 空欄でもOK"
          style={{
            width: '100%', padding: '12px 14px',
            border: '1px solid #D4C9B8', borderRadius: 6,
            fontSize: 14, marginBottom: 12,
            outline: 'none', color: '#1a1a1a', background: 'white',
          }}
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
        <button className="btn-main" onClick={onNext} disabled={!valid}>次へ</button>
        {!valid && (
          <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', marginTop: 8 }}>
            ドライバー名とフレックスを入力してください
          </p>
        )}
      </div>
    </div>
  )
}