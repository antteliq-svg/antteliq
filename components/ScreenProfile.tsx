'use client'
import { Answers } from '../app/page'
import { Topbar, SingleChips, MultiChips, HelpPopup } from './UI'

export default function ScreenProfile({
  answers, update, onNext, onBack
}: {
  answers: Answers; update: (p: Partial<Answers>) => void; onNext: () => void; onBack: () => void
}) {
  const valid = !!answers.gender && !!answers.age && !!answers.golfExp

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Topbar step={1} total={6} label="あなたのことを教えてください" onBack={onBack} progress={15} />
      <div className="screen-body">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, marginTop: 4 }}>
          基本情報
        </h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 20, lineHeight: 1.6 }}>
          診断の精度を上げるために使います。<br />すべて選択式なのでサクッと答えられます。
        </p>

        <div className="field-label">性別</div>
        <SingleChips
          options={[{ label: '男性' }, { label: '女性' }, { label: '回答しない' }]}
          value={answers.gender}
          onChange={v => update({ gender: v })}
        />

        <div className="field-label">年齢</div>
        <SingleChips
          options={[
            { label: '20代以下' }, { label: '30代' }, { label: '40代' },
            { label: '50代' }, { label: '60代以上' }
          ]}
          value={answers.age}
          onChange={v => update({ age: v })}
        />

        <div className="field-label">
          ゴルフ歴
          <HelpPopup text="始めたばかりでも大丈夫です。クラブを選ぶ基準が変わります。" />
        </div>
        <SingleChips
          options={[
            { label: '1年未満' }, { label: '1〜3年' },
            { label: '4〜10年' }, { label: '10年以上' }
          ]}
          value={answers.golfExp}
          onChange={v => update({ golfExp: v })}
        />

        <div className="field-label">
          スポーツ歴（複数選択OK）
          <HelpPopup text="野球やテニス経験者はスイングのクセが出やすく、クラブ選びに影響します。" />
        </div>
        <MultiChips
          options={['野球・ソフト', 'テニス', 'サッカー', '水泳・ランニング', 'なし', 'その他']}
          values={answers.sports || []}
          onChange={v => update({ sports: v })}
        />

        <div className="field-label">年間ラウンド数</div>
        <SingleChips
          options={[
            { label: '1〜5回' }, { label: '6〜15回' },
            { label: '16〜30回' }, { label: '31回以上' }
          ]}
          value={answers.rounds}
          onChange={v => update({ rounds: v })}
        />
      </div>
      <div className="screen-footer">
        <button className="btn-main" onClick={onNext} disabled={!valid}>
          次へ
        </button>
        {!valid && (
          <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', marginTop: 8 }}>
            性別・年齢・ゴルフ歴を選んでください
          </p>
        )}
      </div>
    </div>
  )
}
