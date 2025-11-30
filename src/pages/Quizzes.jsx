import React, { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";
import Flashcards from "./Flashcards";
import { Button } from "../components/ui/button";
import ResultsPage from "./ResultsPage";
import { motion } from "framer-motion";

import { 
  Cpu, HardDrive, Server, Cloud, Monitor, Code, Database, Wifi, Smartphone,
  ClipboardList, Zap 
} from "lucide-react";

// Map icon names to Lucide components
const iconMap = {
  Cpu, HardDrive, Server, Cloud, Monitor, Code, Database, Wifi, Smartphone
};

export default function Quizzes() {
  const [showCreate, setShowCreate] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [flashcardQuiz, setFlashcardQuiz] = useState(null);
  const [savedQuizzes, setSavedQuizzes] = useState([]);
const [quizResult, setQuizResult] = useState(null);
const retakeQuiz = () => {
  setQuizResult(null);
  setActiveQuiz(quizResult.quiz);
};


  // Load quizzes from localStorage
  const loadQuizzes = () => {
    const data = JSON.parse(localStorage.getItem("quizzes") || "[]" );
    const normalized = data.map(q => ({
      ...q,
      questions: Array.isArray(q.questions) ? q.questions : []
    }));
    setSavedQuizzes(normalized);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">

      {/* RESULTS MODE — MUST BE FIRST */}
    {quizResult ? (
      <ResultsPage 
  result={quizResult} 
  onBack={() => setQuizResult(null)}
  onRetake={retakeQuiz}
/>
    ) : flashcardQuiz ? (

      /* Flashcard Mode */
      <Flashcards 
        quiz={flashcardQuiz} 
        onBack={() => setFlashcardQuiz(null)} 
      />

      ) : activeQuiz ? (

        /* Multiple Choice Mode */
        <MultipleChoiceQuiz 
    quiz={activeQuiz}
    onBack={() => setActiveQuiz(null)}
    onSubmit={(result) => setQuizResult(result)}
/>


      ) : showCreate ? (

        /* Create Quiz Form */
        <CreateQuiz
          onSave={() => {
            setShowCreate(false);
            loadQuizzes();
          }}
        />

      ) : (

        /* QUIZ HOMEPAGE */
        <div className="p-6">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            {/* Heading + Subtitle */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Quizzes</h2>
              <p className="text-xs text-slate-500">Organize your study materials and tasks</p>
            </div>

            {/* Create Button */}
            <Button
              className="bg-green-600 hover:bg-green-700 text-xs"
              onClick={() => {
                setActiveQuiz(null);
                setFlashcardQuiz(null);
                setShowCreate(true);
              }}
            >
              + Create Quiz
            </Button>
          </div>


          {/* Saved Quizzes */}
          {savedQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedQuizzes.map((q, i) => {
                const IconComponent = iconMap[q.icon] || Cpu;

                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                      {/* Top colored part */}
                      <div
                        className="p-4 flex items-center gap-3"
                        style={{ backgroundColor: q.bgColor || "#4ade80" }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                        <h3 className="text-white font-semibold text-sm">
                          {q.title}
                        </h3>
                      </div>

                      {/* Bottom white part */}
                      <div className="p-4 bg-white space-y-2">
                        <p className="text-xs text-slate-600">{q.description}</p>

                        <p className="text-xs text-slate-500">
                          • {q.questions.length}{" "}
                          {q.questions.length === 1 ? "question" : "questions"}
                        </p>

                        <p className="text-xs text-slate-500">
                          • Difficulty: {q.difficulty}
                        </p>

                        <p className="text-xs text-slate-500">
                          • Duration: {q.duration} mins
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-3">
                          <Button
                            className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 
                                    text-xs flex-1 flex items-center justify-center gap-1
                                    cursor-pointer transition duration-150 hover:scale-105"
                            onClick={() => setActiveQuiz(q)}
                          >
                            <ClipboardList className="w-4 h-4" />
                            Multiple Choice
                          </Button>

                          <Button
                            className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 
                                    text-xs flex-1 flex items-center justify-center gap-1
                                    cursor-pointer transition duration-150 hover:scale-105"
                            onClick={() => setFlashcardQuiz(q)}
                          >
                            <Zap className="w-4 h-4" />
                            Flashcards
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
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
