'use client'
import { Answers } from '../app/page'

export default function ScreenResultPaid({ answers, onBack }: { answers: Answers; onBack: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ padding: '12px 20px', background: '#1a4a2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>詳細レポート</span>
        <span style={{ fontSize: 11, background: '#c8973a', color: 'white', padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>購入済み</span>
      </div>
      <div className="screen-body">
        <div style={{ background: '#1a4a2e', borderRadius: 16, padding: 20, color: 'white', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#7ec99a', fontWeight: 600, marginBottom: 6, letterSpacing: '0.06em' }}>フィッティングサマリー</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>
            シャフト交換が<br />最優先の改善策
          </div>
          <div style={{ fontSize: 13, color: '#b2d9c0', lineHeight: 1.7 }}>
            現行のフレックスはヘッドスピードに対して硬すぎる可能性があります。
            SRまたはRフレックスへの変更でスライスが大幅に改善する見込みです。
          </div>
        </div>

        {[
          {
            cat: '推奨シャフト',
            name: 'Fujikura SPEEDER NX 50（SR）',
            reason: '先調子・軽量クラスでつかまりを改善。HS44m/s前後のテンポに合う50g台が適正です。',
            link: '詳細・購入',
          },
          {
            cat: 'FW・UT構成',
            name: '5W（18°）＋ 22度UT を推奨',
            reason: 'ヘッドスピードから見て3Wのギャップが大きいため、5Wに替えてグリーンを狙えるゾーンを増やします。',
            link: 'おすすめUT一覧',
          },
          {
            cat: 'アイアンセット',
            name: '4〜PWの7本から5〜PWの6本セットへ',
            reason: '4番アイアンは難易度が高いため、UT22度で代替するとスコアが安定します。',
            link: '詳細を見る',
          },
        ].map(c => (
          <div key={c.cat} style={{ border: '1.5px solid #e0e0e0', borderRadius: 14, padding: '14px 16px', background: 'white', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#888', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 4 }}>{c.cat}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{c.name}</div>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 10 }}>{c.reason}</div>
            <div style={{ fontSize: 13, color: '#2d7a4f', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>{c.link} →</div>
          </div>
        ))}

        <div style={{ background: '#f4faf6', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a4a2e', marginBottom: 8 }}>結果を送る</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['📧 メール送信', '💬 LINEで送る'].map(b => (
              <button key={b} style={{ flex: 1, padding: '10px 6px', border: '1.5px solid #2d7a4f', borderRadius: 8, background: 'white', fontSize: 13, color: '#1a4a2e', cursor: 'pointer', fontWeight: 500 }}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onBack}
          style={{ width: '100%', padding: 12, border: '1.5px solid #e0e0e0', borderRadius: 12, background: 'white', fontSize: 14, color: '#888', cursor: 'pointer' }}
        >
          トップへ戻る
        </button>
      </div>
    </div>
  )
}
