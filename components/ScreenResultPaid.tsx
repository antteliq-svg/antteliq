'use client'
import { Answers } from '../app/page'

export default function ScreenResultPaid({ answers, onBack }: { answers: Answers; onBack: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #B8966E, #E8C97A, #B8966E)' }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>詳細レポート</span>
        <span style={{
          fontSize: 10, background: '#B8966E', color: 'white',
          padding: '3px 10px', borderRadius: 2, fontWeight: 600, letterSpacing: '0.04em',
        }}>PREMIUM</span>
      </div>

      <div className="screen-body">
        {/* Hero */}
        <div className="result-hero">
          <div style={{ fontSize: 10, color: '#B8966E', fontWeight: 600, marginBottom: 8, letterSpacing: '0.1em' }}>
            FITTING SUMMARY
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
            シャフト交換が<br />最優先の改善策
          </div>
          <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.8 }}>
            現行のフレックスはヘッドスピードに対して硬すぎる可能性があります。
            SRまたはRへの変更でスライスが大幅に改善する見込みです。
          </div>
        </div>

        {/* Detail cards */}
        {[
          {
            cat: 'SHAFT',
            name: 'Fujikura SPEEDER NX 50（SR）',
            reason: '先調子・軽量クラスでつかまりを改善。HS44m/s前後のテンポに合う50g台が適正です。',
            link: '詳細・購入',
          },
          {
            cat: 'FW / UT 構成',
            name: '5W（18°）＋ 22度UT を推奨',
            reason: 'ヘッドスピードから見て3Wのギャップが大きいため、5Wに替えてグリーンを狙えるゾーンを増やします。',
            link: 'おすすめUT一覧',
          },
          {
            cat: 'IRON SET',
            name: '5〜PWの6本セットへ変更',
            reason: '4番アイアンは難易度が高いため、UT22度で代替するとスコアが安定します。',
            link: '詳細を見る',
          },
        ].map(c => (
          <div key={c.cat} className="rec-card">
            <div style={{ fontSize: 10, color: '#B8966E', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 6 }}>{c.cat}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{c.name}</div>
            <div style={{ fontSize: 13, color: '#777', lineHeight: 1.7, marginBottom: 12 }}>{c.reason}</div>
            <div style={{ fontSize: 13, color: '#8B6914', cursor: 'pointer' }}>{c.link} →</div>
          </div>
        ))}

        {/* Send */}
        <div style={{ background: '#FAFAF8', border: '1px solid #E8E4DE', borderRadius: 8, padding: '16px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#555', letterSpacing: '0.04em', marginBottom: 12 }}>
            結果を送る
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['📧 メール送信', '💬 LINEで送る'].map(b => (
              <button key={b} style={{
                flex: 1, padding: '11px 6px',
                border: '1px solid #B8966E', borderRadius: 6,
                background: 'white', fontSize: 13, color: '#8B6914',
                cursor: 'pointer', fontWeight: 500,
              }}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <button onClick={onBack} className="btn-sub">
          トップへ戻る
        </button>
      </div>
    </div>
  )
}