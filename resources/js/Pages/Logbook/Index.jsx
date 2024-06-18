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

import { MoreHorizontal, EyeOff, FilePlus } from "lucide-react";

import Skeleton from "@/Layouts/Skeleton";
import Header from "@/Layouts/Header";

export default function Index({ logbooks, can, auth }) {
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
            {(can?.edit_logbooks || can?.delete_logbooks) && (
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
                    {can?.edit_logbooks && (
                      <DropdownMenuItem key="edit">
                        Edit Logbook
                      </DropdownMenuItem>
                    )}
                    {can?.delete_logbooks && (
                      <DropdownMenuItem key="delete">
                        Delete Logbook
                      </DropdownMenuItem>
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
        {can?.create_logbooks && (
          <Button asChild>
            <Link href="/logbooks/create">
              {" "}
              <FilePlus className="h-6 w-6" />
              Create New Logbook
            </Link>
          </Button>
        )}
      </main>
    </Skeleton>
  );
}
