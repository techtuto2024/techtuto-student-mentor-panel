"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/utils/Loading";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      const response = await login(email, password);
      const userRole = response.user.role;
      console.log(response.user.role);

      // Store role in local storage
      localStorage.setItem("userRole", userRole);

      // Redirect based on role
      switch (userRole) {
        case "student":
          router.push("/student");
          break;
        case "mentor":
          router.push("/mentor");
          break;
        case "manager":
          router.push("/manager");
          break;
        default:
          router.push("/");
          break;
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoggingIn(false); // Re-enable button after login attempt
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const storedRole = localStorage.getItem("userRole");
      console.log(storedRole);
      if (storedRole) {
        switch (storedRole) {
          case "student":
            router.push("/student");
            break;
          case "mentor":
            router.push("/mentor");
            break;
          case "manager":
            router.push("/manager");
            break;
          default:
            router.push("/");
            break;
        }
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-center gap-3 p-3">
      <div className="flex flex-col gap-5 items-start justify-center lg:px-32 md:px-20 p-6 lg:w-1/2 w-full bg-gray-100 dark:bg-[#1E1E1E] h-screen rounded-lg dark:text-white">
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/images/techtuto-logo.png"
            alt="TechTuto"
            height={100}
            width={40}
          />
          <p className="text-2xl font-bold dark:text-white">TechTuto</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-4xl font-semibold">Welcome to</p>
          <p className="text-4xl font-semibold">TechTuto</p>
        </div>

        <div className="flex flex-col gap-4 w-full dark:text-black">
          <div>
            <Label htmlFor="email" className="dark:text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-white"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="dark:text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-white"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            onClick={handleSubmit}
            className="w-1/3 rounded-full hover:bg-violet-500 dark:hover:bg-violet-500 dark:hover:text-white"
            disabled={isLoggingIn} // Disable button during logging in
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
      <div className="lg:flex flex-col hidden items-center justify-center w-1/2 pt-6 h-screen bg-[#fde0f9] rounded-lg">
        <p className="font-semibold text-4xl w-3/4">
          Unlock your learning potential
        </p>
        <p className="font-semibold text-base w-3/4 mt-4">
          One-on-one online tutoring for students of all ages
        </p>
        <Image
          src="/images/login-img.png"
          alt="TechTuto Login"
          height={100}
          width={500}
        />
      </div>
    </div>
  );
};

export default LogIn;
