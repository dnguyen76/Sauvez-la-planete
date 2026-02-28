# Quiz Interactif — Next.js + Mistral AI

Application de questionnaire interactif avec chatbot Mistral AI pour l'analyse des résultats.

## Fonctionnalités

- 5 questions, 4 choix par question dont **2 réponses valides**
- Validation par question avec feedback visuel (vert/rouge)
- Récapitulatif complet à la fin avec score et détail des réponses
- **Chatbot Mistral AI** qui analyse automatiquement vos résultats et répond à vos questions

## Installation locale

```bash
npm install
cp .env.local.example .env.local
# Renseignez votre MISTRAL_API_KEY dans .env.local
npm run dev
```

## Déploiement sur Vercel

1. Pushez ce projet sur GitHub
2. Importez-le sur [vercel.com](https://vercel.com)
3. Dans les **Environment Variables** du projet Vercel, ajoutez :
   ```
   MISTRAL_API_KEY = votre_clé_mistral
   ```
4. Cliquez **Deploy** ✓

### Obtenir une clé Mistral

Créez un compte sur [console.mistral.ai](https://console.mistral.ai/) et générez une clé API.

## Personnaliser les questions

Modifiez le fichier `lib/questions.ts` — chaque question suit ce format :

```ts
{
  id: 1,
  text: "Votre question ?",
  options: [
    { id: "a", text: "Option A" },
    { id: "b", text: "Option B" },
    { id: "c", text: "Option C" },
    { id: "d", text: "Option D" },
  ],
  correctIds: ["a", "c"], // exactement 2 IDs corrects
}
```

## Structure du projet

```
quiz-app/
├── app/
│   ├── layout.tsx          # Layout global
│   ├── page.tsx            # Page principale (orchestration)
│   ├── globals.css         # Styles globaux
│   └── api/chat/route.ts   # Route API → Mistral
├── components/
│   ├── QuizQuestion.tsx    # Composant question interactive
│   └── Summary.tsx         # Récapitulatif + chatbot
└── lib/
    └── questions.ts        # Données et types
```
