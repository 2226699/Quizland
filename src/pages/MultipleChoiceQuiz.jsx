import React, { useState, useEffect } from "react";
import { ChevronLeft, Flag, ChevronRight, Timer } from "lucide-react";

export default function MultipleChoiceQuiz({ quiz, onBack, onSubmit }) {
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="p-6 text-red-600 text-sm">No quiz data available.</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  
  // TIMER
  const totalSeconds = (quiz.duration || 30) * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitQuiz(); // Auto-submit
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60).toString().padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSelect = (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const toggleFlag = () => {
    setFlags({ ...flags, [currentIndex]: !flags[currentIndex] });
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    let incorrect = 0;

    quiz.questions.forEach((q, i) => {
      const user = answers[i];
      if (user === q.correct) correct++;
      else incorrect++;
    });

    const result = {
      quizId: quiz.id,
      title: quiz.title,
      total: quiz.questions.length,
      correct,
      incorrect,
      unanswered: quiz.questions.length - Object.keys(answers).length,
      flagged: Object.values(flags).filter(Boolean).length,
      answers,
      quiz,
      timeUsed: totalSeconds - timeLeft,
    };

    onSubmit(result);
  };

  const q = quiz.questions[currentIndex];

  // TIMER COLOR
  const timerColor =
    timeLeft <= 20 ? "text-red-600" :
    timeLeft <= 60 ? "text-orange-500" :
    "text-slate-700";

  return (
    <div className="p-6 min-h-screen bg-slate-50 flex flex-col gap-4">

      {/* TOP CARD: Question Progress + TIMER */}
      <div className="bg-white p-4 rounded-xl shadow border border-slate-200 flex justify-between items-center">
        
        {/* Left: progress */}
        <div>
          <div className="text-sm font-semibold text-slate-800 mb-2">
            Question {currentIndex + 1} of {quiz.questions.length}
          </div>

          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Right: TIMER */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 ${timerColor}`}>
          <Timer className="w-4 h-4" />
          <span className="font-semibold">{formatTime(timeLeft)}</span>
        </div>

      </div>

      {/* QUESTION CARD */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200 min-h-[150px]">
        <p className="text-sm text-slate-900">{q.text}</p>

        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-3 border rounded-lg cursor-pointer text-sm
                ${answers[currentIndex] === i
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-300"}
                hover:bg-slate-100`}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>

      {/* NAVIGATION ROW */}
      <div className="flex justify-between items-center gap-3 bg-white p-3 rounded-xl shadow border border-slate-200">

        <button
          className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50"
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <button
          className={`flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 cursor-pointer ${
            flags[currentIndex] ? "bg-yellow-300" : "hover:bg-slate-100"
          }`}
          onClick={toggleFlag}
        >
          <Flag className="w-4 h-4" />
          {flags[currentIndex] ? "Unflag" : "Flag"}
        </button>

        {currentIndex === quiz.questions.length - 1 ? (
          <button
            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 hover:bg-slate-100"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* NAVIGATOR */}
      <div className="bg-white p-4 rounded-xl shadow border border-slate-200 space-y-3">
        <div className="text-sm font-medium text-slate-700">Question Navigator</div>

        <div className="grid grid-cols-5 gap-2">
          {quiz.questions.map((_, i) => {
            const isCurrent = currentIndex === i;
            const isFlagged = flags[i];
            const isAnswered = answers[i] !== undefined;

            let bgClass = "bg-slate-100 border-slate-300";
            if (isCurrent) bgClass = "bg-blue-50 border-blue-600";
            else if (isFlagged) bgClass = "bg-yellow-100 border-yellow-400";
            else if (isAnswered) bgClass = "bg-green-50 border-green-400";

            return (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-10 flex items-center justify-center rounded-md text-xs cursor-pointer border ${bgClass}`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onBack}
        className="mt-4 px-4 py-2 text-xs rounded-lg bg-slate-200 hover:bg-slate-300"
      >
        Back to Quizzes
      </button>
    </div>
  );
}
