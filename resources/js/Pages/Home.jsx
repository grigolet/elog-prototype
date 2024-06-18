import { Link, Head } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Button } from "@/Components/ui/button";

import { MoreHorizontal, EyeOff } from "lucide-react";

import Skeleton from "@/Layouts/Skeleton";
import Header from "@/Layouts/Header";

export default function Dashboard({ logbooks, can, auth }) {
  const rows = logbooks.map(({ id, name, entries }) => {
    return (
      <TableRow key={id}>
        <TableCell className="font-bold text-primary underline underline-offset-4">
          <Link href={`/logbooks/${id}`} className="font-medium">
            {name}
          </Link>
        </TableCell>
        {!auth.user || entries.length === 0 ? (
          <TableCell key={id} className="hidden md:table-cell sr"></TableCell>
        ) : (
          <>
            <TableCell className="text-right">
              {entries[0].can_view_entry ? (
                <Link
                  className="text-primary underline underline-offset-4"
                  href={`/entries/${entries[0].id}`}
                >
                  {entries[0].title}
                </Link>
              ) : (
                <EyeOff className="h-4 w-4 float-right"></EyeOff>
              )}
            </TableCell>
            <TableCell className="text-right hidden md:table-cell">
              {entries[0].username}
            </TableCell>
            <TableCell className="text-right hidden md:table-cell">
              {entries[0].updated_at}
            </TableCell>
            {(entries[0].can_edit_entry || entries[0].can_delete_entry) && (
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {entries[0].can_edit_entry && (
                      <DropdownMenuItem key="edit">Edit</DropdownMenuItem>
                    )}
                    {entries[0].can_delete_entry && (
                      <DropdownMenuItem key="delete">Delete</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </>
        )}
      </TableRow>
    );
  });

  return (
    <Skeleton>
      <Header auth={auth} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Logbooks</CardTitle>
              <CardDescription>Public logbooks</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logbook Name</TableHead>
                  {auth.user && (
                    <>
                      <TableHead className="text-right">Last Entry</TableHead>
                      <TableHead className="text-right hidden md:table-cell">
                        Author
                      </TableHead>
                      <TableHead className="text-right hidden md:table-cell">
                        Last Updated
                      </TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>{rows}</TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </Skeleton>
  );
}
