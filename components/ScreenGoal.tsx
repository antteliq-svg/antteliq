'use client'
import { Answers } from '../app/page'
import { Topbar, SingleChips, MultiChips } from './UI'

export default function ScreenGoal({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const valid = !!answers.favoriteClub && !!answers.goal

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar step={4} total={6} label="得意なクラブと理想のゴルフ" onBack={onBack} progress={60} />
      <div className="screen-body">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, marginTop: 4, letterSpacing: '-0.01em' }}>
          得意なクラブは何番ですか？
        </h2>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 20, lineHeight: 1.7 }}>
          「これだけは自信がある」というクラブを1本選んでください。
        </p>

        <SingleChips
          options={[
            { label: 'ドライバー' },
            { label: '3番ウッド' },
            { label: 'UT' },
            { label: 'アイアン 4〜6番' },
            { label: 'アイアン 7〜9番' },
            { label: 'PW・ウェッジ' },
          ]}
          value={answers.favoriteClub}
          onChange={v => update({ favoriteClub: v })}
        />

        {answers.favoriteClub && (
          <>
            <div className="field-label">好きな理由（複数OK）</div>
            <MultiChips
              options={['飛距離が出る', '方向が安定する', '打感が好き', '弾道が気持ちいい', '振りやすい']}
              values={answers.favoriteReasons || []}
              onChange={v => update({ favoriteReasons: v })}
            />
          </>
        )}

        <div style={{ height: 1, background: '#E8E4DE', margin: '4px 0 20px' }} />

        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, letterSpacing: '-0.01em' }}>
          いちばん手に入れたいのは？
        </h2>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 16 }}>
          1つだけ選んでください。
        </p>

        {[
          { label: '飛距離をもっと伸ばしたい', sub: 'ドライバーやアイアンで距離アップ' },
          { label: 'もっとまっすぐ飛ばしたい', sub: 'スライスやフックを減らしたい' },
          { label: '弾道を高くしたい', sub: 'グリーンに止まるボールを打ちたい' },
          { label: '打感を良くしたい', sub: '当たった感触がほしい' },
          { label: 'スコアを安定させたい', sub: 'ミスが多い番手を改善したい' },
        ].map(o => (
          <button
            key={o.label}
            onClick={() => update({ goal: o.label })}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: 8,
              border: `1px solid ${answers.goal === o.label ? '#B8966E' : '#E8E4DE'}`,
              borderRadius: 6,
              background: answers.goal === o.label ? '#F5EFE6' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <span style={{ display: 'block', fontSize: 14, fontWeight: answers.goal === o.label ? 600 : 400, color: answers.goal === o.label ? '#8B6914' : '#1a1a1a' }}>
                {o.label}
              </span>
              <span style={{ display: 'block', fontSize: 12, color: answers.goal === o.label ? '#B8966E' : '#bbb', marginTop: 3 }}>
                {o.sub}
              </span>
            </span>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              border: `1.5px solid ${answers.goal === o.label ? '#B8966E' : '#D4C9B8'}`,
              background: answers.goal === o.label ? '#B8966E' : 'white',
              flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {answers.goal === o.label && (
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'white' }} />
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="screen-footer">
        <button className="btn-main" onClick={onNext} disabled={!valid}>次へ</button>
      </div>
    </div>
  )
}