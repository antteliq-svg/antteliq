import { supabase } from './supabase'
import { Answers } from '../app/page'

// ブラウザを閉じても同じユーザーと紐づけるためのID
export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('diagnosis_session_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('diagnosis_session_id', id)
  }
  return id
}

// 回答を保存してquiz_answer_idを返す
export async function saveAnswers(answers: Answers): Promise<string | null> {
  const session_id = getSessionId()

  const { data, error } = await supabase
    .from('quiz_answers')
    .insert({
      session_id,
      gender: answers.gender,
      age: answers.age,
      golf_exp: answers.golfExp,
      sports: answers.sports,
      rounds: answers.rounds,
      score: answers.score,
      hs_measure: answers.hsMeasure,
      hs_method: answers.hsMethod,
      driver_model: answers.driverModel,
      driver_type: answers.driverType,
      driver_flex: answers.driverFlex,
      iron_model: answers.ironModel,
      iron_flex: answers.ironFlex,
      favorite_club: answers.favoriteClub,
      favorite_reasons: answers.favoriteReasons,
      goal: answers.goal,
      miss_first: answers.missFirst,
      miss_curve: answers.missCurve,
      feel: answers.feel,
      trajectory: answers.trajectory,
      budget: answers.budget,
      timing: answers.timing,
      notify: answers.notify,
      email: answers.email,
    })
    .select('id')
    .single()

  if (error) {
    console.error('回答保存エラー:', error)
    return null
  }
  return data.id
}

// 診断結果を保存
export async function saveDiagnosis({
  quizAnswerId,
  swingType,
  freeResult,
}: {
  quizAnswerId: string
  swingType: string
  freeResult: object
}): Promise<string | null> {
  const session_id = getSessionId()

  const { data, error } = await supabase
    .from('diagnoses')
    .insert({
      session_id,
      quiz_answer_id: quizAnswerId,
      swing_type: swingType,
      free_result: freeResult,
    })
    .select('id')
    .single()

  if (error) {
    console.error('診断結果保存エラー:', error)
    return null
  }
  return data.id
}