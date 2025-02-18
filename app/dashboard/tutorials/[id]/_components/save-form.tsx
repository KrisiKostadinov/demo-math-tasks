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
} from "@/app/dashboard/tutorials/[id]/_schemas";
import { updateSchoolTutorial } from "@/app/dashboard/tutorials/[id]/_actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SchoolClass, SchoolTutorial } from "@prisma/client";

type CreateFormProps = {
  tutorial: SchoolTutorial | null;
  schoolClasses: SchoolClass[];
};

export default function CreateForm({
  tutorial,
  schoolClasses,
}: CreateFormProps) {
  const router = useRouter();
  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: tutorial?.name || "",
      status: tutorial?.status || "DRAFT",
      schoolClassId: tutorial?.schoolClassId || "",
    },
  });

  async function onSubmit(values: CreateFormSchema) {
    const message = tutorial
      ? "Успешно довавяне на нов урок."
      : "Урокът беше променен.";

    try {
      await updateSchoolTutorial(values, tutorial?.id || null);
      toast.success(message);
      router.push(`/dashboard/tutorials?class=${values.schoolClassId}`);
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
                  placeholder="Име на урока"
                  {...field}
                  disabled={form.formState.isSubmitting}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-lg">
                Въведете текстът, който искате да се визуализира на в името на
                урока.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Статус на урока</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Избор на статус" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACTIVE">Активен</SelectItem>
                  <SelectItem value="DRAFT">Неактивен</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-lg">
                Тази опция указва дали урокът да се визуализира в
                потребителският интерфейс.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schoolClassId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Клас на урока</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Избор на клас" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {schoolClasses.map((x, index) => (
                    <SelectItem value={x.id} key={index}>
                      {x.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-lg">
                Тази опция указва в кой клас да се намира урока.
              </FormDescription>
              <FormMessage />
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
                : tutorial ? "Промяна на урока" : "Добавяне на урока"}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}