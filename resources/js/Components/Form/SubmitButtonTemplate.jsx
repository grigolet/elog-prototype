import React from "react";
import { getSubmitButtonOptions } from "@rjsf/utils";
import { Button } from "@/Components/ui/button";

function SubmitButton(props) {
  const { uiSchema } = props;
  const { norender, submitText } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return <Button>{submitText}</Button>;
}

export default SubmitButton;
