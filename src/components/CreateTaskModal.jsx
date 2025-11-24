import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function CreateTaskModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium"); // default priority
  const [dueDate, setDueDate] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate: dueDate || null,
      completed: false,
    };
    onSave(newTask);
    onClose();
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
      <h2 className="text-lg font-semibold">Create New Task</h2>
      <p className="text-xs text-slate-500">Add a new task to manage your study plan</p>

      <div className="space-y-2">
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm"
        />
        <textarea
          placeholder="Optional Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-200 text-sm resize-none h-24"
        />

        {/* Priority and Due Date stacked with labels on top */}
        <div className="flex items-start gap-4 text-xs mt-2">
          <div className="flex flex-col">
            <label className="mb-1">Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-slate-200 rounded px-2 py-1 text-sm"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Due Date (optional):</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border border-slate-200 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSave}>
          Save Task
        </Button>
      </div>
    </div>
  </div>
);

}
