import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

export default function Quizzes({ onCreate }) {
  const [savedQuizzes, setSavedQuizzes] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizzes") || "[]");
    setSavedQuizzes(data);
  }, []);

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">

      {/* Header */}
      <div className="px-6 py-6 border-b border-slate-200 bg-white flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Your Quizzes</p>
          <h2 className="text-lg font-semibold">Saved Quizzes</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-64">
            <div className="relative">
              <Input placeholder="Search quizzes..." className="pl-9 text-xs" />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <Button
            className="bg-green-600 hover:bg-green-700 text-xs"
            onClick={onCreate}
          >
            + Create Quiz
          </Button>
        </div>
      </div>

      {/* Page content */}
      <div className="p-6">

        {/* Saved Quizzes Section */}
        {savedQuizzes.length > 0 ? (
          <div>
            <h2 className="text-sm font-semibold mb-3">Saved Quizzes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedQuizzes.map((q) => (
                <Card key={q.id} className="border border-slate-200 rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      {q.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-sm space-y-3">
                    <p className="text-xs text-slate-600">{q.description}</p>

                    <p className="text-xs text-slate-500">
                      • {q.questions.length} questions
                    </p>
                    <p className="text-xs text-slate-500">
                      • Difficulty: {q.difficulty}
                    </p>
                    <p className="text-xs text-slate-500">
                      • Duration: {q.duration} mins
                    </p>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="text-xs h-7 px-3">
                        Start Quiz
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 px-3"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 text-sm mt-20">
            No quizzes found.  
            <br />
            Click <span className="font-medium">Create Quiz</span> to begin.
          </div>
        )}
      </div>
    </div>
  );
}
