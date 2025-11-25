import React, { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Cpu, HardDrive, Server, Cloud, Monitor, Code, Database, Wifi, Smartphone, ClipboardList, Zap} from "lucide-react";

// Map icon names to Lucide components
const iconMap = {
  Cpu, HardDrive, Server, Cloud, Monitor, Code, Database, Wifi, Smartphone
};

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
              {savedQuizzes.map((q) => {
                const IconComponent = iconMap[q.icon] || Cpu;
                return (
                  <div key={q.id} className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                    {/* Top colored part */}
                    <div className="p-4 flex items-center gap-3" style={{ backgroundColor: q.bgColor || "#4ade80" }}>
                      <IconComponent className="w-6 h-6 text-white" />
                      <h3 className="text-white font-semibold text-sm">{q.title}</h3>
                    </div>
                    {/* Bottom white part */}
                    <div className="p-4 bg-white space-y-2">
                        <p className="text-xs text-slate-600">{q.description}</p>
                        <p className="text-xs text-slate-500">
                          • {q.questions.length} {q.questions.length === 1 ? "question" : "questions"}
                        </p>
                        <p className="text-xs text-slate-500">• Difficulty: {q.difficulty}</p>
                        <p className="text-xs text-slate-500">• Duration: {q.duration} mins</p>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-3">
                        <Button className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 text-xs flex-1 flex items-center justify-center gap-1">
                          <ClipboardList className="w-4 h-4" />
                          Multiple Choice
                        </Button>
                        <Button className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 text-xs flex-1 flex items-center justify-center gap-1">
                          <Zap className="w-4 h-4" />
                          Flashcards
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
