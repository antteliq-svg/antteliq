'use client'
import { Answers } from '../app/page'
import { Topbar, HelpPopup } from './UI'

type Analysis = { type: string; cause: string } | null

function getMissAnalysis(missFirst?: string, missCurve?: string): Analysis {
  if (missFirst === '右へ出る' && missCurve === 'さらに右へ曲がる') return { type: 'スライス', cause: 'アウトサイドイン軌道＋フェースオープン。つかまりの良いヘッドと先調子シャフトが有効です。' }
  if (missFirst === '右へ出る' && missCurve === 'そのまま真っすぐ')  return { type: 'プッシュ', cause: 'インサイドアウト軌道でフェースがスクエア。シャフトが硬すぎる可能性があります。' }
  if (missFirst === '右へ出る' && missCurve === '左へ戻ってくる')    return { type: 'プッシュフック', cause: 'インサイドアウト軌道＋フェースクローズ。重心距離が短いヘッドが合う可能性があります。' }
  if (missFirst === '左へ出る' && missCurve === 'さらに左へ曲がる')  return { type: 'フック・引っかけ', cause: 'インサイドアウト軌道＋フェースクローズ。オープンフェース設計のヘッドが有効です。' }
  if (missFirst === '左へ出る' && missCurve === 'そのまま真っすぐ')  return { type: 'プル', cause: 'アウトサイドイン軌道でフェースがスクエア。スイング軌道の修正とシャフト見直しが効果的です。' }
  if (missFirst === '左へ出る' && missCurve === '右へ戻ってくる')    return { type: 'プルスライス', cause: 'アウトサイドイン軌道＋フェースオープン。典型的なスライサーのパターンです。' }
  if (missFirst === '両方バラバラ') return { type: 'インパクト不安定', cause: 'シャフトの硬さ・重さがスイングと合っていない可能性が高いです。' }
  return null
}

