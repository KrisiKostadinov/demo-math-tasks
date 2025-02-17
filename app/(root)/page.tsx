// import questions from "@/data/class-1/lession-2/01";
// import DisplayQuestion, { Question } from "@/components/display-question";
// import { shuffleArray } from "@/lib/utils";

import PageWrapper from "@/app/_components/page-wrapper";

export default function Home() {
  // const randomIndex = Math.floor(Math.random() * 4);
  // const currentQuestion: Question = questions[randomIndex];

  // currentQuestion.options = shuffleArray(currentQuestion.options);

  return (
    <PageWrapper>
      <div className="bg-gray-100 border-b-2 border-t-2 border-gray-200">
        <h1 className="text-center text-2xl font-semibold py-10">
          {process.env.NEXT_PUBLIC_WEBSITE_TITLE}
        </h1>
      </div>
      {/* <DisplayQuestion question={currentQuestion} /> */}
    </PageWrapper>
  );
}
