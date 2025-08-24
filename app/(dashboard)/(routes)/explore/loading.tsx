import Spinner from "@/components/ui/spinner";

const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center justify-center text-center">
        <Spinner className="h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
