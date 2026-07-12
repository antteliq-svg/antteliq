'use client'
import { Answers } from '../app/page'
import { Topbar, SingleChips, HelpPopup } from './UI'

export default function ScreenMiss({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const valid = !!answers.missFirst && !!answers.feel && !!answers.trajectory

  const getMissAnalysis = () => {
    const first = answers.missFirst
    const curve = answers.missCurve
    if (first === '右へ出る' && curve === 'さらに右へ曲がる') return { type: 'スライス', cause: 'アウトサイドイン軌道＋フェースオープン。つかまりの良いヘッドと先調子シャフトが有効です。' }
    if (first === '右へ出る' && curve === 'そのまま真っすぐ') return { type: 'プッシュ', cause: 'インサイドアウト軌道でフェースがスクエア。シャフトが硬すぎる可能性があります。' }
    if (first === '右へ出る' && curve === '左へ戻ってくる') return { type: 'プッシュフック', cause: 'インサイドアウト軌道＋フェースクローズ。重心距離が短いヘッドが合う可能性があります。' }
    if (first === '左へ出る' && curve === 'さらに左へ曲がる') return { type: 'フック・引っかけ', cause: 'インサイドアウト軌道＋フェースクローズ。オープンフェース設計のヘッドが有効です。' }
    if (first === '左へ出る' && curve === 'そのまま真っすぐ') return { type: 'プル', cause: 'アウトサイドイン軌道でフェースがスクエア。スイング軌道の修正とシャフト見直しが効果的です。' }
    if (first === '左へ出る' && curve === '右へ戻ってくる') return { type: 'プルスライス', cause: 'アウトサイドイン軌道＋フェースオープン。典型的なスライサーのパターンです。' }
    if (first === '両方バラバラ') return { type: 'インパクト不安定', cause: 'シャフトの硬さ・重さがスイングと合っていない可能性が高いです。' }
    return null
  }

  const analysis = getMissAnalysis()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar step={5} total={6} label="ミスの傾向と好み" onBack={onBack} progress={75} />
      <div className="screen-body">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, marginTop: 4, letterSpacing: '-0.01em' }}>
          ミスしたとき球はどちらへ？
        </h2>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 20, lineHeight: 1.7 }}>
          打った直後の出球方向を選んでください。
        </p>

        <div className="miss-grid">
          {[
            { label: '左へ出る', arrow: '↖' },
            { label: '両方バラバラ', arrow: '↕' },
            { label: '右へ出る', arrow: '↗' },
          ].map(o => (
            <button
              key={o.label}
              className={`miss-btn${answers.missFirst === o.label ? ' active' : ''}`}
              onClick={() => update({ missFirst: o.label, missCurve: undefined })}
            >
              <span className="arrow">{o.arrow}</span>
              {o.label}
            </button>
          ))}
        </div>

        {answers.missFirst && answers.missFirst !== '両方バラバラ' && (
          <>
            <div className="field-label" style={{ marginTop: 4 }}>
              そこからどう動きますか？
              <HelpPopup text="出球後の曲がり方でスイングの原因が特定できます。" />
            </div>
            <SingleChips
              options={
                answers.missFirst === '右へ出る'
                  ? [
                      { label: '左へ戻ってくる', sub: 'プッシュフック' },
                      { label: 'そのまま真っすぐ', sub: 'プッシュ' },
                      { label: 'さらに右へ曲がる', sub: 'スライス' },
                      
                    ]
                  : [
                      { label: 'さらに左へ曲がる', sub: 'フック・引っかけ' },
                      { label: 'そのまま真っすぐ', sub: 'プル' },
                      { label: '右へ戻ってくる', sub: 'プルスライス' },
                    ]
              }
              value={answers.missCurve}
              onChange={v => update({ missCurve: v })}
            />
          </>
        )}

        {analysis && (
          <div style={{
            background: '#FAFAF8',
            border: '1px solid #D4C9B8',
            borderRadius: 6,
            padding: '14px 16px',
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#B8966E', letterSpacing: '0.08em', marginBottom: 6 }}>
              ミスタイプ判定
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>
              {analysis.type}
            </div>
            <div style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>
              {analysis.cause}
            </div>
          </div>
        )}

        <div style={{ height: 1, background: '#E8E4DE', margin: '4px 0 20px' }} />

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, letterSpacing: '-0.01em' }}>
          クラブへの好み
        </h2>

        <div className="field-label">打感の好み</div>
        <SingleChips
          options={[
            { label: '柔らかめ', sub: '鍛造・打った感触重視' },
            { label: 'どちらでもいい' },
            { label: '硬めでもOK', sub: '飛距離・方向性を優先' },
          ]}
          value={answers.feel}
          onChange={v => update({ feel: v })}
        />

        <div className="field-label">弾道の高さ</div>
        <SingleChips
          options={[
            { label: '低め', sub: '風に強い・距離感を出しやすい' },
            { label: 'どちらでもいい' },
            { label: '高め', sub: 'グリーンに止まりやすい' },
          ]}
          value={answers.trajectory}
          onChange={v => update({ trajectory: v })}
        />
      </div>
      <div className="screen-footer">
        <button className="btn-main" onClick={onNext} disabled={!valid}>次へ</button>
      </div>
    </div>
  )
}