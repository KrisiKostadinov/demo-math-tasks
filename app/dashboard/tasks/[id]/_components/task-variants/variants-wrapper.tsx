import { SchoolTask } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VariantsListing from "@/app/dashboard/tasks/[id]/_components/task-variants/variants-listing";

type Props = {
  task: SchoolTask;
};

export default function VariantsWrapper({ task }: Props) {
  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Варианти на задачата</CardTitle>
      </CardHeader>
      {/* <CardContent>
        <VariantsListing task={task} />
      </CardContent> */}
    </Card>
  );
}