import { LoaderIcon } from "lucide-react";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <LoaderIcon className={`h-10 w-10 animate-spin text-muted-foreground`} />
  );
};

export default Spinner;
