import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Quizzes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState([
    { id: 1, text: "", options: ["", "", "", ""], correct: 0 },
  ]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDifficulty("Medium");
    setDuration(30);
    setQuestions([{ id: 1, text: "", options: ["", "", "", ""], correct: 0 }]);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        text: "",
        options: ["", "", "", ""],
        correct: 0,
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    if (field === "text") updated[index].text = value;
    if (field === "correct") updated[index].correct = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">📘</div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-800">TOPCIT</p>
            <p className="text-[10px] text-slate-500">Learning Platform</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <button className="w-full flex items-center rounded-lg px-3 py-2 text-left bg-slate-100 text-slate-900 text-xs">Quizzes</button>
          <button className="w-full flex items-center rounded-lg px-3 py-2 text-left text-slate-600 hover:bg-slate-100 text-xs">Dashboard</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between border-b border-slate-200 bg-white px-6">
          <div>
            <h1 className="text-lg font-semibold">Create New Quiz</h1>
            <p className="text-xs text-slate-500">Design your own quiz for TOPCIT practice</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-xs" onClick={resetForm}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-xs">Save Quiz</Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-base">Quiz Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <Label>Quiz Title</Label>
                <Input placeholder="e.g. Advanced Programming Concepts" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div>
                <Label>Description</Label>
                <Input placeholder="Brief description of what this quiz covers" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Difficulty Level</Label>
                  <Input value={difficulty} readOnly className="bg-slate-100" />
                </div>
                <div>
                  <Label>Duration (minutes)</Label>
                  <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">Questions ({questions.length})</h2>
            <Button className="bg-blue-600 text-xs" onClick={addQuestion}>+ Add Question</Button>
          </div>

          {questions.map((q, qi) => (
            <Card key={q.id} className="p-6">
              <CardHeader>
                <CardTitle className="text-sm">Question {qi + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <Label>Question Text</Label>
                  <Input placeholder="Enter your questions here" value={q.text} onChange={(e) => updateQuestion(qi, "text", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Answer Options</Label>
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input type="radio" checked={q.correct === oi} onChange={() => updateQuestion(qi, "correct", oi)} />
                      <Input placeholder={`Option ${String.fromCharCode(65 + oi)}`} value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
