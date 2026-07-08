'use client'
import { Answers } from '../app/page'
import { Topbar, SingleChips, HelpPopup } from './UI'

export default function ScreenMiss({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const valid = !!answers.missFirst && !!answers.feel && !!answers.trajectory

  const missLabel = (dir: string) => {
    if (dir === '右へ出る') return 'フェースが開いている可能性。スライス系のミスです。'
    if (dir === '左へ出る') return 'フェースが閉じている可能性。引っかけ・フック系のミスです。'
    if (dir === '両方バラバラ') return 'インパクトが安定していない可能性。シャフトの硬さが影響することも。'
    return ''
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar step={5} total={6} label="ミスの傾向と好み" onBack={onBack} progress={75} />
      <div className="screen-body">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, marginTop: 4 }}>
          ミスしたとき、ボールはどちらへ出ますか？
        </h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 14, lineHeight: 1.6 }}>
          打った直後の「出球の方向」を選んでください。<br />
          曲がり方は次の質問で聞きます。
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
              onClick={() => update({ missFirst: o.label })}
            >
              <span className="arrow">{o.arrow}</span>
              {o.label}
            </button>
          ))}
        </div>

        {answers.missFirst && (
          <div style={{ background: '#f4faf6', border: '1px solid #b2d9c0', borderRadius: 10, padding: '10px 13px', marginBottom: 18, fontSize: 13, color: '#1a4a2e', lineHeight: 1.6 }}>
            💡 {missLabel(answers.missFirst)}
          </div>
        )}

        {answers.missFirst && answers.missFirst !== '両方バラバラ' && (
          <>
            <div className="field-label">
              そこからどう動きますか？
              <HelpPopup text="出球方向からさらに曲がるかどうかで、スイングの原因が違います。" />
            </div>
            <SingleChips
              options={[
                { label: 'そのままの方向に飛ぶ', sub: 'プッシュ or プル' },
                { label: 'さらに同じ方向に曲がる', sub: 'スライス or フック' },
                { label: '反対方向に戻ってくる', sub: 'カット打ち系' },
              ]}
              value={answers.missCurve}
              onChange={v => update({ missCurve: v })}
            />
          </>
        )}

        <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, marginTop: 8 }}>
          クラブへの好み
        </h2>

        <div className="field-label">打った感触（打感）の好み</div>
        <SingleChips
          options={[
            { label: '柔らかめが好き', sub: '鍛造アイアンのような感触' },
            { label: 'どちらでもいい' },
            { label: '硬めでもOK', sub: '飛距離や方向性を優先' },
          ]}
          value={answers.feel}
          onChange={v => update({ feel: v })}
        />

        <div className="field-label">弾道の高さの好み</div>
        <SingleChips
          options={[
            { label: '低めの弾道', sub: '風に強い・距離感が出しやすい' },
            { label: 'どちらでもいい' },
            { label: '高い弾道', sub: 'グリーンに止まりやすい' },
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
