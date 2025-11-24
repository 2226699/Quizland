import React, { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Quizzes() {
  const [showCreate, setShowCreate] = useState(false);
  const [savedQuizzes, setSavedQuizzes] = useState([]);

  // Load quizzes from localStorage
  const loadQuizzes = () => {
    const data = JSON.parse(localStorage.getItem("quizzes") || "[]");
    setSavedQuizzes(data);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      {showCreate ? (
        <CreateQuiz
          onSave={() => {
            setShowCreate(false);
            loadQuizzes();
          }}
        />
      ) : (
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Your Quizzes</h2>
            <Button
              className="bg-green-600 hover:bg-green-700 text-xs"
              onClick={() => setShowCreate(true)}
            >
              + Create Quiz
            </Button>
          </div>

          {/* Saved Quizzes */}
          {savedQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedQuizzes.map((q) => (
                <Card key={q.id} className="border border-slate-200 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">{q.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="text-xs text-slate-600">{q.description}</p>
                    <p className="text-xs text-slate-500">• {q.questions.length} questions</p>
                    <p className="text-xs text-slate-500">• Difficulty: {q.difficulty}</p>
                    <p className="text-xs text-slate-500">• Duration: {q.duration} mins</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 text-sm mt-20">
              No quizzes found. <br />
              Click <span className="font-medium">+ Create Quiz</span> to begin.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
