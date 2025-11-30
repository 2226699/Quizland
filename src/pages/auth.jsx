import { useState,useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Spinner } from "../components/ui/spinner";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Eye, EyeOff, BookOpen } from "lucide-react";

export default function RegisterLoginPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // "login" or "register"

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Background tiles */}
      <div
        className="absolute inset-0 -z-10
                   bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)]
                   bg-[length:32px_32px]"
      />

      {/* Single centered card */}
      <Card className="w-full max-w-sm rounded-3xl shadow-2xl border border-slate-400 bg-white">
        <CardHeader className="items-center pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <BookOpen className="h-5 w-5" />
          </div>

          {/* Dynamic title */}
          <CardTitle className="text-lg">
            {mode === "login" ? "Welcome Back" : "Welcome to TOPCIT"}
          </CardTitle>

          {/* Dynamic description */}
          <CardDescription className="text-xs">
            {mode === "login"
              ? "Login to continue"
              : "Create an account to get started"}
          </CardDescription>
        </CardHeader>


        <CardContent className="pt-0">
          {/* Tabs for login and register */}
          <Tabs value={mode} onValueChange={setMode} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-slate-100 p-1 ">
              <TabsTrigger
                value="login"
                className="rounded-full text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-full text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              {/* pass onAuthSuccess to the form */}
              <AuthForm mode="login" onAuthSuccess={onAuthSuccess} />
            </TabsContent>
            <TabsContent value="register">
              <AuthForm mode="register" onAuthSuccess={onAuthSuccess} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function AuthForm({ mode, onAuthSuccess }) {
  const isRegister = mode === "register";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    setError("");
    setPasswordStrength("");
    setLoading(false);
  }, [mode]);

  const evaluateStrength = (value) => {
    if (value.length < 4) return "weak";
    if (value.length < 8) return "medium";
    return "strong";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    if (isRegister) setPasswordStrength(evaluateStrength(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword } = formData;

    if (!email) return setError("Email is required.");
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Password is required.");

    if (isRegister) {
      if (!username) return setError("Username is required.");
      if (!confirmPassword) return setError("Please confirm your password.");
      if (password !== confirmPassword) return setError("Passwords do not match.");

      const result = saveUser({ username, email, password });
      if (!result.success) return setError(result.message);

      setLoading(true);
      setTimeout(() => onAuthSuccess?.(), 1500);
      return;
    }

    const result = loginUser(email, password);
    if (!result.success) return setError(result.message);

    // show spinner before redirect
    setLoading(true);
    setTimeout(() => onAuthSuccess?.(), 1000);
  };

  function saveUser(user) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u) => u.email === user.email);
    if (exists) return { success: false, message: "Email already registered." };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  }

  function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email);
    if (!user) return { success: false, message: "User not found." };
    if (user.password !== password) return { success: false, message: "Incorrect password." };
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true };
  }

  return (
    <div className="relative">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-2 text-blue-700 bg-blue-100 p-4 rounded-lg animate-fadeIn">
          <Spinner className="w-6 h-6 text-blue-600" />
          <span>{isRegister ? "Registration successful! Redirecting..." : "Login successful! Redirecting..."}</span>
        </div>
      ) : (
        <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter your username"
                className={error.toLowerCase().includes("username") ? "border-red-500" : ""}
              />
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className={`pr-7 ${error.toLowerCase().includes("email") ? "border-red-500" : ""}`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
                @
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className={`pr-10 ${error.toLowerCase().includes("password") ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {isRegister && passwordStrength && (
              <div
                className={`text-xs ${
                  passwordStrength === "weak"
                    ? "text-red-600"
                    : passwordStrength === "medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {passwordStrength === "weak" && "Weak password"}
                {passwordStrength === "medium" && "Moderate password"}
                {passwordStrength === "strong" && "Strong password"}
              </div>
            )}
          </div>

          {isRegister && (
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className={`pr-10 ${error.toLowerCase().includes("confirm") ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-xs bg-red-100 border border-red-300 p-2 rounded-lg animate-fadeIn">
              {error}
            </div>
          )}

          <Button type="submit" className="mt-2 w-full">
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>
      )}
    </div>
  );
}
