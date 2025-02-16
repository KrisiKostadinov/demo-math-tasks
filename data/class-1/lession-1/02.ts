export default [
  {
    question:
      "Изберете думите, в които има 1 буква 'а': мечта, пазарска, от, купа, ако, лапа, козирка",
    options: [
      { text: "ти, мечта, купа, ако, козирка", correct: false },
      { text: "мечта, купа, ако, козирка", correct: true },
      { text: "канава, мечта, купа, ако, козирка", correct: false },
      { text: "ваза, мечта, купа, ако, козирка", correct: false },
    ],
  },
  {
    question:
      "Изберете думите, които имат точно 2 срички: ябълка, книга, учител, стол, голям",
    options: [
      { text: "ябълка, книга, стол", correct: false },
      { text: "книга, стол", correct: true },
      { text: "учител, голям", correct: false },
      { text: "ябълка, учител, голям", correct: false },
    ],
  },
  {
    question:
      "Коя от думите е противоположна по значение на 'тъжен': щастлив, усмихнат, весел, радостен",
    options: [
      { text: "щастлив", correct: true },
      { text: "усмихнат", correct: false },
      { text: "весел", correct: false },
      { text: "радостен", correct: false },
    ],
  },
  {
    question: "От колко букви се състои думата 'велосипед'?",
    options: [
      { text: "8", correct: false },
      { text: "9", correct: false },
      { text: "10", correct: true },
      { text: "11", correct: false },
    ],
  },
];
