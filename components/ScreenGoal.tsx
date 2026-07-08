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
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, marginTop: 4 }}>
          得意なクラブは何番ですか？
        </h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 16, lineHeight: 1.6 }}>
          「これだけは自信がある」というクラブを1本選んでください。<br />
          そのクラブを基準にセット全体を組み直します。
        </p>

        <SingleChips
          options={[
            { label: 'ドライバー' },
            { label: '3番ウッド（スプーン）' },
            { label: 'ユーティリティ（UT）' },
            { label: 'アイアン（4〜6番）' },
            { label: 'アイアン（7〜9番）' },
            { label: 'ピッチングウェッジ（PW）' },
          ]}
          value={answers.favoriteClub}
          onChange={v => update({ favoriteClub: v })}
        />

        {answers.favoriteClub && (
          <>
            <div style={{ marginBottom: 6, fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>
              そのクラブが好きな理由（複数OK）
            </div>
            <MultiChips
              options={['飛距離が出る', '方向が安定する', '打感が好き', '弾道が気持ちいい', '振りやすい・軽い']}
              values={answers.favoriteReasons || []}
              onChange={v => update({ favoriteReasons: v })}
            />
          </>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, marginTop: 4 }}>
          いちばん手に入れたいのは？
        </h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 14 }}>
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
              width: '100%', padding: '14px 16px', marginBottom: 8,
              border: `1.5px solid ${answers.goal === o.label ? '#2d7a4f' : '#e0e0e0'}`,
              borderRadius: 12, background: answers.goal === o.label ? '#e8f5ed' : 'white',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: answers.goal === o.label ? 600 : 400, color: answers.goal === o.label ? '#1a4a2e' : '#1a1a1a' }}>
              {o.label}
            </div>
            <div style={{ fontSize: 12, color: answers.goal === o.label ? '#2d7a4f' : '#aaa', marginTop: 3 }}>
              {o.sub}
            </div>
          </button>
        ))}
      </div>
      <div className="screen-footer">
        <button className="btn-main" onClick={onNext} disabled={!valid}>次へ</button>
      </div>
    </div>
  )
}
