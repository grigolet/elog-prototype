import { Link } from "@inertiajs/react";
import { Menu, HomeIcon } from "lucide-react";

import { Button } from "@/Components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { CircleUser, LogIn } from "lucide-react";

import { router } from "@inertiajs/react";

export default function Header({ auth, appName }) {
  return (
    <header className="z-50 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <HomeIcon className="h-6 w-6" />
          <span className="sr-only">{appName}</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/logbooks"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Logbooks
        </Link>
        <Link
          href="/settings"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <HomeIcon className="h-6 w-6" />
              <span className="sr-only">Elog</span>
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-foreground"
            >
              Settings
            </Link>
            <Link
              href="/logbooks"
              className="text-muted-foreground hover:text-foreground"
            >
              Logbooks
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
        {auth.user === null ? (
          <Link
            href="/login"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <LogIn className="h-6 w-6" />
            <span className="sr-only">Login</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.post("/logout")}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
