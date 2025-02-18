import { FaSpinner } from "react-icons/fa";

export default function LoadingComponent() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <FaSpinner
        className="text-primary animate-spin repeat-infinite z-40"
        size={80}
      />
    </div>
  );
}