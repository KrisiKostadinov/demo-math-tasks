export default [
  {
    question:
      "Изберете думите, съставени от 4 букви: маса, ако, игра, но, пейка, лапа, теза",
    options: [
      { text: "маса, игра, лапа, теза", correct: true },
      { text: "аз, маса, игра, лапа, теза", correct: false },
      { text: "ама, маса, игра, лапа, теза", correct: false },
      { text: "лебед, маса, игра, лапа, теза", correct: false },
    ],
  },
  {
    question:
      "Открийте кое от изброените НЕ е плод: ябълка, банан, морков, портокал",
    options: [
      { text: "ябълка", correct: false },
      { text: "банан", correct: false },
      { text: "морков", correct: true },
      { text: "портокал", correct: false },
    ],
  },
  {
    question: "Коя от думите е най-дълга?",
    options: [
      { text: "стол", correct: false },
      { text: "книга", correct: false },
      { text: "компютър", correct: true },
      { text: "дърво", correct: false },
    ],
  },
  {
    question: "Колко гласни букви има в думата 'градина'?",
    options: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "5", correct: false },
    ],
  },
];