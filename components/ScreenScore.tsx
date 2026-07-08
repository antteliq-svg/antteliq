'use client'
import { useState } from 'react'
import { Answers } from '../app/page'
import { Topbar, SingleChips, ListOption, HelpPopup } from './UI'

export default function ScreenScore({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const [showHsHelp, setShowHsHelp] = useState(false)
  const valid = !!answers.score && !!answers.hsMeasure

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar step={2} total={6} label="スコアとパワーを教えてください" onBack={onBack} progress={30} />
      <div className="screen-body">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, marginTop: 4 }}>
          今のプレーレベル
        </h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>
          正直に答えるほど診断が正確になります。
        </p>

        <div className="field-label">平均スコア（18ホール）</div>
        {[
          { label: '70台（シングルプレーヤー）', sub: undefined },
          { label: '80〜89', sub: undefined },
          { label: '90〜99', sub: '100切り目前' },
          { label: '100〜109', sub: '100切りを目指している' },
          { label: '110〜119', sub: undefined },
          { label: '120以上 or わからない', sub: undefined },
        ].map(o => (
          <ListOption
            key={o.label}
            label={o.label}
            sub={o.sub}
            active={answers.score === o.label}
            onClick={() => update({ score: o.label })}
          />
        ))}

        <div className="field-label" style={{ marginTop: 8 }}>
          ドライバーのヘッドスピード
          <button className="help-btn" onClick={() => setShowHsHelp(v => !v)}>?</button>
        </div>
        {showHsHelp && (
          <div className="help-popup">
            ヘッドスピードはドライバーを振ったときの速さです。<br />
            練習場でモニターに表示される「球速（m/s）」から確認できます。<br />
            わからなくても「わからない」を選ぶと飛距離から推定します。
          </div>
        )}
        <SingleChips
          options={[
            { label: '38m/s以下', sub: '女性・シニア平均' },
            { label: '39〜43m/s', sub: '一般男性平均' },
            { label: '44〜47m/s', sub: '飛ばし屋の入口' },
            { label: '48〜51m/s', sub: '上級者レベル' },
            { label: '52m/s以上', sub: 'プロ・ハードヒッター' },
            { label: 'わからない', sub: '飛距離から推定します' },
          ]}
          value={answers.hsMeasure}
          onChange={v => update({ hsMeasure: v })}
        />

        {answers.hsMeasure && answers.hsMeasure !== 'わからない' && (
          <>
            <div className="field-label">
              計測方法を教えてください
              <HelpPopup text="計測方法によって数値の誤差が変わります。AIが診断時に補正します。" />
            </div>
            {[
              { label: '練習場のモニターで見た', sub: 'ボール初速から計算して補正します' },
              { label: 'HS計測器で測った', sub: '実測値として使います' },
              { label: '飛距離から大体で入力した', sub: '少し幅を持たせて診断します' },
            ].map(o => (
              <ListOption
                key={o.label}
                label={o.label}
                sub={o.sub}
                active={answers.hs === undefined ? false : false}
                onClick={() => {}}
              />
            ))}
          </>
        )}
      </div>
      <div className="screen-footer">
        <button className="btn-main" onClick={onNext} disabled={!valid}>次へ</button>
      </div>
    </div>
  )
}
