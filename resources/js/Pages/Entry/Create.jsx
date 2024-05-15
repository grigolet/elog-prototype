import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import { withTheme } from "@rjsf/core";
import templates from "@/Components/Form/Templates";
import CreatedEntryInfo from "@/Components/Form/CreatedEntryInfo";
import widgets from "@/Components/Form/Widgets";
import fields from "@/Components/Form/Fields";
import validator from "@rjsf/validator-ajv8";

const CustomThemedForm = withTheme({ templates, widgets, fields });

const sendRequest = (formData) => {
    const csrfToken = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");
    router.post(
        "/entries",
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

export default function Create({ content, layout, created_entry }) {
    return (
        <GuestLayout>
            <Head title="Create Entry" />
            {created_entry !== undefined ? (
                <CreatedEntryInfo entry={created_entry} />
            ) : null}
            <div>
                <CustomThemedForm
                    schema={content}
                    uiSchema={layout}
                    validator={validator}
                    onSubmit={sendRequest}
                />
            </div>
        </GuestLayout>
    );
}
