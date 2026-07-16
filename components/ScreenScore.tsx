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
    <div className="screen">
      <Topbar step={2} total={6} label="スコアとヘッドスピード" onBack={onBack} progress={30} />

      <div className="screen-body">
        <h2 className="page-title">今のプレーレベル</h2>
        <p className="page-sub">正直に答えるほど診断が正確になります。</p>

        <div className="field-label">平均スコア（18ホール）</div>
        <div className="option-list">
          {[
            { label: '70台（シングルプレーヤー）' },
            { label: '80〜89' },
            { label: '90〜99', sub: '100切り目前' },
            { label: '100〜109', sub: '100切りを目指している' },
            { label: '110〜119' },
            { label: '120以上 or わからない' },
          ].map(o => (
            <ListOption
              key={o.label}
              label={o.label}
              sub={o.sub}
              active={answers.score === o.label}
              onClick={() => update({ score: o.label })}
            />
          ))}
        </div>

        <div className="field-label">
          ドライバーのヘッドスピード
          <button className="help-btn" onClick={() => setShowHsHelp(v => !v)}>?</button>
        </div>
        {showHsHelp && (
          <div className="help-popup">
            ヘッドスピードはドライバーを振ったときの速さです。
            練習場のモニターで確認できます。
            わからない場合は「わからない」を選ぶとスコアから推定します。
          </div>
        )}
        <SingleChips
          options={[
            { label: '38m/s以下', sub: '女性・シニア平均' },
            { label: '39〜43m/s', sub: '一般男性平均' },
            { label: '44〜47m/s', sub: '飛ばし屋の入口' },
            { label: '48〜51m/s', sub: '上級者レベル' },
            { label: '52m/s以上', sub: 'プロ・ハードヒッター' },
            { label: 'わからない', sub: 'スコアから推定します' },
          ]}
          value={answers.hsMeasure}
          onChange={v => update({ hsMeasure: v })}
        />

        {answers.hsMeasure && answers.hsMeasure !== 'わからない' && (
          <>
            <div className="field-label">
              どうやって確認しましたか？
              <HelpPopup text="計測方法によって数値の誤差が変わります。AIが診断時に自動で補正します。" />
            </div>
            <div className="option-list">
              {[
                { label: '練習場のモニターで見た', sub: 'ボール初速から自動換算します' },
                { label: 'HS計測器で測った', sub: '実測値としてそのまま使います' },
                { label: '飛距離から大体で入力した', sub: '幅を持たせて診断します' },
              ].map(o => (
                <ListOption
                  key={o.label}
                  label={o.label}
                  sub={o.sub}
                  active={answers.hsMethod === o.label}
                  onClick={() => update({ hsMethod: o.label })}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="screen-footer">
        <button className="btn btn--primary btn--block" onClick={onNext} disabled={!valid}>
          次へ
        </button>
        {!valid && (
          <p className="hint-text" style={{ textAlign: 'center', marginTop: 8 }}>
            スコアとヘッドスピードを選んでください
          </p>
        )}
      </div>
    </div>
  )
}