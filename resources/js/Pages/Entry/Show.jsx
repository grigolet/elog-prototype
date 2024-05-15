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

export default function Show({ entry, schema, message }) {
    const notification =
        message !== undefined ? <NotificationInfo content={message} /> : null;

    return (
        <GuestLayout>
            <Head title="Edit Entry" />
            {notification}
            <div>
                <CustomThemedForm
                    schema={schema.content}
                    uiSchema={schema.layout}
                    validator={validator}
                    formData={entry.content}
                    readonly
                />
            </div>
            <a
                className="rounded-lg border border-primary-100 bg-primary-100 px-5 py-2.5 text-center text-sm font-medium text-primary-600 transition-all hover:border-primary-200 hover:bg-primary-200 focus:ring focus:ring-primary-50 disabled:border-primary-50 disabled:bg-primary-50 disabled:text-primary-400"
                href={`/entries/${entry.id}/edit`}
            >
                Edit
            </a>
        </GuestLayout>
    );
}
