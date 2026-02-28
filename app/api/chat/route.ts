import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages, quizContext } = await req.json()

  const apiKey = process.env.MISTRAL_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'MISTRAL_API_KEY not set' }, { status: 500 })
  }

  const systemPrompt = `Tu es un assistant pédagogique expert en climatologie et environnement, enthousiaste et bienveillant.
${quizContext}

Aide l'utilisateur à comprendre les questions ratées, à approfondir ses connaissances sur le climat, et réponds à ses questions de façon claire, précise et encourageante.
Tu parles exclusivement français.`

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: err }, { status: response.status })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? ''
    return NextResponse.json({ content })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
