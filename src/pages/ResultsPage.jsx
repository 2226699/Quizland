import React from "react";
import { CheckCircle, XCircle, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function ResultsPage({ result, onBack, onRetake }) {
  if (!result) return null;

  const scorePercent = Math.round((result.correct / result.total) * 100);

  return (
    <div className="p-6 min-h-screen bg-slate-50 flex flex-col gap-6">

      {/* Header */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800">
          Quiz Results: {result.title}
        </h2>
        <p className="text-xs text-slate-500">
          Great job! Here is your performance summary.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Score Card */}
        <div className="bg-white p-5 rounded-xl shadow border border-slate-200 flex flex-col items-center">
          <p className="text-sm text-slate-500 mb-1">Score</p>
          <p className="text-4xl font-bold text-blue-700">{scorePercent}%</p>
        </div>

        {/* Correct */}
        <div className="bg-white p-5 rounded-xl shadow border border-slate-200 flex flex-col items-center">
          <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-lg font-semibold">{result.correct}</p>
          <p className="text-xs text-slate-500">Correct Answers</p>
        </div>

        {/* Incorrect */}
        <div className="bg-white p-5 rounded-xl shadow border border-slate-200 flex flex-col items-center">
          <XCircle className="w-8 h-8 text-red-600 mb-2" />
          <p className="text-lg font-semibold">{result.incorrect}</p>
          <p className="text-xs text-slate-500">Incorrect Answers</p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
        <p className="text-sm font-semibold mb-3">Details</p>
        <p className="text-xs text-slate-600">Total Questions: {result.total}</p>
        <p className="text-xs text-slate-600">Answered: {result.total - result.unanswered}</p>
        <p className="text-xs text-slate-600">Unanswered: {result.unanswered}</p>
        <p className="text-xs text-slate-600">Flagged: {result.flagged}</p>
      </div>

      {/* Review Answers */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
        <p className="text-sm font-semibold mb-4">Review Answers</p>

        <div className="space-y-4">
          {result.quiz.questions.map((q, idx) => {
            const userAnswer = result.answers[idx];
            const isCorrect = userAnswer === q.correct;

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  isCorrect
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <p className="text-sm font-medium">{idx + 1}. {q.text}</p>
                <p className="text-xs mt-1">
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {q.options[userAnswer] ?? "Not Answered"}
                </p>
                {!isCorrect && (
                  <p className="text-xs mt-1">
                    <span className="font-semibold">Correct Answer:</span>{" "}
                    {q.options[q.correct]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <Button
          className="bg-slate-200 text-xs hover:bg-slate-300"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Quizzes
        </Button>

        <Button
  className="bg-blue-600 text-xs text-white hover:bg-blue-700"
  onClick={onRetake}
>
  <RotateCcw className="w-4 h-4 mr-1" />
  Retake Quiz
</Button>


      </div>
    </div>
  );
}
