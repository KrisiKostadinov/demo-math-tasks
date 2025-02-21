import { FaSpinner } from "react-icons/fa";
import { SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type CustomButtonProps = {
  isDisabled: boolean;
  isLoading: boolean;
} & React.ComponentProps<typeof Button>;

export default function DisplayButton({
  isDisabled,
  isLoading,
  ...props
}: CustomButtonProps) {
  return (
    <Button disabled={isDisabled} {...props}>
      {isLoading ? (
        <FaSpinner className="repeat-infinite animate-spin" />
      ) : (
        <SaveIcon />
      )}
      <span>Запазване</span>
    </Button>
  );
}
