import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function EditNoteModal({ note, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bgColor, setBgColor] = useState("bg-white");
  
  const borderColorsHex = {
    "bg-white": "#d1d5db",
    "bg-yellow-100": "#facc15",
    "bg-green-100": "#4ade80",
    "bg-blue-100": "#60a5fa",
    "bg-pink-100": "#f472b6",
    "bg-purple-100": "#a78bfa",
  };

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setBgColor(note.bgColor || "bg-white");
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      ...note,
      title,
      content,
      bgColor,
      borderColor: borderColorsHex[bgColor],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Edit Note</h2>
        <p className="text-xs text-slate-500">Update your study note</p>

        <div className="space-y-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-slate-200 rounded p-2 text-xs resize-none h-24"
          />
        </div>

        {/* Background color picker */}
        <div className="flex gap-2 items-center mt-2">
          <span className="text-xs text-slate-500">Background:</span>

          {["bg-white", "bg-yellow-100", "bg-green-100", "bg-blue-100", "bg-pink-100", "bg-purple-100"].map(
            (color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border ${
                  bgColor === color ? "border-black border-2" : "border-slate-200"
                } ${color}`}
                onClick={() => setBgColor(color)}
              />
            )
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
