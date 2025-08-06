import { AlertCircleIcon } from "lucide-react";

const FormError = ({ message }: { message: string | null }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/10 px-3 py-3 text-sm text-destructive">
      <AlertCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
