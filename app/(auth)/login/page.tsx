"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted:", { email, password })
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white rounded-xl p-8 shadow-sm border-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Title */}
          <h1 className="text-[32px] font-bold leading-[1.2] text-grey-900">
            Login
          </h1>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="email"
                className="text-xs font-bold text-grey-500 leading-[1.5]"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[44px] px-5 py-3 border-beige-500 rounded-lg bg-white text-sm"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="password"
                className="text-xs font-bold text-grey-500 leading-[1.5]"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[44px] px-5 py-3 pr-12 border-beige-500 rounded-lg bg-white text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-grey-500 hover:text-grey-900 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-[53px] bg-grey-900 hover:bg-grey-900/90 text-white text-sm font-bold rounded-lg"
          >
            Login
          </Button>

          {/* Sign Up Link */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-grey-500 leading-[1.5]">
                Need to create an account?
              </p>
              <Link
                href="/signup"
                className="text-sm font-bold text-grey-900 underline decoration-solid underline-offset-2 hover:text-grey-900/80 leading-[1.5]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
