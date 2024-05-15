import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

function EntryList(props) {
    const entry = props.entry;
    return (
        <tr className="hover:bg-gray-50 sm:text-xs">
            <th className="px-2 py-1 font-medium text-gray-900">
                <a
                    className="text-primary-700 underline"
                    href={`/entries/${entry.id}`}
                >
                    {entry.id}
                </a>
            </th>
            <td className="px-2 py-1">{entry.created_at}</td>
            <td className="px-2 py-1">{entry.updated_at}</td>
            <td className="px-2 py-1">User</td>
            <td className="px-2 py-1 font-medium">
                <a className="px-2 py-1 text-red-500" href="">
                    Delete
                </a>
                <a
                    href={`/entries/${entry.id}/edit`}
                    className="text-primary-700 px-2 py-1"
                >
                    Edit
                </a>
            </td>
        </tr>
    );
}

export default function Index({ entries }) {
    return (
        <GuestLayout>
            <div className="p-6">
                <div className="flex flex-wrap justify-center gap-5">
                    <a
                        href="/entries/create"
                        className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
                    >
                        Create new Entry
                    </a>
                </div>
            </div>
            <div className="overflow-y-hidden overflow-x-scroll rounded-lg border border-gray-200 shadow-md">
                <table className="w-full border-collapse bg-white text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-2 py-1 font-medium text-gray-900"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-1 font-medium text-gray-900"
                            >
                                Crated At
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-1 font-medium text-gray-900"
                            >
                                Last Updated At
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-1 font-medium text-gray-900"
                            >
                                User
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-1 font-medium text-gray-900"
                            ></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {entries.map((entry) => (
                            <EntryList entry={entry} key={entry.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </GuestLayout>
    );
}
