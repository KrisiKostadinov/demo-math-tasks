"use client";

import { useState } from "react";

type QuestionAnswer = {
  text: string;
  correct: boolean;
};

export type Question = {
  question: string;
  options: QuestionAnswer[];
};

type DisplayQuestionProps = {
  question: Question;
};

export default function DisplayQuestion({ question }: DisplayQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkAnswer = (option: string, correct: boolean) => {
    setSelectedOption(option);
    setIsCorrect(correct);
  };

  return (
    <div className="p-6 bg-purple-900 text-white rounded-lg">
      <h2 className="text-lg mb-4">{question.question}</h2>
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`block w-full text-left p-2 mb-2 rounded-lg 
                    ${
                      selectedOption === option.text
                        ? isCorrect
                          ? "bg-green-500"
                          : "bg-red-500"
                        : "bg-purple-700"
                    }`}
          onClick={() => checkAnswer(option.text, option.correct)}
        >
          {option.text}
        </button>
      ))}
      {isCorrect !== null && (
        <p className="mt-4">
          {isCorrect ? "✅ Верен отговор!" : "❌ Грешен отговор!"}
        </p>
      )}
    </div>
  );
}