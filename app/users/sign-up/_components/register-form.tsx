"use client";

import { z } from "zod";
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
  registerFormSchema,
  RegisterFormSchema,
} from "@/app/users/sign-up/_schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      cpassword: "",
    },
  });

  function onSubmit(values: RegisterFormSchema) {
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
                      placeholder="Въведете парола"
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
          <FormField
            control={form.control}
            name="cpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Потвърдете паролата</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Въведете парола отново"
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
              <span>Създаване</span>
            </Button>
            <Link
              href={"/login"}
              className="block w-fit hover:underline hover:text-primary"
            >
              Вход в профила
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}