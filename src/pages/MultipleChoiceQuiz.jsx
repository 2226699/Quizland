import React, { useState } from "react";
import { ChevronLeft, Flag, ChevronRight } from "lucide-react";

export default function MultipleChoiceQuiz({ quiz, onBack }) {
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="p-6 text-red-600 text-sm">
        No quiz data available.
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});

  const q = quiz.questions[currentIndex] ?? { text: "", options: [] };

  const handleSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentIndex]: optionIndex,
    });
  };

  const toggleFlag = () => {
    setFlags({
      ...flags,
      [currentIndex]: !flags[currentIndex],
    });
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50 flex flex-col gap-4">
   {/* Row 1: Question Progress Card */}
    <div className="bg-white p-4 rounded-xl shadow border border-slate-200">
        {/* Current Question Number */}
        <div className="text-sm font-semibold text-slate-800 mb-2">
            Question {currentIndex + 1} of {quiz.questions.length}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3">
            <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
            />
        </div>
    </div>

      {/* Row 2: Question Card */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200 min-h-[150px]">
        <p className="text-sm text-slate-900">{q.text || "No question text."}</p>

        {/* Options */}
        <div className="mt-4 space-y-2">
          {(q.options ?? []).map((opt, i) => (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-3 border rounded-lg cursor-pointer text-sm
                ${answers[currentIndex] === i ? "border-blue-600 bg-blue-50" : "border-slate-300"}
                hover:bg-slate-100`}
            >
              {opt || "(empty option)"}
            </div>
          ))}
        </div>
      </div>

     {/* Row 3: Navigation */}
    <div className="flex justify-between items-center gap-3 bg-white p-3 rounded-xl shadow border border-slate-200">
        {/* Previous */}
        <button
            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
        >
            <ChevronLeft className="w-4 h-4" />
            Previous
        </button>

        {/* Flag */}
        <button
            className={`flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 cursor-pointer ${
            flags[currentIndex]
                ? "bg-yellow-300 hover:bg-yellow-400"
                : "hover:bg-slate-100"
            }`}
            onClick={toggleFlag}
        >
            <Flag className="w-4 h-4" />
            {flags[currentIndex] ? "Unflag" : "Flag"} Question
        </button>

        {/* Next */}
        <button
            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
            onClick={() =>
            currentIndex < quiz.questions.length - 1 &&
            setCurrentIndex(currentIndex + 1)
            }
            disabled={currentIndex === quiz.questions.length - 1}
        >
            Next
            <ChevronRight className="w-4 h-4" />
        </button>
    </div>

      {/* Row 4: Question Navigator */}
    <div className="bg-white p-4 rounded-xl shadow border border-slate-200 space-y-3">
        {/* Label */}
        <div className="text-sm font-medium text-slate-700">Question Navigator</div>

        {/* Question Boxes */}
        <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((_, i) => {
                const isCurrent = currentIndex === i;
                const isFlagged = flags[i];
                const isAnswered = answers[i] !== undefined;

                let bgClass = "bg-slate-100 border-slate-300"; // default: unanswered
                if (isCurrent) bgClass = "bg-blue-50 border-blue-600";
                else if (isFlagged) bgClass = "bg-yellow-100 border-yellow-400";
                else if (isAnswered) bgClass = "bg-green-50 border-green-400";

                return (
                    <div
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-10 flex items-center justify-center rounded-md text-xs cursor-pointer border ${bgClass} hover:bg-slate-200`}
                    >
                    {i + 1}
                    </div>
                );
            })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-slate-700">
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-50 border border-blue-600 rounded-sm" />
                Current
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-100 border border-yellow-400 rounded-sm" />
                    Flagged
                    </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-slate-100 border border-slate-300 rounded-sm" />
                    Unanswered
                    </div>
                    <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-50 border border-green-400 rounded-sm" />
                Answered
            </div>
        </div>
    </div>


      {/* Back Button */}
      <button
        onClick={onBack}
        className="mt-4 px-4 py-2 text-xs rounded-lg bg-slate-200 hover:bg-slate-300"
      >
        Back to Quizzes
      </button>
    </div>
  );
}
