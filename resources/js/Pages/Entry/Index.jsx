import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";

const deleteEntry = (entryId) => {
  const csrfToken = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");
  router.delete(
    `/entries/${entryId}`,
    {},
    {
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    }
  );
};

function EntryList({ entry }) {
  return (
    <tr className="hover:bg-gray-50">
      <th className="flex gap-3 xs:px-1 xs:py-1 px-3 py-2 font-normal text-gray-900">
        <a className="text-primary-700 underline" href={`/entries/${entry.id}`}>
          {entry.id}
        </a>
      </th>
      <td className="px-2 py-1">{entry.created_at}</td>
      <td className="px-2 py-1">{entry.updated_at}</td>
      <td className="px-2 py-1">{entry.user.name}</td>
      <td className="px-2 py-1">{entry.entry_description}</td>
      <td className="px-2 py-1 font-medium flex flex-row">
        <AlertDialog>
          <AlertDialogTrigger className="text-red-500">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will delete entry {entry.id} and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteEntry(entry.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
    <>
      <AuthenticatedLayout />
      <div className="p-6">
        <div className="flex flex-wrap justify-center gap-5">
          <Button asChild>
            <Link href="/entries/create">Create Entry</Link>
          </Button>
        </div>
      </div>
      <div className="overflow-scroll xs:text-xs rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                ID
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                Crated At
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                Last Updated At
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                User
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-gray-900">
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-2 font-medium text-gray-900"
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
    </>
  );
}
