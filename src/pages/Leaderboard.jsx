// src/pages/Leaderboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Search,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Users,
} from "lucide-react";

/*
  Leaderboard page:
  - Hardcoded sample users
  - Adds Carlos Optimal (CO) using quizzes from localStorage if present
  - Sorts by points and displays top 3 cards + ranking table
*/

// Hardcoded classmates (sample)
const SAMPLE_USERS = [
  { id: "u1", name: "Aaron Yusay", initials: "AY", score: 2540, tests: 38, avg: 89, trend: +2 },
  { id: "u2", name: "Aldwyn Reano", initials: "AR", score: 2490, tests: 37, avg: 88, trend: +2 },
  { id: "u3", name: "Miles Edades", initials: "ME", score: 2430, tests: 36, avg: 87, trend: +1 },
  { id: "u4", name: "Daffy Santiago", initials: "DS", score: 2380, tests: 35, avg: 86, trend: -1 },
  { id: "u5", name: "Greg Dela Cruz", initials: "GD", score: 2360, tests: 34, avg: 85, trend: 0 },
  // add more if you like...
];

function computeCarlosFromLocalStorage() {
  // Gather quizzes from localStorage and compute simple stats for Carlos Optimal
  try {
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      // return default placeholder if no local quizzes
      return {
        id: "me",
        name: "Carlos Optimal",
        initials: "CO",
        score: 2850,
        tests: 45,
        avg: 95,
        trend: +3,
      };
    }

    // compute points and averages:
    let totalCorrect = 0;
    let totalQuestions = 0;
    let totalAttempts = quizzes.length;
    quizzes.forEach((qz) => {
      if (!Array.isArray(qz.questions)) return;
      qz.questions.forEach((q) => {
        // assume `q.correct` holds index of correct answer and `q.attempts` not present
        // if the quiz stored user attempts/score, adapt accordingly. For now compute max possible.
        // we'll use stored `q.correct` (truth) -> we can't know user answers, so treat as perfect if you
        // want. Instead we look for a `results` property saved elsewhere. For now compute "max points"
        totalQuestions += 1;
      });
    });

    // Simple heuristic: points = tests * 60 (dummy) and average = 85 (fallback)
    const tests = totalAttempts * 1; // number of quizzes created (not ideal but ok)
    const avg = Math.min(98, Math.round(80 + totalAttempts)); // nicer-looking mock
    const score = 2500 + tests * 40 + Math.round(avg * 2); // craft a value so Carlos looks reasonable

    return {
      id: "me",
      name: "Carlos Optimal",
      initials: "CO",
      score,
      tests,
      avg,
      trend: +4,
    };
  } catch (e) {
    return {
      id: "me",
      name: "Carlos Optimal",
      initials: "CO",
      score: 2850,
      tests: 45,
      avg: 95,
      trend: +3,
    };
  }
}

export default function Leaderboard() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("global"); // global / friends (friends not implemented; same view)
  const carlos = useMemo(() => computeCarlosFromLocalStorage(), []);

  // Compose the full list (Carlos + samples)
  const fullList = useMemo(() => {
    // ensure Carlos is present (could replace one sample if same name)
    const merged = [carlos, ...SAMPLE_USERS];
    // sort by score desc
    return merged.sort((a, b) => b.score - a.score);
  }, [carlos]);

  // filter by search
  const filtered = useMemo(() => {
    if (!query) return fullList;
    return fullList.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, fullList]);

  // top3
  const top3 = filtered.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Quizzes</h2>
          <p className="text-xs text-slate-500">Track, practice, and share your quizzes effortlessly</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-64 relative">
            <Input
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          <Button variant="outline" size="sm" className="text-xs flex items-center gap-2">
            <Users className="w-4 h-4" /> Challenge
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 items-center">
        <div className="flex bg-slate-100 rounded-full p-1">
          <button
            onClick={() => setTab("global")}
            className={`px-3 py-1 rounded-full text-xs ${tab === "global" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
          >
            Global
          </button>
          <button
            onClick={() => setTab("friends")}
            className={`px-3 py-1 rounded-full text-xs ${tab === "friends" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
          >
            Friends
          </button>
        </div>
      </div>

      {/* Top performers visual */}
      <div className="bg-yellow-50 p-8 rounded-xl shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {top3.map((u, index) => {
            // style center bigger
            const isCenter = index === 1; // because sorted descending and we slice 0..2, center will be 2nd item
            return (
              <div key={u.id} className={`p-6 rounded-xl border ${isCenter ? "border-yellow-400 bg-white shadow-lg" : "border-slate-200 bg-white"} text-center`}>
                <div className={`mx-auto h-14 w-14 rounded-full flex items-center justify-center text-lg font-semibold ${isCenter ? "bg-yellow-200 text-yellow-800" : "bg-slate-100 text-slate-700"}`}>
                  {u.initials}
                </div>
                <div className="mt-3 text-xs text-slate-500">{u.name}</div>
                <div className="text-sm font-semibold mt-2">{u.score} points</div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400">Test</div>
                    <div className="font-medium">{u.tests}</div>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400">Avg</div>
                    <div className="font-medium">{u.avg}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table / Rankings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">All Rankings</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-slate-500 bg-slate-50">
                <tr>
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Score</th>
                  <th className="p-3 text-left">Tests Completed</th>
                  <th className="p-3 text-left">Average</th>
                  <th className="p-3 text-left">Trend</th>
                  <th className="p-3 text-left">Challenge</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((u, idx) => {
                  const rank = idx + 1;
                  const isYou = u.id === carlos.id;
                  return (
                    <tr key={u.id} className={`${isYou ? "bg-slate-50" : ""}`}>
                      <td className="p-3 text-xs text-slate-600">{rank}</td>
                      <td className="p-3 flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold ${isYou ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-700"}`}>
                          {u.initials}
                        </div>
                        <div>
                          <div className="text-[13px] font-medium">{u.name}</div>
                          {isYou && <div className="text-[10px] text-slate-400">You</div>}
                        </div>
                      </td>
                      <td className="p-3 text-slate-700">{u.score}</td>
                      <td className="p-3 text-slate-600">{u.tests}</td>
                      <td className="p-3 text-slate-600">{u.avg}%</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 text-xs">
                          {u.trend >= 0 ? (
                            <div className="text-emerald-600 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> {u.trend}</div>
                          ) : (
                            <div className="text-red-600 flex items-center gap-1"><ArrowDownRight className="w-3 h-3" /> {u.trend}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Button size="sm" variant="outline" className="text-xs h-7 px-2">Challenge</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
