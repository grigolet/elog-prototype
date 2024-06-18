import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

import { withTheme } from "@rjsf/core";
import templates from "@/Components/Form/Templates";
import NotificationInfo from "@/Components/Form/NotificationInfo";
import widgets from "@/Components/Form/Widgets";
import fields from "@/Components/Form/Fields";
import validator from "@rjsf/validator-ajv8";
// import { mockContent, mockLayout } from "./schema";

const CustomThemedForm = withTheme({ templates, widgets, fields });

export default function Show({ entry_id, entry_content, schema, message }) {
  const notification =
    message !== undefined ? <NotificationInfo content={message} /> : null;

  return (
    <GuestLayout>
      <Head title="Show Entry" />
      {notification}
      <div>
        <CustomThemedForm
          schema={schema.complete_content}
          uiSchema={{
            ...schema.complete_layout,
            "ui:submitButtonOptions": { norender: true },
          }}
          validator={validator}
          formData={entry_content}
          readonly
          disabled
        />
      </div>
      <Button asChild>
        <Link href={`/entries/${entry_id}/edit`}>Edit</Link>
      </Button>
    </GuestLayout>
  );
}
