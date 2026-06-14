'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. 環境変数から安全に取得（末尾のスラッシュや前後の空白を自動で削る安全ガード付き）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, '') || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || '';

// 2. Supabaseクライアントの初期化
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function TestPage() {
  const [status, setStatus] = useState<string>('待機中...');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 📝 データの書き込み（INSERT）テスト
  const handleInsert = async () => {
    if (!name) {
      alert('名前を入力してください');
      return;
    }
    setLoading(true);
    setStatus('書き込み中...');

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{ name: name }]);

      if (error) {
        setStatus(`[書き込み失敗] 理由: ${error.message} (コード: ${error.code})`);
      } else {
        setStatus('書き込み成功！🎉（DBを確認してください）');
        setName(''); // 入力欄をクリア
      }
    } catch (err: any) {
      setStatus(`[通信エラー] 理由: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>🔌 Supabase 安全接続テスト</h2>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: status.includes('成功') ? '#e6fffa' : status.includes('失敗') || status.includes('エラー') ? '#fff5f5' : '#f7fafc',
        border: '1px solid',
        borderColor: status.includes('成功') ? '#319795' : status.includes('失敗') || status.includes('エラー') ? '#e53e3e' : '#cbd5e0',
        borderRadius: '5px',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        現在のステータス: {status}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="名前を入力してください"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #cbd5e0' }}
        />
        <button
          onClick={handleInsert}
          disabled={loading}
          style={{ 
            padding: '12px', 
            fontSize: '16px', 
            backgroundColor: '#3182ce', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? '処理中...' : 'DBに書き込む'}
        </button>
      </div>
    </div>
  );
}