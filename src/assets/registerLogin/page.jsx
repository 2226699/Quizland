import { useState } from "react";

export default function RegisterLoginPage() {
  const [mode, setMode] = useState("register");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Blue frame */}
      <div className="w-[95vw] h-[90vh] max-w-6xl border-4 border-blue-600 rounded-3xl flex items-center justify-center bg-white">
        {/* Tile background */}
        <div
          className="w-full h-full max-w-5xl max-h-[80vh] mx-auto rounded-3xl 
                     bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)] 
                     bg-[length:32px_32px] flex items-center justify-center"
        >
          {/* Center card */}
          <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl px-10 py-10">
            {/* logo / icon */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <span className="text-2xl">📘</span>
            </div>

            {/* heading */}
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-slate-900">
                Welcome to TOPCIT
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Create an account to get started
              </p>
            </div>

            {/* toggle buttons */}
            <div className="mb-8 flex rounded-full bg-slate-100 p-1">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-2 text-xs font-medium transition 
                ${
                  mode === "login"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("register")}
                className={`flex-1 rounded-full px-4 py-2 text-xs font-medium transition 
                ${
                  mode === "register"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Register
              </button>
            </div>

            {/* form */}
            <form className="space-y-4 text-sm">
              {mode === "register" && (
                <div>
                  <label className="block text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 outline-none text-sm
                               focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 pr-9 outline-none text-sm
                               focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
                    @
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 outline-none text-sm
                             focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {mode === "register" && (
                <div>
                  <label className="block text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 outline-none text-sm
                               focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white 
                           shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2"
              >
                {mode === "login" ? "Login" : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
