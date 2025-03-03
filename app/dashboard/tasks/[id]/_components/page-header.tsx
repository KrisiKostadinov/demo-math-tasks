import { Separator } from "@/components/ui/separator";

type PageHeaderProps = {
  isCreate: boolean;
}

export default function PageHeader({ isCreate }: PageHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold">
        {isCreate ? "Създаване на нова задача" : "Промяна на задача"}
      </h1>
      
      {isCreate && (
        <div className="text-lg text-muted-foreground html-content">
          <p>
            На тази страница можете да създавате и управлявате задачи в
            платформата.
          </p>
        </div>
      )}

      <Separator />
    </>
  );
}
