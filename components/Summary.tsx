'use client'
import { useState, useRef, useEffect } from 'react'
import { UserAnswer } from '@/lib/questions'

interface Props {
  answers: UserAnswer[]
  apiKey: string
  onRestart: () => void
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

function calcScore(answers: UserAnswer[]) {
  let total = 0
  let perfect = 0
  answers.forEach(a => {
    const correct = a.selectedIds.filter(id => a.correctIds.includes(id)).length
    const wrong = a.selectedIds.filter(id => !a.correctIds.includes(id)).length
    const isPerfect = correct === a.correctIds.length && wrong === 0
    if (isPerfect) { total += 1; perfect += 1 }
    else if (correct > 0 && wrong === 0) total += 0.5
  })
  return { total, perfect, max: answers.length }
}

function getEmoji(pct: number) {
  if (pct >= 90) return '🏆'
  if (pct >= 70) return '🌟'
  if (pct >= 50) return '👍'
  if (pct >= 30) return '📚'
  return '🌱'
}

function getMention(pct: number) {
  if (pct >= 90) return 'Expert climatique !'
  if (pct >= 70) return 'Très bien informé·e'
  if (pct >= 50) return 'Bon niveau'
  if (pct >= 30) return 'Des progrès à faire'
  return 'Sujet à approfondir'
}

export default function Summary({ answers, apiKey, onRestart }: Props) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const { total, max } = calcScore(answers)
  const pct = Math.round((total / max) * 100)
  const hasMistral = !!apiKey.trim()

  const quizContext = `
L'utilisateur vient de terminer un quiz sur le climat ("Sauve la planète !").
Score : ${total}/${max} (${pct}%).
Détail des réponses :
${answers.map((a, i) => {
  const correct = a.selectedIds.filter(id => a.correctIds.includes(id)).length
  const wrong = a.selectedIds.filter(id => !a.correctIds.includes(id)).length
  const isPerfect = correct === a.correctIds.length && wrong === 0
  const chosenLabels = a.selectedIds.map(id => a.options.find(o => o.id === id)?.text ?? id)
  const correctLabels = a.correctIds.map(id => a.options.find(o => o.id === id)?.text ?? id)
  return `Q${i+1}: ${a.questionText}\n  → Répondu: ${chosenLabels.join(', ')}\n  → Correct: ${correctLabels.join(', ')}\n  → ${isPerfect ? '✓ Parfait' : wrong > 0 ? '✗ Erreur' : '~ Partiel'}`
}).join('\n')}`

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, loading])

  useEffect(() => {
    if (!hasMistral) return
    sendMessage("Commente mon score et explique-moi les questions que j'ai ratées de façon pédagogique.", true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendMessage = async (text: string, isAuto = false) => {
    const userMsg: ChatMessage = { role: 'user', content: text }
    const newMessages = isAuto ? [userMsg] : [...chatMessages, userMsg]
    if (!isAuto) { setChatMessages(newMessages); setInput('') }
    else { setChatMessages([userMsg]) }
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({ messages: newMessages, quizContext }),
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content ?? `Erreur: ${data.error}` }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Impossible de contacter l'API Mistral." }])
    } finally {
      setLoading(false)
    }
  }

  const handleSend = () => {
    if (!input.trim() || loading) return
    sendMessage(input.trim())
  }

  return (
    <div className="summary-card">
      <div className="summary-header">
        <div className="score-big">{getEmoji(pct)}</div>
        <h2>{getMention(pct)}</h2>
        <div className="score-display">{total}<span className="score-max">/{max}</span></div>
        <div className="score-bar-wrap">
          <div className="score-bar" style={{ width: `${pct}%` }} />
        </div>
        <p className="score-pct">{pct}%</p>
      </div>

      {/* Détail question par question */}
      <div className="summary-answers">
        {answers.map((a, i) => {
          const correct = a.selectedIds.filter(id => a.correctIds.includes(id)).length
          const wrong = a.selectedIds.filter(id => !a.correctIds.includes(id)).length
          const isPerfect = correct === a.correctIds.length && wrong === 0
          const isWrong = wrong > 0 && correct === 0
          const cls = `summary-answer-item ${isPerfect ? 'correct-item' : isWrong ? 'wrong-item' : 'partial-item'}`
          return (
            <div key={a.questionId} className={cls}>
              <div className="summary-q">
                <span className="summary-q-icon">{isPerfect ? '✓' : isWrong ? '✗' : '~'}</span>
                {i + 1}. {a.questionText}
              </div>
              <div className="summary-choices">
                <span>Vos choix : </span>
                {a.selectedIds.map(id => {
                  const label = a.options.find(o => o.id === id)?.text ?? id
                  const isC = a.correctIds.includes(id)
                  return <span key={id} className={isC ? 'correct-ans' : 'wrong-ans'}>{label} </span>
                })}
                {!isPerfect && (
                  <>
                    <br /><span>Bonne{a.correctIds.length > 1 ? 's' : ''} réponse{a.correctIds.length > 1 ? 's' : ''} : </span>
                    {a.correctIds.map(id => (
                      <span key={id} className="correct-ans">{a.options.find(o => o.id === id)?.text} </span>
                    ))}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Chatbot Mistral — affiché seulement si clé disponible */}
      {hasMistral ? (
        <div className="chatbot-section">
          <div className="chatbot-title">
            <span className="dot" />
            Assistant Mistral AI — Explications pédagogiques
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>{msg.content}</div>
            ))}
            {loading && <div className="chat-msg loading">Mistral prépare vos explications…</div>}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input"
              type="text"
              placeholder="Posez une question sur le climat…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button className="chat-send-btn" onClick={handleSend} disabled={loading || !input.trim()}>
              Envoyer
            </button>
          </div>
        </div>
      ) : (
        <div className="no-mistral-banner">
          <span>🤖</span>
          <div>
            <strong>Assistant IA non disponible</strong>
            <p>Recommencez le quiz avec une clé Mistral pour obtenir des explications personnalisées.</p>
            <a href="https://console.mistral.ai" target="_blank" rel="noreferrer" className="mistral-link">
              Obtenir une clé gratuite →
            </a>
          </div>
        </div>
      )}

      <button className="restart-btn" onClick={onRestart}>
        ↩ Recommencer le quiz
      </button>
    </div>
  )
}
