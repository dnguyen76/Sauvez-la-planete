'use client'
import { useState } from 'react'
import { Question } from '@/lib/questions'

interface Props {
  question: Question
  questionIndex: number
  totalQuestions: number
  onAnswer: (selectedIds: string[]) => void
}

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuizQuestion({ question, questionIndex, totalQuestions, onAnswer }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)

  const toggle = (id: string) => {
    if (revealed) return
    if (question.multi) {
      setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
    } else {
      setSelected([id])
    }
  }

  const confirm = () => {
    if (selected.length === 0) return
    setRevealed(true)
  }

  const progress = ((questionIndex + 1) / totalQuestions) * 100

  const getOptionClass = (id: string) => {
    let cls = 'option-btn'
    if (revealed) {
      if (question.correctIds.includes(id)) cls += ' revealed-correct'
      else if (selected.includes(id)) cls += ' revealed-wrong'
    } else if (selected.includes(id)) {
      cls += ' selected'
    }
    return cls
  }

  const getCheck = (id: string) => {
    if (!revealed) return selected.includes(id) ? '◉' : ''
    if (question.correctIds.includes(id)) return '✓'
    if (selected.includes(id)) return '✗'
    return ''
  }

  // Score partiel pour cette question
  const getScore = () => {
    if (!revealed) return null
    const correct = selected.filter(id => question.correctIds.includes(id)).length
    const wrong = selected.filter(id => !question.correctIds.includes(id)).length
    const isPerfect = correct === question.correctIds.length && wrong === 0
    return { correct, wrong, isPerfect }
  }

  const score = getScore()

  return (
    <div className="quiz-card">
      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="question-area">
        <div className="q-meta">
          <span className="q-number">Question {questionIndex + 1}/{totalQuestions}</span>
          <span className="q-hint">{question.multi ? `${question.correctIds.length} bonnes réponses` : '1 bonne réponse'}</span>
        </div>
        <p className="question-text">{question.text}</p>
      </div>

      <div className="options-list">
        {question.options.map((opt, i) => (
          <button
            key={opt.id}
            className={getOptionClass(opt.id)}
            onClick={() => toggle(opt.id)}
            disabled={revealed}
          >
            <span className="option-letter">{LETTERS[i]}</span>
            <span className="option-text">{opt.text}</span>
            {getCheck(opt.id) && <span className="option-check">{getCheck(opt.id)}</span>}
          </button>
        ))}
      </div>

      <div className="actions">
        <span className="feedback-text">
          {!revealed && selected.length === 0 && (question.multi ? 'Sélectionnez une ou plusieurs réponses' : 'Sélectionnez une réponse')}
          {!revealed && selected.length > 0 && `${selected.length} réponse${selected.length > 1 ? 's' : ''} sélectionnée${selected.length > 1 ? 's' : ''}`}
          {revealed && score?.isPerfect && '🎉 Parfait !'}
          {revealed && !score?.isPerfect && score?.correct === 0 && '❌ Raté'}
          {revealed && !score?.isPerfect && (score?.correct ?? 0) > 0 && `👍 ${score?.correct}/${question.correctIds.length} correct${(score?.correct ?? 0) > 1 ? 's' : ''}`}
        </span>
        {!revealed ? (
          <button className="next-btn" onClick={confirm} disabled={selected.length === 0}>
            Valider →
          </button>
        ) : (
          <button className="next-btn" onClick={() => onAnswer(selected)}>
            {questionIndex + 1 < totalQuestions ? 'Question suivante →' : 'Voir mon score →'}
          </button>
        )}
      </div>
    </div>
  )
}
