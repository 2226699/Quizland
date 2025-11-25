import React, { useState } from "react";

export default function MultipleChoiceQuiz({ quiz, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});

  const q = quiz.questions[currentIndex];

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
      {/* Row 1: Question Number */}
      <div className="text-sm font-medium text-slate-700">
        {currentIndex + 1} of {quiz.questions.length}
      </div>

      {/* Row 2: Question Card */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200 min-h-[150px]">
        <p className="text-sm text-slate-900">
          {q.text || "No question text."}
        </p>

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
      <div className="flex justify-between items-center gap-3">
        <button
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-xs rounded-lg"
          onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          Back
        </button>

        <button
          className={`px-4 py-2 text-xs rounded-lg ${
            flags[currentIndex]
              ? "bg-yellow-300 hover:bg-yellow-400"
              : "bg-yellow-200 hover:bg-yellow-300"
          }`}
          onClick={toggleFlag}
        >
          {flags[currentIndex] ? "Unflag" : "Flag"}
        </button>

        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg"
          onClick={() =>
            currentIndex < quiz.questions.length - 1 &&
            setCurrentIndex(currentIndex + 1)
          }
          disabled={currentIndex === quiz.questions.length - 1}
        >
          Next
        </button>
      </div>

      {/* Row 4: Question Navigator */}
      <div className="bg-white p-4 rounded-xl shadow border border-slate-200">
        <div className="grid grid-cols-5 gap-2">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-10 flex items-center justify-center rounded-md text-xs cursor-pointer
                border
                ${
                  currentIndex === i
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-300"
                }
                ${
                  flags[i]
                    ? "bg-yellow-100 border-yellow-400"
                    : ""
                }
                hover:bg-slate-100`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
