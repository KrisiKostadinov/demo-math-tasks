"use client";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PlusIcon, SaveIcon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";

import {
  CreateFormSchema,
  createFormSchema,
} from "@/app/dashboard/classes/[id]/_schemas";
import { updateSchoolClass } from "@/app/dashboard/classes/[id]/_actions";
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
import { SchoolClass } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

type UpdateNameFormProps = {
  schoolClass: SchoolClass | null;
};

export default function UpdateNameForm({ schoolClass }: UpdateNameFormProps) {
  const router = useRouter();
  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: schoolClass?.name || "",
      description: schoolClass?.description || "",
    },
  });

  async function onSubmit(values: CreateFormSchema) {
    const message = !schoolClass
      ? "Успешно довавяне на нов учебен клас."
      : "Името на класа беше променено.";

    try {
      await updateSchoolClass(values, schoolClass?.id || null);
      toast.success(message);
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
              <FormLabel className="text-lg">Име (задължително)</FormLabel>
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Описание (по избор)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Описание на класа"
                  {...field}
                  rows={6}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-lg">
                Кратко описание на класа и за какво той се използва.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="space-y-5">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <FaSpinner className="animate-spin repeat-infinite w-20 h-20" />
            ) : !schoolClass ? (
              <PlusIcon />
            ) : (
              <SaveIcon />
            )}
            <span>
              {form.formState.isSubmitting
                ? "Зареждане..."
                : !schoolClass
                ? "Добавяне на класа"
                : "Промяна на класа"}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}