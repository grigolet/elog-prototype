import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

import { withTheme } from "@rjsf/core";
import templates from "@/Components/Form/Templates";
import NotificationInfo from "@/Components/Form/NotificationInfo";
import widgets from "@/Components/Form/Widgets";
import validator from "@rjsf/validator-ajv8";

const CustomThemedForm = withTheme({ templates, widgets });

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

export default function Edit({ entry, schema, updated_entry, disabled }) {
    {
        updated_entry !== undefined ? (
            <NotificationInfo message="Entry updated." />
        ) : null;
    }

    return (
        <GuestLayout>
            <Head title="Edit Entry" />
            <div>
                <CustomThemedForm
                    schema={schema.content}
                    uiSchema={schema.layout}
                    validator={validator}
                    onSubmit={(formData) => sendRequest(formData, entry.id)}
                    formData={entry.content}
                />
            </div>
        </GuestLayout>
    );
}
