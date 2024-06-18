import React from "react"; // Make sure to import React
import { AlertCircle, CircleChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

export function AlertError({ errors }) {
  const alerts = [];
  console.log(errors);
  for (const [key, values] of Object.entries(errors)) {
    alerts.push(
      <Alert variant="destructive" key={key}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Form validation error</AlertTitle>
        {Array.isArray(values) ? (
          values.map((value, index) => (
            <AlertDescription key={index} className="flex my-2">
              <CircleChevronRight className="h-4 w-4 m-1" />
              {value}
            </AlertDescription>
          ))
        ) : (
          <AlertDescription key={values} className="flex my-2">
            <CircleChevronRight className="h-4 w-4 m-1" />
            {values}
          </AlertDescription>
        )}
      </Alert>
    );
  }

  // Return a fragment containing all alerts
  return <>{alerts}</>;
}
