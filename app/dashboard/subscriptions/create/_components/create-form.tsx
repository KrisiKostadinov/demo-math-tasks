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
} from "@/app/dashboard/subscriptions/create/_schema";
import { createSubscriptionAction } from "@/app/dashboard/subscriptions/create/_actions";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateForm() {
  const router = useRouter();
  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      originalPrice: 0,
      description: "",
      status: "DRAFT",
    },
  });

  async function onSubmit(values: CreateFormSchema) {
    try {
      await createSubscriptionAction(values);
      toast.success("Успешно довавяне на нов абонамент.");
      router.push("/dashboard/subscriptions");
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
                  placeholder="Име на абонамента"
                  {...field}
                  disabled={form.formState.isSubmitting}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-lg">
                Въведете текстът, който искате да се визуализира на в името на
                абонамента.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Цена на абонамента</FormLabel>
              <Input
                type="number"
                {...field}
                disabled={form.formState.isSubmitting}
              />
              <FormDescription className="text-lg">
                Цената на абонамента трябва да съдържа само цяло или реално
                число.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Описание (по-избор)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Описание на абонамента"
                  {...field}
                  disabled={form.formState.isSubmitting}
                  rows={6}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-lg">
                Въведете текстът, който искате да се визуализира в долната част
                на абонамента.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Статус на абонамента</FormLabel>
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
                Тази опция указва дали абонаментът да се визуализира в
                потребителският интерфейс.
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
                : "Добавяне на абонамента"}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
