"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { SchoolClass, SchoolTask, SchoolTutorial } from "@prisma/client";
import {
  FormSchema,
  formSchema,
} from "@/app/dashboard/tasks/[id]/_schemas/save-task-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import CustomButton from "@/components/custom-button";
import { createOrUpdateTask } from "@/app/dashboard/tasks/_actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  task: SchoolTask | null;
  schoolClasses: SchoolClass[];
  schoolTutorials: SchoolTutorial[];
};

export default function SaveTaskInfo({
  task,
  schoolClasses,
  schoolTutorials = [],
}: Props) {
  const router = useRouter();
  const [tutorials, setTutorials] = useState<SchoolTutorial[]>(schoolTutorials);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task?.name || "",
      schoolClassId: task?.schoolClassId || "",
      schoolTutorialId: task?.schoolTutorialId || "",
    },
  });

  const onSubmit = form.handleSubmit(async (values: FormSchema) => {
    try {
      const result = await createOrUpdateTask(task?.id, values);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);
      router.push("/dashboard/tasks");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Грешка");
    }
  });

  const onTutorialChange = async (schoolClassId: string) => {
    try {
      const response = await axios.get(
        `/api/tutorials?classId=${schoolClassId}`
      );
      setTutorials(response.data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Грешка");
    }
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>Основна информация за задачата</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid lg:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="schoolClassId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Изберете клас</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        onTutorialChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder="Избиране на клас" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schoolClasses?.map((schoolClass) => (
                          <SelectItem
                            value={schoolClass.id}
                            key={schoolClass.id}
                          >
                            {schoolClass.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {tutorials.length > 0 && (
                <FormField
                  control={form.control}
                  name="schoolTutorialId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Изберете урок</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-lg">
                            <SelectValue placeholder="Избиране на урок" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tutorials?.map((tutorial) => (
                            <SelectItem value={tutorial.id} key={tutorial.id}>
                              {tutorial.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Име на задачата</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Въведете име на задачата"
                      {...field}
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
                {task ? "Запази промените" : "Създай задача"}
              </CustomButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}