import { CheckCircle2Icon } from "lucide-react";

const FormSuccess = ({ message }: { message: string | null }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-green-500/10 p-3 text-sm text-green-700">
      <CheckCircle2Icon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
