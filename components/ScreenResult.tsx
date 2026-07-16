'use client'
import { Answers } from '../app/page'

function getSwingType(a: Answers): string {
  if (a.missFirst === '右へ出る') return 'スライス傾向'
  if (a.missFirst === '左へ出る') return 'フック傾向'
  return 'バラつき型'
}

function getSwingDesc(a: Answers): string {
  if (a.missFirst === '右へ出る') return 'ボールが右に出てさらに曲がるのは、クラブパスが外→内でフェースが開いたままインパクトしているサインです。'
  if (a.missFirst === '左へ出る') return 'ボールが左に出るのは、フェースが閉じすぎているか、インサイドアウトの軌道のサインです。'
  return '方向が安定しないのは、シャフトの硬さや重さがスイングと合っていない可能性があります。'
}

function getDriverRec(a: Answers): { name: string; reason: string } {
  if (a.missFirst === '右へ出る') return { name: 'Callaway パラダイム MAX', reason: '高慣性モーメント設計でスライスを軽減。フックフェースがボールをつかまえやすくします。' }
  if (a.missFirst === '左へ出る') return { name: 'PING G430 LST', reason: '低スピン設計でフックしにくい。開き気味のフェースがミスを防ぎます。' }
  return { name: 'TaylorMade ステルス2 HD', reason: '大型ヘッドでミスに強い。広いスイートスポットでバラつきを抑えます。' }
}

function getIronRec(a: Answers): { name: string; reason: string } {
  if (a.score?.includes('100') || a.score?.includes('110') || a.score?.includes('120')) {
    return { name: 'PING G430 アイアン', reason: '広いスイートスポットで、芯を外してもそれなりに飛ぶ。100切りに最適です。' }
  }
  return { name: 'Titleist T200 アイアン', reason: '打感と飛距離のバランスが良い中空構造。90台のゴルファーに人気。' }
}

export default function ScreenResult({
  answers, onUpsell, onBack
}: {
  answers: Answers; onUpsell: () => void; onBack: () => void
}) {
  const driver = getDriverRec(answers)
  const iron = getIronRec(answers)

  return (
    <div className="screen">

      <div className="result-header">
        <span className="result-header__title">診断結果</span>
        <span className="result-header__badge result-header__badge--free">FREE</span>
      </div>

      <div className="screen-body">

        <div className="card card--dark">
          <div className="card__eyebrow">SWING TYPE</div>
          <div className="card__title">{getSwingType(answers)}</div>
          <div className="card__body">{getSwingDesc(answers)}</div>
        </div>

        <div className="field-label">推奨クラブ</div>

        <div className="card">
          <div className="card__eyebrow">DRIVER</div>
          <div className="card__title" style={{ fontSize: 15 }}>{driver.name}</div>
          <div className="card__body" style={{ color: 'var(--color-text-mid)' }}>{driver.reason}</div>
          <a className="card__link">詳細・価格を見る →</a>
        </div>

        <div className="card">
          <div className="card__eyebrow">IRON</div>
          <div className="card__title" style={{ fontSize: 15 }}>{iron.name}</div>
          <div className="card__body" style={{ color: 'var(--color-text-mid)' }}>{iron.reason}</div>
          <a className="card__link">詳細・価格を見る →</a>
        </div>

        <div className="lock-card">
          <div className="lock-card__icon">🔒</div>
          <div className="lock-card__title">
            詳細レポートで<br />さらに深く知る
          </div>
          <div className="lock-card__list">
            · 推奨シャフト銘柄・重量・キックポイント<br />
            · FW・UTの最適な番手構成<br />
            · ライ角・シャフト長の補正アドバイス<br />
            · クラブ写真からの自動スペック読み取り
          </div>
          <button className="btn btn--gold btn--block" onClick={onUpsell}>
            詳細レポートを見る（¥1,980）
          </button>
          <p className="hint-text" style={{ textAlign: 'center', marginTop: 8 }}>
            買い切り・Stripe決済
          </p>
        </div>

        <button className="btn btn--ghost" onClick={onBack}>
          最初からやり直す
        </button>

      </div>
    </div>
  )
}