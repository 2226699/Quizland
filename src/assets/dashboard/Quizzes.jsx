import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Search } from "lucide-react";

/**
 * Quizzes homepage (topic selection)
 * Props:
 *  - onCreate: function() -> called when Create Quiz button is clicked
 *
 * Image used from uploaded path:
 * /mnt/data/59ee0810-a80b-402a-9e3a-09d659670ef0.png
 */

const heroImg = "/mnt/data/59ee0810-a80b-402a-9e3a-09d659670ef0.png";

const topics = [
  {
    id: "programming",
    title: "Programming Fundamentals",
    subtitle: "20 questions",
    desc: "Variables, data types, control structures and basic algorithms",
    color: "bg-blue-500",
    accent: "border-blue-500",
  },
  {
    id: "database",
    title: "Database Management",
    subtitle: "30 questions",
    desc: "SQL database design, normalization, and queries",
    color: "bg-emerald-500",
    accent: "border-emerald-500",
  },
  {
    id: "networks",
    title: "Computer Networks",
    subtitle: "20 questions",
    desc: "Network protocols, TCP/IP, routing, and network security",
    color: "bg-violet-500",
    accent: "border-violet-500",
  },
  {
    id: "security",
    title: "Information Security",
    subtitle: "40 questions",
    desc: "Cybersecurity, encryption, authentication, and security practices",
    color: "bg-red-500",
    accent: "border-red-500",
  },
  {
    id: "software",
    title: "Software Engineering",
    subtitle: "30 questions",
    desc: "SDLC, design patterns, testing, and project management",
    color: "bg-lime-300",
    accent: "border-lime-400",
  },
  {
    id: "web",
    title: "Web Development",
    subtitle: "30 questions",
    desc: "HTML, CSS, Javascript, REST APIs and web frameworks",
    color: "bg-purple-700",
    accent: "border-purple-700",
  },
];

export default function Quizzes({ onCreate = () => {} }) {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      {/* Header / breadcrumb */}
      <div className="px-6 py-6 border-b border-slate-200 bg-white flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Select a Quiz</p>
          <h2 className="text-lg font-semibold">Select a topic</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-64">
            <div className="relative">
              <Input placeholder="Search topics..." className="pl-9 text-xs" />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-xs" onClick={onCreate}>
            + Create Quiz
          </Button>
        </div>
      </div>

      {/* Page content */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t) => (
            <Card key={t.id} className="rounded-xl overflow-hidden">
              <div className={`p-4 ${t.color} text-white rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
                      {/* simple icon placeholder */}
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-6M12 4v4m0 0H8m4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.title}</p>
                      <p className="text-[11px] mt-1">{t.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 pt-5">
                <p className="text-xs text-slate-500 mb-4">{t.desc}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="text-xs px-3 py-1 rounded-md border border-slate-200 bg-white">Multiple Choice</button>
                    <button className="text-xs px-3 py-1 rounded-md border border-slate-200 bg-white">Flashcard</button>
                  </div>

                  <div className={`h-3 w-3 rounded-full ${t.accent.replace("border-", "bg-")}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* down chevron / more area */}
        <div className="flex items-center justify-center mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* optional hero/banner image (from your upload) */}
      <img src={heroImg} alt="quizzes-hero" className="sr-only" />
    </div>
  );
}
