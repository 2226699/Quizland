import React, { useState } from "react";
import { ChevronLeft, Flag, ChevronRight, Undo2 } from "lucide-react";

export default function Flashcards({ quiz, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flags, setFlags] = useState({});
  const [status, setStatus] = useState({}); // known/review

  const q = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const correctAnswer = q.options[q.answer];

  const progress = ((currentIndex + 1) / total) * 100;

  const toggleFlag = () => {
    setFlags((prev) => ({ ...prev, [currentIndex]: !prev[currentIndex] }));
  };

  const markStatus = (state) => {
    setStatus((prev) => ({ ...prev, [currentIndex]: state }));
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50 flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-slate-600 hover:text-slate-900 text-sm flex items-center gap-1"
        >
          <Undo2 size={16} /> Back
        </button>

        <div className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          {quiz.title}
        </div>
      </div>

      {/* Question number + progress */}
      <div className="bg-white p-4 rounded-xl shadow border border-slate-200">
        <div className="text-sm font-medium text-slate-700 mb-1">
          Question {currentIndex + 1} of {total}
        </div>

        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative w-full h-72 cursor-pointer perspective" onClick={() => setIsFlipped(!isFlipped)}>

        {/* Card */}
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d 
            ${isFlipped ? "rotate-y-180" : ""}`}>

          {/* FRONT SIDE */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow border border-slate-200 flex flex-col items-center justify-center px-10">
            <div className="text-purple-700 font-semibold text-sm mb-1">Question</div>
            <p className="text-lg font-medium text-slate-800 text-center">{q.question}</p>
            <p className="text-xs text-slate-400 mt-4">click card to flip back</p>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden bg-white rounded-xl shadow border border-slate-200 flex flex-col items-center justify-center px-10">
            <div className="text-green-700 font-semibold text-sm mb-1">Answer</div>
            <p className="text-lg font-medium text-slate-800 text-center">{correctAnswer}</p>
            <p className="text-xs text-slate-400 mt-4">click card to flip front</p>
          </div>

        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center gap-3 bg-white p-3 rounded-xl shadow border border-slate-200">

        {/* Previous */}
        <button
          className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50"
          onClick={() => {
            setIsFlipped(false);
            currentIndex > 0 && setCurrentIndex(currentIndex - 1);
          }}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {/* Flag */}
        <button
          className={`flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 cursor-pointer ${
            flags[currentIndex] ? "bg-yellow-300" : "hover:bg-slate-100"
          }`}
          onClick={toggleFlag}
        >
          <Flag className="w-4 h-4" />
          {flags[currentIndex] ? "Unflag" : "Flag"}
        </button>

        {/* Next */}
        <button
          className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50"
          onClick={() => {
            setIsFlipped(false);
            currentIndex < total - 1 && setCurrentIndex(currentIndex + 1);
          }}
          disabled={currentIndex === total - 1}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* Question Navigator */}
      <div className="bg-white p-4 rounded-xl shadow border border-slate-200">
        <div className="grid grid-cols-10 gap-2">
          {quiz.questions.map((_, i) => {
            const isCurrent = currentIndex === i;
            const isFlagged = flags[i];

            return (
              <div
                key={i}
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentIndex(i);
                }}
                className={`
                  h-8 flex items-center justify-center rounded-md text-xs cursor-pointer border transition
                  ${isCurrent ? "bg-purple-600 text-white border-purple-600" : "bg-slate-100 border-slate-300"}
                  ${isFlagged && !isCurrent ? "bg-yellow-300 border-yellow-500 text-slate-900" : ""}
                  ${isFlagged && isCurrent ? "bg-yellow-400 border-yellow-600 text-slate-900" : ""}
                `}
              >
                {i + 1}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-600 rounded-sm" /> Current
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-300 rounded-sm border border-yellow-500" /> Flagged
          </div>
        </div>
      </div>
    </div>
  );
}
