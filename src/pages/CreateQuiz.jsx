import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Cpu, HardDrive, Server, Cloud, Monitor, Code, Database, Wifi, Smartphone } from "lucide-react";

export default function CreateQuiz({ onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState([
    { id: 1, text: "", options: ["", "", "", ""], correct: 0 },
  ]);
  const [icon, setIcon] = useState("Cpu");
  const [bgColor, setBgColor] = useState("#4ade80"); // default green
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDifficulty("Medium");
    setDuration(30);
    setBgColor("#4ade80");
    setIcon("Cpu");
    setQuestions([{ id: 1, text: "", options: ["", "", "", ""], correct: 0 }]);
  };

  const handleCancel = () => {
    resetForm();
    onSave(); 
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: "", options: ["", "", "", ""], correct: 0 }]);
  };

  const updateQuestion = (qIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSave = () => {
    const quiz = { id: Date.now(), title, description, difficulty, duration, questions, bgColor, icon };
    const existing = JSON.parse(localStorage.getItem("quizzes") || "[]");
    existing.push(quiz);
    localStorage.setItem("quizzes", JSON.stringify(existing));

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSave(); 
    }, 1200);
  };

  // Icons map
  const icons = [
    { name: "Cpu", Icon: Cpu },
    { name: "HardDrive", Icon: HardDrive },
    { name: "Server", Icon: Server },
    { name: "Cloud", Icon: Cloud },
    { name: "Monitor", Icon: Monitor },
    { name: "Code", Icon: Code },
    { name: "Database", Icon: Database },
    { name: "Wifi", Icon: Wifi },
    { name: "Smartphone", Icon: Smartphone },
  ];

  return (
    <div className="min-h-full flex flex-col bg-slate-50 text-slate-900">
      {success && (
        <div className="w-full bg-green-600 text-white text-center py-2 text-sm">
          ✔ Quiz saved successfully!
        </div>
      )}

      <header className="h-16 flex items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-semibold">Create New Quiz</h1>
          <p className="text-xs text-slate-500">Design your own quiz for TOPCIT practice</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-xs" onClick={handleCancel}>Cancel</Button>
          <Button className="bg-green-600 hover:bg-green-700 text-xs" onClick={handleSave}>Save Quiz</Button>
        </div>
      </header>

      {/* Quiz Info & Questions */}
      <div className="p-6 space-y-6 overflow-y-auto">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Quiz Information
              {icons.find(i => i.name === icon)?.Icon && React.createElement(icons.find(i => i.name === icon).Icon, { className: "w-6 h-6" })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <Label>Quiz Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <Label>Description</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Difficulty Level</Label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <Label>Duration (minutes)</Label>
                <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>

              <div>
                <Label>Background Color</Label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-8 border rounded cursor-pointer" />
              </div>
            </div>

            {/* Icon Selection */}
            <div>
              <Label>Quiz Icon</Label>
              <div className="flex flex-wrap gap-3 mt-2">
                {icons.map(({ name, Icon }) => (
                  <button
                    key={name}
                    type="button"
                    className={`p-2 border rounded ${icon === name ? "border-blue-600 bg-blue-100" : ""}`}
                    onClick={() => setIcon(name)}
                  >
                    <Icon className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

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
                <Input value={q.text} onChange={(e) => updateQuestion(qi, "text", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Answer Options</Label>
                {q.options.map((opt, oi) => (
                  <div className="flex items-center gap-2" key={oi}>
                    <input type="radio" name={`correct-${q.id}`} checked={q.correct === oi} onChange={() => updateQuestion(qi, "correct", oi)} />
                    <Input value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + oi)}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
