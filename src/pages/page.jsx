import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { BookOpen, Search, Bell, Home, Book, FileText, User, Trophy, BarChart2, Clock, } from "lucide-react";

import Quizzes from "./Quizzes";
import CreateQuiz from "./CreateQuiz";
import NotesTask from "./NotesTask";
import Leaderboard from "./Leaderboard";
import { motion } from "framer-motion";


export default function DashboardPage({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("")
      .slice(0, 2); // max 2 letters
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
        {/* Logo */}
       <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-800">
              TOPCIT
            </p>
            <p className="text-[10px] text-slate-500">Learning Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          <SidebarItem icon={Home} active={page === "dashboard"} onClick={() => setPage("dashboard")}>
            Dashboard
          </SidebarItem>
          <SidebarItem icon={Book} active={page === "quizzes"} onClick={() => setPage("quizzes")}>
            Quizzes
          </SidebarItem>
          <SidebarItem icon={FileText} active={page === "notesTasks"} onClick={() => setPage("notesTasks")}>
            Notes & Tasks
          </SidebarItem>


          <SidebarItem icon={Trophy} active={page === "leaderboard"} onClick={() => setPage("leaderboard")}>
  Leaderboard
</SidebarItem>

          <SidebarItem icon={User}>Profile</SidebarItem>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} TOPCIT
          </p>
        </div>
      </aside>


      {/* Main content */}
      <main className="flex-1 flex flex-col">
       {/* Top bar */}
        <header className="sticky top-0 z-50 h-16 flex items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="w-80">
              <div className="relative">
                <Input
                  placeholder="Search quizzes, tracks, topics..."
                  className="pl-9 text-xs"
                />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative rounded-full p-1.5 hover:bg-slate-100">
                <Bell className="h-4 w-4 text-slate-500" />
              </button>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs font-medium">
                    {currentUser?.username || "Guest"}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
                  {getInitials(currentUser?.username)}
                </div>
              </div>

              {/* Logout */}
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          </header>

        {/* DYNAMIC PAGE AREA */}
        <div className="flex-1 overflow-y-auto">

         {/* DASHBOARD PAGE */}
            {page === "dashboard" && (
              <div className="p-6 space-y-6">
                {/* Welcome */}
                <section className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <p className="text-sm text-slate-500">
                      Welcome back,{" "}
                      <span className="font-semibold text-slate-800">
                        {currentUser?.username || "Guest"}
                      </span>
                    </p>
                    <h1 className="text-2xl font-semibold mt-1">
                      Let’s continue your learning journey
                    </h1>
                  </motion.div>

                  {/* Stats */}
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        label: "Completed Quizzes",
                        value: "12",
                        subtext: "Quizzes",
                        icon: Book,
                        accent: "bg-blue-50 text-blue-600",
                      },
                      {
                        label: "Average Score",
                        value: "85%",
                        subtext: "Last 30 days",
                        icon: BarChart2,
                        accent: "bg-emerald-50 text-emerald-600",
                      },
                      {
                        label: "Rank",
                        value: "5th",
                        subtext: "In your cohort",
                        icon: Trophy,
                        accent: "bg-amber-50 text-amber-600",
                      },
                      {
                        label: "Study Time",
                        value: "8.2 hrs",
                        subtext: "This week",
                        icon: Clock,
                        accent: "bg-violet-50 text-violet-600",
                      },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.4, ease: "easeOut" }}
                      >
                        <StatCard {...stat} />
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Progress + Lists */}
                <section className="grid gap-6 lg:grid-cols-3">
                  <div className="space-y-6 lg:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Current Progress</CardTitle>
                          <CardDescription className="text-xs">
                            Module 2: Data Structures
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: "63%" }}
                            />
                          </div>
                          <p className="text-[11px] text-slate-500">
                            63% completed • 8/12 lessons finished
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Card>
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                          <div>
                            <CardTitle className="text-sm">Available Quizzes</CardTitle>
                            <CardDescription className="text-xs">
                              Continue where you left off
                            </CardDescription>
                          </div>
                          <Button variant="ghost" className="h-7 px-2 text-[11px]">
                            View All
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-3 text-xs">
                          {[
                            {
                              color: "border-blue-500",
                              title: "ICT Foundation",
                              info: "12 lessons • 30 mins per quiz",
                              difficulty: "Easy",
                            },
                            {
                              color: "border-emerald-500",
                              title: "Programming Logic",
                              info: "10 lessons • 25 mins per quiz",
                              difficulty: "Medium",
                            },
                            {
                              color: "border-violet-500",
                              title: "Database Systems",
                              info: "8 lessons • 35 mins per quiz",
                              difficulty: "Hard",
                            },
                          ].map((quiz, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.35 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                            >
                              <QuizRow {...quiz} />
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Right */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Recent Activity</CardTitle>
                          <CardDescription className="text-xs">
                            Your latest learning actions
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-[11px]">
                          {[
                            { text: "Completed ICT Basics", ago: "2 hrs ago" },
                            { text: "New badge earned: Rank improved", ago: "1 day ago" },
                            { text: "Completed 3 practice quizzes", ago: "3 days ago" },
                          ].map((act, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.45 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                            >
                              <ActivityItem {...act} />
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Card>
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                          <div>
                            <CardTitle className="text-sm">Top Performers</CardTitle>
                            <CardDescription className="text-xs">
                              Based on average score
                            </CardDescription>
                          </div>
                          <Button variant="ghost" className="h-7 px-2 text-[11px]">
                            View All
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-2 text-[11px]">
                          {[
                            { rank: 1, name: "Gonzalez, Miles", score: "96%" },
                            { rank: 2, name: "Ortiz, Kevin", score: "93%" },
                            { rank: 3, name: "Velasquez, Kara", score: "91%" },
                            { rank: 4, name: "Yanez, Auron", score: "89%" },
                          ].map((tp, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.55 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                            >
                              <TopPerformer {...tp} />
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </section>
              </div>
            )}

          {/* QUIZZES PAGE */}
         
{page === "quizzes" && <Quizzes onCreate={() => setPage("createQuiz")} />}

{page === "createQuiz" && <CreateQuiz />}
{page === "notesTasks" && <NotesTask />}
{page === "leaderboard" && <Leaderboard />}
        </div>
      </main>
    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */

function SidebarItem({ children, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center rounded-lg px-3 py-2 text-left transition text-sm
        ${active 
          ? "bg-slate-900 text-white dark:bg-slate-700" 
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        }`}
    >
      {Icon && <Icon className="w-5 h-5 mr-3" />}
      {children}
    </button>
  );
}

function StatCard({ label, value, subtext, icon: Icon, accent }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="pt-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-slate-500">{label}</p>
          <p className="text-lg font-semibold mt-1">{value}</p>
          <p className="text-[10px] text-slate-400 mt-1">{subtext}</p>
        </div>
        <div
          className={`h-9 w-9 rounded-xl flex items-center justify-center ${
            accent || "bg-blue-50 text-blue-600"
          }`}
        >
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </CardContent>
    </Card>
  );
}

function QuizRow({ color, title, info, difficulty }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="flex items-center gap-2">
        <div className={`h-8 w-1.5 rounded-full ${color}`} />
        <div>
          <p className="text-xs font-medium text-slate-800">{title}</p>
          <p className="text-[10px] text-slate-500">{info}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="rounded-full bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500">
          Difficulty: {difficulty}
        </span>
        <Button size="sm" className="h-6 px-2 text-[10px]">
          Start Quiz
        </Button>
      </div>
    </div>
  );
}

function ActivityItem({ text, ago }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[11px] text-slate-600">{text}</p>
      <span className="text-[10px] text-slate-400">{ago}</span>
    </div>
  );
}

function TopPerformer({ rank, name, score }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
          {rank}
        </span>
        <span className="text-[11px] text-slate-700">{name}</span>
      </div>
      <span className="text-[11px] font-medium text-slate-800">{score}</span>
    </div>
  );
}
