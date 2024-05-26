import React from "react"; // Make sure to import React
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

export function AlertError({ errors }) {
  const alerts = [];
  for (const [key, values] of Object.entries(errors)) {
    console.log(key, values);
    alerts.push(
      <Alert variant="destructive" key={key}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>At index {key}</AlertTitle>
        {values.map((value, index) => (
          <AlertDescription key={index}>{value}</AlertDescription>
        ))}
      </Alert>
    );
  }

  // Return a fragment containing all alerts
  return <>{alerts}</>;
}
