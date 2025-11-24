import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Edit2, Trash2 } from "lucide-react";
import CreateNoteModal from "../components/CreateNoteModal";
import EditNoteModal from "../components/EditNoteModal";
import CreateTaskModal from "../components/CreateTaskModal";

export default function NotesTask() {
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  });

  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks") || "[]"));

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const handleSaveNote = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleSaveTask = (newTask) => setTasks((prev) => [...prev, newTask]);
  const handleToggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const handleDeleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="px-6 py-6 border-b border-slate-200 bg-white flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Notes & Tasks</h2>
          <p className="text-xs text-slate-500">Organize your study materials and tasks</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-64">
            <div className="relative">
              <Input placeholder="Search notes or tasks..." className="pl-9 text-xs" />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Notes */}
        <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">Study Notes</h3>
                <div className="flex gap-2">
                <Button
                  size="sm"
                  className="text-xs h-7 px-3"
                  onClick={() => setShowCreateNoteModal(true)}
                >
                  + Add Note
                </Button>
                <Button
                    size="sm"
                    className="text-xs h-7 px-3 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    AI Summarize
                </Button>
                </div>
            </div>

            <div className="max-h-[700px] overflow-y-auto space-y-3 pr-2">
                {notes.length > 0 ? (
                notes.map((note) => (
                    <div
                    key={note.id}
                    className={`p-4 rounded-xl shadow border border-slate-200 ${note.bgColor}`}
                    >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                        <h4 className="text-lg font-semibold">{note.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{note.content}</p>
                        <p className="text-[10px] text-slate-400 mt-2">
                            Created: {new Date(note.id).toLocaleDateString()}{" "}
                            {new Date(note.id).toLocaleTimeString()}
                        </p>
                        </div>
                        <div className="flex gap-2 ml-3">
                            <button
                                className="p-1 hover:bg-slate-200 rounded"
                                onClick={() => setEditingNote(note)}
                            >
                                <Edit2 className="h-4 w-4 text-slate-600" />
                            </button>
                            <button
                                className="p-1 hover:bg-red-100 rounded"
                                onClick={() => handleDeleteNote(note.id)}
                            >
                                <Trash2 className="h-4 w-4 text-red-600" />
                            </button>
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <p className="text-xs text-slate-500">No notes yet. Click "+ Add Note" to start.</p>
                )}
            </div>
        </div>

         {/* Tasks Column */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold">Tasks</h3>
              <Button
                size="sm"
                className="text-xs h-7 px-3"
                onClick={() => setShowCreateTaskModal(true)}
              >
                + Add Task
              </Button>
            </div>

            <div className="max-h-[700px] overflow-y-auto space-y-3">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-white rounded-xl shadow border border-slate-200 flex justify-between items-start"
                  >
                    <div className="flex-1 space-y-1">
                      {/* Title */}
                      <span
                        className={`text-xs font-semibold capitalize ${
                          task.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.title}
                      </span>

                      {/* Description */}
                      {task.description && (
                        <p className="text-xs text-slate-500 mt-1">{task.description}</p>
                      )}

                      {/* Priority + Due Date */}
                      <div className="flex items-center justify-start gap-3 mt-2">
                        {task.priority && (
                          <span
                            className={`text-[10px] px-3 py-1 rounded-full font-medium ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        )}
                        {task.dueDate && (
                          <span className="text-[10px] text-slate-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Checkbox + Delete */}
                    <div className="flex gap-1 mt-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                      />
                      <button
                        className="p-1 hover:bg-red-100 rounded"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No tasks yet. Click "+ Add Task" to start.</p>
              )}
            </div>
          </div>
      </div>

      
      {/* Modals */}
      {showCreateNoteModal && (
        <CreateNoteModal onClose={() => setShowCreateNoteModal(false)} onSave={handleSaveNote} />
      )}
      {editingNote && <EditNoteModal note={editingNote} onClose={() => setEditingNote(null)} onSave={handleUpdateNote} />}
      {showCreateTaskModal && <CreateTaskModal onClose={() => setShowCreateTaskModal(false)} onSave={handleSaveTask} />}
    </div>
  );
}
