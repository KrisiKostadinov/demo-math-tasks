export default [
  {
    id: 1,
    question:
      "Изберете думите, съставени от 4 букви: игра, ти, база, сол, пейка, коза, маса",
    options: [
      { text: "ама,игра,база,коза,маса", correct: false },
      { text: "лебед,игра,база,коза,маса", correct: false },
      { text: "игра,база,коза,маса", correct: true },
      { text: "аз,игра,база,коза,маса", correct: false },
    ],
  },
  {
    id: 2,
    question:
      "Изберете думите с 5 букви: котка, топка, слон, лампа, бебе, слънце",
    options: [
      { text: "котка, топка, лампа", correct: true },
      { text: "слон, лампа, слънце", correct: false },
      { text: "котка, бебе, слънце", correct: false },
      { text: "топка, бебе, слон", correct: false },
    ],
  },
  {
    id: 3,
    question: "Кои числа са четни: 3, 8, 15, 22, 7, 10",
    options: [
      { text: "8, 22, 10", correct: true },
      { text: "3, 8, 15", correct: false },
      { text: "7, 15, 10", correct: false },
      { text: "8, 22, 7", correct: false },
    ],
  },
  {
    id: 4,
    question: "Изберете животните: лъв, маса, слон, дърво, тигър",
    options: [
      { text: "лъв, слон, тигър", correct: true },
      { text: "лъв, маса, слон", correct: false },
      { text: "слон, дърво, тигър", correct: false },
      { text: "маса, дърво, слон", correct: false },
    ],
  },
];