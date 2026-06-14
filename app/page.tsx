'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js' // 💡 直接ライブラリから呼ぶ

// 💡 ここに、今Supabaseの管理画面（Settings > API）で見ている
// 「本物のURL」と「本物のanonキー」をそのまま【生文字】で貼り付けてください。
const url = 'https://xxxx.supabase.co' 
const anonKey = 'eyJhbGci...' 

// 💡 完全に独立した、今だけの接続テスト用クライアントを強制作成
const directSupabase = createClient(url, anonKey)

export default function TestPage() {
  const [inputName, setInputName] = useState('')
  const [contacts, setContacts] = useState<any[]>([])
  const [status, setStatus] = useState('直接接続チェック中...')

  const fetchData = async () => {
    const { data, error } = await directSupabase // 💡 テスト用クライアントを使用
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      setStatus(`[SELECT失敗] 理由: ${error.message} (コード: ${error.code || 'なし'})`)
    } else {
      setContacts(data || [])
      setStatus('生のURLとKEYで通信成功！✅')
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleInsert = async () => {
    if (!inputName) return
    setStatus('直接送信中...')

    const { error } = await directSupabase // 💡 テスト用クライアントを使用
      .from('contacts')
      .insert([{ name: inputName, email: 'test@example.com', message: '直接注入テスト' }])

    if (error) {
      setStatus(`[INSERT失敗] 理由: ${error.message} (コード: ${error.code || 'なし'})`)
    } else {
      setStatus('書き込み完全成功！🎉')
      setInputName('')
      fetchData()
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔬 ガチンコ切り分けテスト画面</h1>
      <p><strong>現在のステータス:</strong> <span style={{ color: 'blue', fontWeight: 'bold' }}>{status}</span></p>
      <div>
        <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} />
        <button onClick={handleInsert}>DBに書き込む</button>
      </div>
      <h3>一覧</h3>
      <ul>
        {contacts.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}