// import questions from "@/data/class-1/lession-2/01";
// import DisplayQuestion, { Question } from "@/components/display-question";
// import { shuffleArray } from "@/lib/utils";

export default function Home() {
  // const randomIndex = Math.floor(Math.random() * 4);
  // const currentQuestion: Question = questions[randomIndex];
  
  // currentQuestion.options = shuffleArray(currentQuestion.options);

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold py-10 text-white bg-blue-500">
        Математически тренажир
      </h1>
      {/* <DisplayQuestion question={currentQuestion} /> */}
    </div>
  );
}
