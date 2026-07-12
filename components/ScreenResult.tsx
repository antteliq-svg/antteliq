'use client'
import { Answers } from '../app/page'

function getSwingType(a: Answers): string {
  if (a.missFirst === '右へ出る') return 'スライス傾向'
  if (a.missFirst === '左へ出る') return 'フック傾向'
  return 'バラつき型'
}

function getDriverRec(a: Answers): { name: string; reason: string } {
  if (a.missFirst === '右へ出る') {
    return { name: 'Callaway パラダイム MAX', reason: '高慣性モーメント設計でスライスを軽減。フックフェースがボールをつかまえやすくします。' }
  }
  if (a.missFirst === '左へ出る') {
    return { name: 'PING G430 LST', reason: '低スピン設計でフックしにくい。開き気味のフェースがミスを防ぎます。' }
  }
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
  const swingType = getSwingType(answers)
  const driver = getDriverRec(answers)
  const iron = getIronRec(answers)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: 'white',
        borderBottom: '1px solid #E8E4DE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>診断結果</span>
        <span style={{
          fontSize: 10, background: '#F5EFE6', color: '#8B6914',
          padding: '3px 10px', borderRadius: 2, fontWeight: 600, letterSpacing: '0.04em',
        }}>FREE</span>
      </div>

      <div className="screen-body">
        {/* Hero */}
        <div className="result-hero">
          <div style={{ fontSize: 10, color: '#B8966E', fontWeight: 600, marginBottom: 8, letterSpacing: '0.1em' }}>
            SWING TYPE
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>
            {swingType}
          </div>
          <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.8 }}>
            {answers.missFirst === '右へ出る'
              ? 'ボールが右に出てさらに曲がるのは、クラブパスが外→内でフェースが開いたままインパクトしているサインです。'
              : answers.missFirst === '左へ出る'
              ? 'ボールが左に出るのは、フェースが閉じすぎているか、インサイドアウトの軌道のサインです。'
              : '方向が安定しないのは、シャフトの硬さや重さがスイングと合っていない可能性があります。'}
          </div>
        </div>

        {/* Recs */}
        <div style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: '0.08em', marginBottom: 12 }}>
          推奨クラブ
        </div>

        <div className="rec-card">
          <div style={{ fontSize: 10, color: '#B8966E', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 6 }}>DRIVER</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{driver.name}</div>
          <div style={{ fontSize: 13, color: '#777', lineHeight: 1.7, marginBottom: 12 }}>{driver.reason}</div>
          <div style={{ fontSize: 13, color: '#8B6914', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            詳細・価格を見る →
          </div>
        </div>

        <div className="rec-card">
          <div style={{ fontSize: 10, color: '#B8966E', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 6 }}>IRON</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{iron.name}</div>
          <div style={{ fontSize: 13, color: '#777', lineHeight: 1.7, marginBottom: 12 }}>{iron.reason}</div>
          <div style={{ fontSize: 13, color: '#8B6914', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            詳細・価格を見る →
          </div>
        </div>

        {/* Lock */}
        <div className="lock-card">
          <div style={{ fontSize: 20, marginBottom: 10 }}>🔒</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
            詳細レポートで<br />さらに深く知る
          </div>
          <div style={{ fontSize: 13, color: '#8B6914', marginBottom: 16, lineHeight: 1.8, textAlign: 'left' }}>
            · 推奨シャフト銘柄・重量・キックポイント<br />
            · FW・UTの最適な番手構成<br />
            · ライ角・シャフト長の補正アドバイス<br />
            · クラブ写真からの自動スペック読み取り
          </div>
          <button
            className="btn-main"
            onClick={onUpsell}
            style={{ background: '#8B6914' }}
          >
            詳細レポートを見る（¥1,980）
          </button>
          <p style={{ fontSize: 11, color: '#B8966E', marginTop: 8 }}>買い切り・Stripe決済</p>
        </div>

        <button className="btn-ghost" onClick={onBack}>最初からやり直す</button>
      </div>
    </div>
  )
}