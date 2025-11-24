import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterLoginPage() {
  const [mode, setMode] = useState("register");

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
          {/* Logo / icon */}
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <span className="text-2xl">📘</span>
          </div>

          {/* Header text */}
          <CardTitle className="text-lg">Welcome to TOPCIT</CardTitle>
          <CardDescription className="text-xs">
            Create an account to get started
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
              <AuthForm mode="login" />
            </TabsContent>
            <TabsContent value="register">
              <AuthForm mode="register" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// Form component used for both login and register modes
function AuthForm({ mode }) {
  const isRegister = mode === "register";

  // Local state for show / hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="space-y-4 text-sm">
      {isRegister && (
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Enter your username" />
        </div>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pr-7"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
            @
          </span>
        </div>
      </div>

      {/* Password with show/hide eye icon */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm password with show/hide eye icon (register only) */}
      {isRegister && (
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      <Button type="submit" className="mt-2 w-full">
        {isRegister ? "Register" : "Login"}
      </Button>
    </form>
  );
}
