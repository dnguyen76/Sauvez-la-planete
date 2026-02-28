'use client'
import { useState } from 'react'
import QuizQuestion from '@/components/QuizQuestion'
import Summary from '@/components/Summary'
import { QUESTIONS, QUIZ_TITLE, QUIZ_SUBTITLE, UserAnswer } from '@/lib/questions'

type Phase = 'mistral-question' | 'key' | 'start' | 'quiz' | 'summary'

export default function Home() {
  const [phase, setPhase] = useState<Phase>('mistral-question')
  const [apiKey, setApiKey] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<UserAnswer[]>([])

  const handleAnswer = (selectedIds: string[]) => {
    const q = QUESTIONS[currentIndex]
    const answer: UserAnswer = {
      questionId: q.id,
      selectedIds,
      questionText: q.text,
      options: q.options,
      correctIds: q.correctIds,
    }
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setPhase('summary')
    }
  }

  const restart = () => {
    setPhase('mistral-question')
    setApiKey('')
    setCurrentIndex(0)
    setAnswers([])
  }

  return (
    <main className="app-container">
      <div className="header">
        <h1>{QUIZ_TITLE}</h1>
        <p className="subtitle">{QUIZ_SUBTITLE} · {QUESTIONS.length} questions</p>
      </div>

      {/* ── Étape 0 : Avez-vous une clé Mistral ? ── */}
      {phase === 'mistral-question' && (
        <div className="start-screen">
          <div className="mistral-question-card">
            <div className="mistral-q-icon">🤖</div>
            <h2 className="mistral-q-title">Avez-vous une clé Mistral AI ?</h2>
            <p className="mistral-q-text">
              La clé Mistral permet d'activer un assistant IA à la fin du quiz
              pour expliquer vos erreurs et commenter votre score.
            </p>
            <div className="mistral-btns">
              <button
                type="button"
                className="mistral-btn-oui"
                onClick={() => setPhase('key')}
              >
                ✓ Oui, j'en ai une
              </button>
              <button
                type="button"
                className="mistral-btn-non"
                onClick={() => setPhase('start')}
              >
                ✗ Non, continuer sans
              </button>
            </div>
            <p className="mistral-q-free">
              Obtenez votre clé gratuite sur{' '}
              <a href="https://console.mistral.ai" target="_blank" rel="noreferrer" className="mistral-link">
                console.mistral.ai
              </a>
            </p>
          </div>
        </div>
      )}

      {/* ── Étape 1 : Saisie clé Mistral ── */}
      {phase === 'key' && (
        <div className="key-card">
          <div className="key-icon">🔑</div>
          <h2>Entrez votre clé Mistral AI</h2>
          <p>
            Votre clé est utilisée uniquement pendant votre session.<br />
            Elle n'est jamais sauvegardée ni transmise à des tiers.
          </p>
          <input
            className="key-input"
            type="password"
            placeholder="Collez votre clé Mistral ici…"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && apiKey.trim() && setPhase('start')}
          />
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="start-btn" onClick={() => setPhase('start')} disabled={!apiKey.trim()}>
              Continuer →
            </button>
            <button
              className="start-btn"
              style={{ background: 'transparent', border: '1.5px solid var(--border)', color: 'var(--text-muted)' }}
              onClick={() => setPhase('mistral-question')}
            >
              ← Retour
            </button>
          </div>
        </div>
      )}

      {/* ── Étape 2 : Écran de démarrage ── */}
      {phase === 'start' && (
        <div className="start-screen">
          <p>
            Testez vos connaissances sur le climat et l'environnement.<br /><br />
            <strong>{QUESTIONS.length} questions</strong>, certaines à choix unique, d'autres à <strong>choix multiples</strong>.<br />
            Votre score sera calculé à la fin.
            {!apiKey && (
              <><br /><br /><span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                ℹ️ Mode sans assistant Mistral — le chatbot ne sera pas disponible à la fin.
              </span></>
            )}
          </p>
          <button className="start-btn" onClick={() => setPhase('quiz')}>
            Commencer le quiz →
          </button>
        </div>
      )}

      {/* ── Quiz ── */}
      {phase === 'quiz' && (
        <QuizQuestion
          key={currentIndex}
          question={QUESTIONS[currentIndex]}
          questionIndex={currentIndex}
          totalQuestions={QUESTIONS.length}
          onAnswer={handleAnswer}
        />
      )}

      {/* ── Résultats ── */}
      {phase === 'summary' && (
        <Summary answers={answers} apiKey={apiKey} onRestart={restart} />
      )}
    </main>
  )
}
