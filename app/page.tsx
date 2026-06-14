'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase' // あなたのファイルのパスに合わせて調整してください

export default function TestPage() {
  const [inputText, setInputText] = useState('')
  const [items, setItems] = useState<any[]>([])
  const [status, setStatus] = useState('接続チェック待ち')

  // 1. データベースからデータを読み込む（SELECT）
  const fetchData = async () => {
    // ※ 'your_table_name' はあなたが作成した実際のテーブル名に書き換えてください
    const { data, error } = await supabase.from('your_table_name').select('*')
    
    if (error) {
      setStatus(`読み込み失敗❌: ${error.message}`)
    } else {
      setItems(data || [])
      setStatus('DB接続・読み込み成功完了！✅')
    }
  }

  // 画面が開いたときに自動で読み込む
  useEffect(() => {
    fetchData()
  }, [])

  // 2. データベースにデータを書き込む（INSERT）
  const handleInsert = async () => {
    if (!inputText) return
    setStatus('送信中...')

    // ※ 'content' はテーブルの列名に合わせて調整してください
    const { error } = await supabase.from('contacts').insert([{ content: inputText }])

    if (error) {
      setStatus(`書き込み失敗❌: ${error.message}`)
    } else {
      setStatus('書き込み成功！データを再取得します...')
      setInputText('')
      fetchData() // 成功したら再読み込みして画面を更新
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🔌 Supabase 接続テスト</h1>
      <p><strong>ステータス:</strong> {status}</p>

      {/* 入力フォーム */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="テストデータを入力"
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button onClick={handleInsert} style={{ padding: '8px 16px' }}>
          DBに書き込む
        </button>
      </div>

      {/* データ一覧表示 */}
      <h3>📥 DBから取得したデータ一覧</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.content || JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  )
}