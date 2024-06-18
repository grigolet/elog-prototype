import { AlertCircle, CircleChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

export default function ErrorListTemplate({ errors }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Form validation error</AlertTitle>
      {errors.map((error) => (
        <AlertDescription key={error.stack} className="flex my-2">
          <CircleChevronRight className="h-4 w-4 m-1" />
          {error.stack}
        </AlertDescription>
      ))}
    </Alert>
  );
}
