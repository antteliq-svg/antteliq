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
    <div className="screen">
      <Topbar step={4} total={6} label="得意なクラブと理想のゴルフ" onBack={onBack} progress={60} />

      <div className="screen-body">
        <h2 className="page-title">得意なクラブは何番ですか？</h2>
        <p className="page-sub">
          「これだけは自信がある」というクラブを1本選んでください。<br />
          そのクラブを基準にセット全体を組み直します。
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

        <div className="section-divider" />

        <h2 className="page-title">いちばん手に入れたいのは？</h2>
        <p className="page-sub">1つだけ選んでください。</p>

        <div className="option-list">
          {[
            { label: '飛距離をもっと伸ばしたい', sub: 'ドライバーやアイアンで距離アップ' },
            { label: 'もっとまっすぐ飛ばしたい', sub: 'スライスやフックを減らしたい' },
            { label: '弾道を高くしたい', sub: 'グリーンに止まるボールを打ちたい' },
            { label: '打感を良くしたい', sub: '当たった感触がほしい' },
            { label: 'スコアを安定させたい', sub: 'ミスが多い番手を改善したい' },
          ].map(o => (
            <button
              key={o.label}
              className={`option-item${answers.goal === o.label ? ' is-active' : ''}`}
              onClick={() => update({ goal: o.label })}
            >
              <span className="option-item__text">
                <span className="option-item__label">{o.label}</span>
                <span className="option-item__sub">{o.sub}</span>
              </span>
              <span className="option-item__radio" />
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