export default function ScreenMiss({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const valid = !!answers.missFirst && !!answers.feel && !!answers.trajectory
  const analysis = getMissAnalysis(answers.missFirst, answers.missCurve)

  return (
    <div className="screen">
      <Topbar step={5} total={6} label="ミスの傾向と好み" onBack={onBack} progress={75} />

      <div className="screen-body">
        <h2 className="page-title">ミスしたとき球はどちらへ？</h2>
        <p className="page-sub">打った直後の出球方向を選んでください。</p>

        <div className="miss-grid">
          {[
            { label: '左へ出る', arrow: '↖' },
            { label: '両方バラバラ', arrow: '↕' },
            { label: '右へ出る', arrow: '↗' },
          ].map(o => (
            <button
              key={o.label}
              className={`miss-btn${answers.missFirst === o.label ? ' is-active' : ''}`}
              onClick={() => update({ missFirst: o.label, missCurve: undefined })}
            >
              <span className="miss-btn__arrow">{o.arrow}</span>
              {o.label}
            </button>
          ))}
        </div>

        {answers.missFirst && answers.missFirst !== '両方バラバラ' && (
          <>
            <div className="field-label">
              そこからどう動きますか？
              <HelpPopup text="出球後の曲がり方でスイングの原因が特定できます。" />
            </div>

            {answers.missFirst === '右へ出る' ? (
              <div className="curve-grid">
                <button
                  className={`curve-btn${answers.missCurve === '左へ戻ってくる' ? ' is-active' : ''}`}
                  onClick={() => update({ missCurve: '左へ戻ってくる' })}
                >
                  <span className="curve-btn__arrow">↩</span>
                  左へ戻る
                  <span style={{ display: 'block', fontSize: 10, marginTop: 3, opacity: 0.7 }}>プッシュフック</span>
                </button>
                <button
                  className={`curve-btn${answers.missCurve === 'そのまま真っすぐ' ? ' is-active' : ''}`}
                  onClick={() => update({ missCurve: 'そのまま真っすぐ' })}
                >
                  <span className="curve-btn__arrow">↑</span>
                  そのまま
                  <span style={{ display: 'block', fontSize: 10, marginTop: 3, opacity: 0.7 }}>プッシュ</span>
                </button>
                <button
                  className={`curve-btn${answers.missCurve === 'さらに右へ曲がる' ? ' is-active' : ''}`}
                  onClick={() => update({ missCurve: 'さらに右へ曲がる' })}
                >
                  <span className="curve-btn__arrow">↪</span>
                  さらに右
                  <span style={{ display: 'block', fontSize: 10, marginTop: 3, opacity: 0.7 }}>スライス</span>
                </button>
              </div>
            ) : (
              <div className="curve-grid">
                <button
                  className={`curve-btn${answers.missCurve === 'さらに左へ曲がる' ? ' is-active' : ''}`}
                  onClick={() => update({ missCurve: 'さらに左へ曲がる' })}
                >
                  <span className="curve-btn__arrow">↩</span>
                  さらに左
                  <span style={{ display: 'block', fontSize: 10, marginTop: 3, opacity: 0.7 }}>フック</span>
                </button>
                <button
                  className={`curve-btn${answers.missCurve === 'そのまま真っすぐ' ? ' is-active' : ''}`}
                  onClick={() => update({ missCurve: 'そのまま真っすぐ' })}
                >
                  <span className="curve-btn__arrow">↑</span>
                  そのまま
                  <span style={{ display: 'block', fontSize: 10, marginTop: 3, opacity: 0.7 }}>プル</span>
                </button>
                <button
                  className={`curve-btn${answers.missCurve === '右へ戻ってくる' ? ' is-active' : ''}`}
                  onClick={() => update({ missCurve: '右へ戻ってくる' })}
                >
                  <span className="curve-btn__arrow">↪</span>
                  右へ戻る
                  <span style={{ display: 'block', fontSize: 10, marginTop: 3, opacity: 0.7 }}>プルスライス</span>
                </button>
              </div>
            )}
          </>
        )}

        {analysis && (
          <div className="card card--gold" style={{ marginBottom: 20 }}>
            <div className="card__eyebrow">ミスタイプ判定</div>
            <div className="card__title" style={{ fontSize: 16, color: 'var(--color-text)' }}>
              {analysis.type}
            </div>
            <div className="card__body" style={{ color: 'var(--color-text-mid)' }}>
              {analysis.cause}
            </div>
          </div>
        )}

        <div className="section-divider" />

        <h2 className="page-title">クラブへの好み</h2>

        <div className="field-label">打感の好み</div>
        <div className="chip-group">
          {[
            { label: '柔らかめ', sub: '鍛造・打った感触重視' },
            { label: 'どちらでもいい' },
            { label: '硬めでもOK', sub: '飛距離・方向性を優先' },
          ].map(o => (
            <button
              key={o.label}
              className={`chip${answers.feel === o.label ? ' is-active' : ''}`}
              onClick={() => update({ feel: o.label })}
            >
              <span>{o.label}</span>
              {o.sub && <span className="chip__sub">{o.sub}</span>}
            </button>
          ))}
        </div>

        <div className="field-label">弾道の高さ</div>
        <div className="chip-group">
          {[
            { label: '低め', sub: '風に強い・距離感を出しやすい' },
            { label: 'どちらでもいい' },
            { label: '高め', sub: 'グリーンに止まりやすい' },
          ].map(o => (
            <button
              key={o.label}
              className={`chip${answers.trajectory === o.label ? ' is-active' : ''}`}
              onClick={() => update({ trajectory: o.label })}
            >
              <span>{o.label}</span>
              {o.sub && <span className="chip__sub">{o.sub}</span>}
            </button>
          ))}
        </div>

      </div>

      <div className="screen-footer">
        <button className="btn btn--primary btn--block" onClick={onNext} disabled={!valid}>
          次へ
        </button>
      </div>
    </div>
  )
}