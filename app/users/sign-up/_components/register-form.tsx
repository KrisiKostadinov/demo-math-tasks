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
import { generatePassword } from "@/lib/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormSchema) => {
    try {
      await registerAction(values);
      await signIn("credentials", values);
      router.push("/subscriptions");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error("Нещо се обърка");
    }
  };

  const onGeneratePassword = () => {
    const newPassword = generatePassword(10);
    form.setValue("password", newPassword);
    form.setValue("cpassword", newPassword);

    setShowPassword(true);

    setTimeout(() => {
      setShowPassword(false);
    }, 3000);
  };

  return (
    <div className="max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Имейл адрес (задължително)
                </FormLabel>
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
                <FormLabel className="text-lg">Парола (задължително)</FormLabel>
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
                        className="absolute top-3.5 right-4 text-muted-foreground cursor-pointer"
                      />
                    ) : (
                      <EyeOffIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-3.5 right-4 text-muted-foreground cursor-pointer"
                      />
                    )}
                    <Button
                      onClick={onGeneratePassword}
                      variant={"link"}
                      type="button"
                    >
                      Генериране на парола
                    </Button>
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
                <FormLabel className="text-lg">
                  Потвърдете паролата (задължително)
                </FormLabel>
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Име и фамилия (по избор)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Можете да въведете малко име и фамилия си."
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-lg">
            При завършено създаване на профил, Вие се съгласявате с нашите{" "}
            <Button variant={"link"} className="p-0">
              <Link href={"/terms"} target="_blank">
                Общи условия
              </Link>
            </Button>{" "}
            и{" "}
            <Button variant={"link"} className="p-0">
              <Link href={"/privacy-policy"} target="_blank">
                Политика на поверителност
              </Link>
            </Button>
            .
          </div>
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