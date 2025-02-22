"use client";

import { useForm } from "react-hook-form";
import { SchoolTask } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  saveTaskVariantSchema,
  SaveTaskVariantSchema,
} from "@/app/dashboard/tasks/[id]/_schemas/save-task-variant";
import { createOrUpdateTaskVariant } from "@/app/dashboard/tasks/_actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/custom-button";
import { Separator } from "@/components/ui/separator";

type Props = {
  taskId: string;
};

export default function SaveTaskVariant({ taskId }: Props) {
  const form = useForm<SaveTaskVariantSchema>({
    resolver: zodResolver(saveTaskVariantSchema),
    defaultValues: {
      question: "",
      explanation: "",
      solution: "",
      status: "ACTIVE",
    },
  });

  const onSubmit = form.handleSubmit(async (values: SaveTaskVariantSchema) => {
    try {
      const result = await createOrUpdateTaskVariant(taskId, values);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Грешка");
    }
  });

  return (
    <Form {...form}>
      <Card className="p-5 rounded-lg shadow-xl">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="text-2xl">Информация</div>
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Въпрос</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Въведете текстът на въпроса"
                    {...field}
                    className="text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Обяснения</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Въведете обясненията на въпроса"
                    {...field}
                    value={field.value ?? ""}
                    className="text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Решение</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Въведете решението на въпроса"
                    {...field}
                    value={field.value ?? ""}
                    className="text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-start">
            <CustomButton
              type="submit"
              isDisabled={form.formState.isSubmitting}
              isLoading={form.formState.isSubmitting}
            >
              Запази промените
            </CustomButton>
          </div>
        </form>
      </Card>
    </Form>
  );
}
