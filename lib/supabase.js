import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 💡 1. 万が一、初期化時に環境変数がまだ読み込めていない場合の安全ガード
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('【警告】Supabaseの環境変数が正常に読み込めていません。.env.local を確認してください。')
}

// 💡 2. 確実に値が渡るように明示してクライアントを作成（オプションを追加）
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: false, // テスト時のキャッシュによるバグを防ぐ
    autoRefreshToken: false,
  }
})