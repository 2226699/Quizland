import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

export default function NotesTask() {
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
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Study Notes</h3>
                <div className="flex gap-2">
                <Button size="sm" className="text-xs h-7 px-3 bg-indigo-600 hover:bg-indigo-700 text-white">
                    AI Summarize
                </Button>
                <Button size="sm" className="text-xs h-7 px-3">+ Add Note</Button>
                </div>
            </div>
            
            <div className="space-y-3">
                <div className="p-4 bg-white rounded-xl shadow border border-slate-200">
                <h4 className="font-medium text-sm">Sample Note 1</h4>
                <p className="text-xs text-slate-500">This is a placeholder for your note content.</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow border border-slate-200">
                <h4 className="font-medium text-sm">Sample Note 2</h4>
                <p className="text-xs text-slate-500">This is a placeholder for your note content.</p>
                </div>
            </div>
        </div>

        {/* Right: Tasks */}
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Tasks</h3>
                <div className="flex items-center gap-2">
                {/* Finished Task Pill */}
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                    1/4 Done
                </span>
                <Button size="sm" className="text-xs h-7 px-3">+ Add Task</Button>
                </div>
            </div>
            
            <div className="space-y-3">
                <div className="p-4 bg-white rounded-xl shadow border border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-500">Sample Task 1</span>
                <input type="checkbox" />
                </div>
                <div className="p-4 bg-white rounded-xl shadow border border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-500">Sample Task 2</span>
                <input type="checkbox" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
