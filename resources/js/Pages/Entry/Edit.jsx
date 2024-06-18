import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import { withTheme } from "@rjsf/core";
import templates from "@/Components/Form/Templates";
import NotificationInfo from "@/Components/Form/NotificationInfo";
import widgets from "@/Components/Form/Widgets";
import fields from "@/Components/Form/Fields";
import validator from "@rjsf/validator-ajv8";
// import { mockContent, mockLayout } from "./schema";

const CustomThemedForm = withTheme({ templates, widgets, fields });

const sendRequest = (formData, id) => {
  const csrfToken = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");
  router.patch(
    `/entries/${id}`,
    {
      content: formData.formData,
    },
    {
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    }
  );
};

export default function Edit({
  entry_id,
  entry_content,
  schema,
  updated_entry,
}) {
  {
    updated_entry !== undefined ? (
      <NotificationInfo message="Entry updated." />
    ) : null;
  }

  console.log(schema);

  return (
    <GuestLayout>
      <Head title="Edit Entry" />
      <div>
        <CustomThemedForm
          schema={schema.complete_content}
          uiSchema={schema.complete_layout}
          validator={validator}
          onSubmit={(formData) => sendRequest(formData, entry_id)}
          formData={entry_content}
        />
      </div>
    </GuestLayout>
  );
}
