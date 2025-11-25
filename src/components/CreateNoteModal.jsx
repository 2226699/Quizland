import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function CreateNoteModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bgColor, setBgColor] = useState("bg-white");

  const colors = [
    "bg-white",
    "bg-yellow-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-pink-100",
    "bg-purple-100",
  ];

  const borderColors = {
    "bg-white": "#d1d5db",
    "bg-yellow-100": "#facc15",
    "bg-green-100": "#4ade80",
    "bg-blue-100": "#60a5fa",
    "bg-pink-100": "#f472b6",
    "bg-purple-100": "#a78bfa",
  };


  const handleSave = () => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      bgColor,
      borderColor: borderColors[bgColor],
    };
    onSave(newNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Create New Note</h2>
          <p className="text-xs text-slate-500">
            Add a new study note to organize your learning
          </p>
        </div>

        {/* Title */}
        <div className="mb-3">
          <Input
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm"
          />
        </div>

        {/* Content */}
        <div className="mb-3">
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded-lg border border-slate-200 text-sm resize-none h-24"
          />
        </div>

        {/* Background color selector */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-1">Choose Background Color</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`h-6 w-6 rounded-full border ${color} ${
                  bgColor === color ? "border-slate-900 border-2" : "border-slate-200"
                }`}
                onClick={() => setBgColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
}
