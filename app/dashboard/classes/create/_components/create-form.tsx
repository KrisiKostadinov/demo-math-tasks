"use client";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";

import {
  CreateFormSchema,
  createFormSchema,
} from "@/app/dashboard/classes/create/_schema";
import { createSchoolClassAction } from "@/app/dashboard/classes/create/_actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateForm() {
  const router = useRouter();
  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CreateFormSchema) {
    try {
      await createSchoolClassAction(values);
      toast.success("Успешно довавяне на нов учебен клас.");
      router.push("/dashboard/classes");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Нещо се обърка.");
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Име</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Име на класа"
                  {...field}
                  disabled={form.formState.isSubmitting}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-lg">
                Въведете текстът, който искате да се визуализира на класа.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="space-y-5">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <FaSpinner className="animate-spin repeat-infinite w-20 h-20" />
            ) : (
              <PlusIcon />
            )}
            <span>
              {form.formState.isSubmitting
                ? "Зареждане..."
                : "Добавяне на класа"}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
