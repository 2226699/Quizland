import React, { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";
import Flashcards from "./Flashcards";
import { Button } from "../components/ui/button";
import ResultsPage from "./ResultsPage";
import { motion } from "framer-motion";

import { 
  Cpu, HardDrive, Server, Cloud, Monitor, Code, Database, Wifi, Smartphone,
  ClipboardList, Zap, Trash2
} from "lucide-react";

// Map icon names to Lucide components
const iconMap = {
  Cpu, HardDrive, Server, Cloud, Monitor, Code, Database, Wifi, Smartphone
};

// Hardcoded static quizzes
const defaultQuizzes = [
  {
    id: "static-1",
    title: "Introduction to Computers",
    description: "Basic concepts in computing and hardware fundamentals.",
    difficulty: "Easy",
    duration: 20,
    icon: "Cpu",
    bgColor: "#4ade80",
    questions: [
      { question: "What is a computer?", options: ["A machine", "A fruit"], answer: 0 },
      { question: "Which is an input device?", options: ["Mouse", "Monitor"], answer: 0 },
    ],
    owner: "static"
  },
  {
    id: "static-2",
    title: "Networking Basics",
    description: "Covers IP addresses, routers, and data transmission.",
    difficulty: "Medium",
    duration: 30,
    icon: "Wifi",
    bgColor: "#60a5fa",
    questions: [
      { question: "What does LAN stand for?", options: ["Local Area Network", "Large Area Net"], answer: 0 },
    ],
    owner: "static"
  },
  {
    id: "static-3",
    title: "Programming Fundamentals",
    description: "Variables, data types, and basic logic.",
    difficulty: "Easy",
    duration: 25,
    icon: "Code",
    bgColor: "#facc15",
    questions: [
      { question: "What is a variable?", options: ["Storage", "Food"], answer: 0 },
    ],
    owner: "static"
  },
  {
    id: "static-4",
    title: "Databases 101",
    description: "Learn about tables, queries, and basic SQL.",
    difficulty: "Medium",
    duration: 35,
    icon: "Database",
    bgColor: "#f87171",
    questions: [
      { question: "What is SQL used for?", options: ["Design", "Data Management"], answer: 1 },
    ],
    owner: "static"
  },
  {
    id: "static-5",
    title: "Cloud Computing",
    description: "Introduction to cloud services and storage.",
    difficulty: "Medium",
    duration: 40,
    icon: "Cloud",
    bgColor: "#a78bfa",
    questions: [
      { question: "Which is a cloud provider?", options: ["AWS", "Dell"], answer: 0 },
    ],
    owner: "static"
  }
];

export default function Quizzes() {
  const [showCreate, setShowCreate] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [flashcardQuiz, setFlashcardQuiz] = useState(null);
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [filter, setFilter] = useState("all"); // all or owned

  const retakeQuiz = () => {
    setQuizResult(null);
    setActiveQuiz(quizResult.quiz);
  };

  // Load quizzes from localStorage and merge with default quizzes
  const loadQuizzes = () => {
    const data = JSON.parse(localStorage.getItem("quizzes") || "[]" );
    const normalized = data.map(q => ({
      ...q,
      questions: Array.isArray(q.questions) ? q.questions : [],
      owner: "user"
    }));
    setSavedQuizzes([...defaultQuizzes, ...normalized]);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  // Delete a user quiz
  const deleteQuiz = (id) => {
    const updated = savedQuizzes.filter(q => q.id !== id);
    setSavedQuizzes(updated);
    const userQuizzes = updated.filter(q => q.owner === "user");
    localStorage.setItem("quizzes", JSON.stringify(userQuizzes));
  };

  const filteredQuizzes = savedQuizzes.filter(q => filter === "all" ? true : q.owner === "user");

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      {quizResult ? (
        <ResultsPage 
          result={quizResult} 
          onBack={() => setQuizResult(null)}
          onRetake={retakeQuiz}
        />
      ) : flashcardQuiz ? (
        <Flashcards 
          quiz={flashcardQuiz} 
          onBack={() => setFlashcardQuiz(null)} 
        />
      ) : activeQuiz ? (
        <MultipleChoiceQuiz 
          quiz={activeQuiz}
          onBack={() => setActiveQuiz(null)}
          onSubmit={(result) => setQuizResult(result)}
        />
      ) : showCreate ? (
        <CreateQuiz
          onSave={() => {
            setShowCreate(false);
            loadQuizzes();
          }}
        />
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Quizzes</h2>
              <p className="text-xs text-slate-500">Organize your study materials and tasks</p>
            </div>
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

          {/* Filter */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              className={`text-xs px-4 py-1 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-white text-black border border-slate-300"} hover:bg-blue-600 hover:text-white`}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              className={`text-xs px-4 py-1 rounded ${filter === "owned" ? "bg-blue-600 text-white" : "bg-white text-black border border-slate-300"} hover:bg-blue-600 hover:text-white`}
              onClick={() => setFilter("owned")}
            >
              Owned
            </Button>
          </div>
          <hr className="mb-6 border-slate-300" />

          {filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((q, i) => {
                const IconComponent = iconMap[q.icon] || Cpu;
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                      <div
                        className="p-4 flex items-center gap-3"
                        style={{ backgroundColor: q.bgColor || "#4ade80" }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                        <h3 className="text-white font-semibold text-sm">{q.title}</h3>
                        {q.owner === "user" && (
                          <Trash2
                            className="w-5 h-5 ml-auto cursor-pointer text-white"
                            onClick={() => deleteQuiz(q.id)}
                          />
                        )}
                      </div>
                      <div className="p-4 bg-white space-y-2">
                        <p className="text-xs text-slate-600">{q.description}</p>
                        {q.owner === "user" && (
                          <p className="text-xs text-blue-600 font-medium">Created by you</p>
                        )}
                        <p className="text-xs text-slate-500">
                          • {q.questions.length} {q.questions.length === 1 ? "question" : "questions"}
                        </p>
                        <p className="text-xs text-slate-500">
                          • Difficulty: {q.difficulty}
                        </p>
                        <p className="text-xs text-slate-500">
                          • Duration: {q.duration} mins
                        </p>
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
              No quizzes found for this filter. <br />
              Click <span className="font-medium">+ Create Quiz</span> to add your own.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
