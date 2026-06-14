'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase' // パスが違う場合は修正してください

export default function TestPage() {
  const [inputName, setInputName] = useState('')
  const [contacts, setContacts] = useState<any[]>([])
  const [status, setStatus] = useState('接続チェック待ち')

  // 1. データベースからデータを読み込む（SELECT）
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false }) // 新しい順に並べる
    
    if (error) {
      setStatus(`読み込み失敗❌: ${error.message}`)
    } else {
      setContacts(data || [])
      setStatus('DB接続・読み込み成功完了！✅')
    }
  }

  // 画面が開いたときに自動で読み込む
  useEffect(() => {
    fetchData()
  }, [])

  // 2. データベースにデータを書き込む（INSERT）
  const handleInsert = async () => {
    if (!inputName) return
    setStatus('送信中...')

    // contactsテーブルの「name」列に文字を入れ、emailとmessageは一旦テスト用にダミーを入れます
    const { error } = await supabase
      .from('contacts')
      .insert([
        { 
          name: inputName, 
          email: 'test@example.com', 
          message: 'ローカル・本番の接続テストです' 
        }
      ])

    if (error) {
      setStatus(`書き込み失敗❌: ${error.message}`)
    } else {
      setStatus('書き込み成功！データを再取得します...')
      setInputName('')
      fetchData() // 成功したら再取得して画面を更新
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🔌 Supabase 接続テスト (contacts)</h1>
      <p><strong>ステータス:</strong> {status}</p>

      {/* 入力フォーム */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="名前を入力してください"
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button onClick={handleInsert} style={{ padding: '8px 16px' }}>
          DBにインサートする
        </button>
      </div>

      {/* データ一覧表示 */}
      <h3>📥 DBから取得した連絡先一覧</h3>
      <ul style={{ lineHeight: '1.8' }}>
        {contacts.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> ({item.email}) - {item.message} 
            <small style={{ color: '#888', marginLeft: '10px' }}>[{item.created_at}]</small>
          </li>
        ))}
      </ul>
    </div>
  )
}