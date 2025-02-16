"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon, LogInIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  loginFormSchema,
  LoginFormSchema,
} from "@/app/users/sign-in/_schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormSchema) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Имейл адрес</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Въведете имейл адресът си"
                    {...field}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Парола</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Въведете паролата си"
                      {...field}
                    />
                    {!showPassword ? (
                      <EyeIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute bottom-3.5 right-4 text-muted-foreground cursor-pointer"
                      />
                    ) : (
                      <EyeOffIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute bottom-3.5 right-4 text-muted-foreground cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-5">
            <Button type="submit">
              <LogInIcon />
              <span>Вход</span>
            </Button>
            <Link
              href={"/users/sign-up"}
              className="block w-fit hover:underline hover:text-primary"
            >
              Създаване на профил
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
