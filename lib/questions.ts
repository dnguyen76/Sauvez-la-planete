export interface Option {
  id: string
  text: string
}

export interface Question {
  id: number
  text: string
  options: Option[]
  correctIds: string[]   // 1 ou plusieurs bonnes réponses
  multi: boolean         // true = plusieurs bonnes réponses possibles
}

export interface UserAnswer {
  questionId: number
  selectedIds: string[]
  questionText: string
  options: Option[]
  correctIds: string[]
}

export const QUIZ_TITLE = "Sauve la planète ! 🌍"
export const QUIZ_SUBTITLE = "Quiz sur le climat et l'environnement"

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Que signifie « Gaz à effet de serre » ?",
    multi: false,
    correctIds: ["a"],
    options: [
      { id: "a", text: "Des gaz qui réchauffent l'atmosphère en piégeant la chaleur" },
      { id: "b", text: "Des gaz qui purifient l'air en éliminant les polluants" },
      { id: "c", text: "Des gaz qui sont uniquement produits par les volcans" },
      { id: "d", text: "Des gaz qui n'ont aucun impact sur le climat" },
    ],
  },
  {
    id: 2,
    text: "Que signifie « empreinte carbone » ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "La quantité de déchets produits par une personne" },
      { id: "b", text: "La mesure des émissions de gaz à effet de serre d'une personne, d'une organisation ou d'un produit" },
      { id: "c", text: "La distance parcourue par un véhicule" },
      { id: "d", text: "La mesure de la consommation de viande d'un pays" },
    ],
  },
  {
    id: 3,
    text: "L'empreinte carbone est-elle la même pour tous les pays ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "Oui, tous les pays ont la même empreinte carbone" },
      { id: "b", text: "Non, elle varie en fonction des modes de vie et des politiques environnementales" },
      { id: "c", text: "Non, mais elle est toujours plus élevée dans les pays développés" },
    ],
  },
  {
    id: 4,
    text: "Quel gaz à effet de serre est le principal responsable du réchauffement climatique ?",
    multi: false,
    correctIds: ["c"],
    options: [
      { id: "a", text: "Méthane (CH4)" },
      { id: "b", text: "Protoxyde d'azote (N2O)" },
      { id: "c", text: "Dioxyde de carbone (CO2)" },
      { id: "d", text: "Ozone (O3)" },
    ],
  },
  {
    id: 5,
    text: "Quelle est la principale cause du réchauffement climatique aujourd'hui ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "L'activité solaire" },
      { id: "b", text: "Les émissions de gaz à effet de serre d'origine humaine" },
      { id: "c", text: "Les productions industrielles" },
      { id: "d", text: "L'activité volcanique" },
    ],
  },
  {
    id: 6,
    text: "Qui sont les principaux coupables du réchauffement climatique ?",
    multi: false,
    correctIds: ["c"],
    options: [
      { id: "a", text: "Les animaux (respiration)" },
      { id: "b", text: "Les plantes (photosynthèse)" },
      { id: "c", text: "Les activités humaines" },
      { id: "d", text: "L'extraction des métaux" },
    ],
  },
  {
    id: 7,
    text: "Quelles conséquences du réchauffement climatique peut-on déjà observer ?",
    multi: true,
    correctIds: ["a", "b", "c"],
    options: [
      { id: "a", text: "La fonte des calottes glaciaires" },
      { id: "b", text: "La hausse du niveau des océans" },
      { id: "c", text: "L'augmentation de la fréquence des ouragans" },
      { id: "d", text: "Le ralentissement de la rotation terrestre" },
    ],
  },
  {
    id: 8,
    text: "Quelles énergies renouvelables sont nos alliées pour réduire l'empreinte carbone ?",
    multi: true,
    correctIds: ["a", "c"],
    options: [
      { id: "a", text: "Énergie éolienne" },
      { id: "b", text: "Énergie thermique" },
      { id: "c", text: "Géothermie" },
      { id: "d", text: "Énergie fossile" },
    ],
  },
  {
    id: 9,
    text: "Quelles sont les principales sources d'émissions de CO2 d'origine humaine ?",
    multi: true,
    correctIds: ["a", "b", "c"],
    options: [
      { id: "a", text: "Combustion des énergies fossiles" },
      { id: "b", text: "Les transports" },
      { id: "c", text: "Les procédés industriels" },
      { id: "d", text: "L'agriculture" },
    ],
  },
  {
    id: 10,
    text: "Quel secteur est le plus grand émetteur de méthane (CH4) ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "Industrie chimique" },
      { id: "b", text: "Élevage de ruminants" },
      { id: "c", text: "Transports" },
      { id: "d", text: "Production d'énergie (nucléaire, éolien, solaire…)" },
    ],
  },
  {
    id: 11,
    text: "Pourquoi les émissions de gaz à effet de serre ont-elles explosé depuis la révolution industrielle ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "Croissance de la population mondiale" },
      { id: "b", text: "Utilisation massive des énergies fossiles" },
      { id: "c", text: "Déforestation" },
      { id: "d", text: "Utilisation des sols" },
    ],
  },
  {
    id: 12,
    text: "Quels impacts majeurs le réchauffement a-t-il sur la biodiversité ?",
    multi: true,
    correctIds: ["a", "b", "d"],
    options: [
      { id: "a", text: "Changement des habitats" },
      { id: "b", text: "Déplacement des espèces" },
      { id: "c", text: "Augmentation de la biodiversité" },
      { id: "d", text: "Expansion des espèces invasives" },
    ],
  },
  {
    id: 13,
    text: "Qu'est-ce qu'une stratégie d'atténuation du changement climatique ?",
    multi: false,
    correctIds: ["c"],
    options: [
      { id: "a", text: "S'adapter aux impacts" },
      { id: "b", text: "Évaluer les risques" },
      { id: "c", text: "Réduire les émissions de gaz" },
      { id: "d", text: "Accès à l'énergie pour tous" },
    ],
  },
  {
    id: 14,
    text: "Parmi ces options, laquelle n'est PAS une stratégie d'atténuation du changement climatique ?",
    multi: false,
    correctIds: ["c"],
    options: [
      { id: "a", text: "Reforestation (plantons des arbres !)" },
      { id: "b", text: "Captage et stockage du CO2 (on le garde sous clé)" },
      { id: "c", text: "Changement des cultures (on change de menu)" },
      { id: "d", text: "Transition énergétique (on passe aux renouvelables)" },
    ],
  },
  {
    id: 15,
    text: "Quel type d'élevage intensif est un gros émetteur de gaz à effet de serre ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "Élevage canin" },
      { id: "b", text: "Élevage bovin" },
      { id: "c", text: "Élevage ovin" },
      { id: "d", text: "Élevage de volailles" },
    ],
  },
  {
    id: 16,
    text: "Quel secteur en France a le plus grand impact en termes d'émissions de gaz à effet de serre ?",
    multi: false,
    correctIds: ["c"],
    options: [
      { id: "a", text: "Agriculture" },
      { id: "b", text: "Industrie" },
      { id: "c", text: "Transport" },
      { id: "d", text: "Bâtiment" },
    ],
  },
  {
    id: 17,
    text: "Que signifie « neutralité carbone » ?",
    multi: false,
    correctIds: ["c"],
    options: [
      { id: "a", text: "Produire du carbone neutre" },
      { id: "b", text: "Arrêter l'industrie" },
      { id: "c", text: "Équilibrer CO2 émis et absorbé" },
      { id: "d", text: "Interdire les voitures à essence" },
    ],
  },
  {
    id: 18,
    text: "Quelle est la principale conséquence de l'acidification des océans ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "Augmentation de la température de l'eau" },
      { id: "b", text: "Diminution de la biodiversité marine" },
      { id: "c", text: "Augmentation du niveau de la mer" },
      { id: "d", text: "Amélioration de la qualité de l'eau" },
    ],
  },
  {
    id: 19,
    text: "Quel accord international a été signé en 2015 pour lutter contre le changement climatique ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "Accord de Kyoto" },
      { id: "b", text: "Accord de Paris" },
      { id: "c", text: "Pacte de Rio" },
      { id: "d", text: "Protocole de Montréal" },
    ],
  },
  {
    id: 20,
    text: "Quel élément naturel est un super puits de carbone ?",
    multi: false,
    correctIds: ["c"],
    options: [
      { id: "a", text: "Déserts" },
      { id: "b", text: "Glaciers" },
      { id: "c", text: "Forêts" },
      { id: "d", text: "Montagnes" },
    ],
  },
  {
    id: 21,
    text: "Quel a été le premier pays à se retirer de l'accord de Kyoto ?",
    multi: false,
    correctIds: ["b"],
    options: [
      { id: "a", text: "Les USA" },
      { id: "b", text: "Le Canada" },
      { id: "c", text: "La Norvège" },
      { id: "d", text: "Le Japon" },
    ],
  },
  {
    id: 22,
    text: "Quels sont les objectifs de l'accord de Paris ?",
    multi: true,
    correctIds: ["a", "c"],
    options: [
      { id: "a", text: "Limiter le réchauffement global bien en dessous de 2 °C" },
      { id: "b", text: "Limiter la montée des eaux à 1 mètre" },
      { id: "c", text: "Mobiliser des financements pour aider les pays en développement à mettre en œuvre leurs plans climatiques" },
      { id: "d", text: "Limiter la fonte de la calotte glaciaire à 50 %" },
    ],
  },
  {
    id: 23,
    text: "Quel rôle jouent les forêts dans la régulation du climat ?",
    multi: true,
    correctIds: ["a", "b", "c"],
    options: [
      { id: "a", text: "Elles absorbent une grande quantité de chaleur" },
      { id: "b", text: "Elles régulent les inondations" },
      { id: "c", text: "Elles stockent une grande quantité de carbone sous forme de biomasse" },
      { id: "d", text: "Elles transforment l'eau en glucose" },
    ],
  },
]
