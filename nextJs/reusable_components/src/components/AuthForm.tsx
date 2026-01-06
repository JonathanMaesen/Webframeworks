"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "@/actions/authActions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useState } from "react";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  
  const action = isLogin ? loginAction : registerAction;
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>
      
      <form action={formAction} className="flex flex-col gap-4">
        {state.message && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
            {state.message}
          </div>
        )}

        {!isLogin && (
          <Input 
            name="name" 
            label="Name" 
            placeholder="John Doe" 
            errors={state.errors?.name}
          />
        )}
        
        <Input 
          name="email" 
          type="email" 
          label="Email" 
          placeholder="you@example.com" 
          errors={state.errors?.email}
        />
        
        <Input 
          name="password" 
          type="password" 
          label="Password" 
          placeholder="••••••••" 
          errors={state.errors?.password}
        />

        <Button type="submit" isLoading={isPending} fullWidth className="mt-2">
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-green-600 hover:underline dark:text-green-400"
        >
          {isLogin ? "Need an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </Card>
  );
}
