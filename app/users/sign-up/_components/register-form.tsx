"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon, LogInIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
import { registerAction } from "@/app/users/sign-up/_actions";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormSchema) => {
    try {
      await registerAction(values);
      await signIn("credentials", values);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error("Нещо се обърка");
    }
  };

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
                    disabled={form.formState.isSubmitting}
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
                      placeholder="Въведете парола"
                      {...field}
                      disabled={form.formState.isSubmitting}
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
                      disabled={form.formState.isSubmitting}
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <LogInIcon />
              <span>
                {form.formState.isSubmitting ? "Зареждане..." : "Създаване"}
              </span>
            </Button>
            <Link
              href={"/users/sign-in"}
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
