"use client";

import Link from "next/link";
import {
  ChevronDown,
  LogIn,
  Menu,
  UserCircle,
  UserPlus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type UserMenuProps = {
  isAuthenticated?: boolean;
  userName?: string | null;
};

export function UserMenu({
  isAuthenticated = false,
  userName,
}: UserMenuProps) {
  return (
    <div className="flex items-center">
      {/* =====================================================
          DESKTOP
          ===================================================== */}

      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label="Open account menu"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-ink-200
                  bg-surface
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  text-ink-900
                  transition
                  hover:bg-ink-100
                  focus:outline-none
                  focus:ring-2
                  focus:ring-brand-500/30
                "
              >
                <UserCircle className="h-5 w-5" />

                <span className="max-w-32 truncate">
                  {isAuthenticated
                    ? userName || "Account"
                    : "Account"}
                </span>

                <ChevronDown className="h-4 w-4 text-ink-500" />
              </button>
            }
          />

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-60 rounded-2xl p-2"
          >
            {isAuthenticated ? (
              <>
                {/* ==============================
                    ACCOUNT
                    ============================== */}

                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    {userName || "My account"}
                  </DropdownMenuLabel>

                  <DropdownMenuItem
                    render={
                      <Link href="/account/dashboard">
                        Dashboard
                      </Link>
                    }
                  />

                  <DropdownMenuItem
                    render={
                      <Link href="/account/profile">
                        Profile
                      </Link>
                    }
                  />

                  <DropdownMenuItem
                    render={
                      <Link href="/account/trips">
                        My trips
                      </Link>
                    }
                  />

                  <DropdownMenuItem
                    render={
                      <Link href="/account/favorites">
                        Favorites
                      </Link>
                    }
                  />
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* ==============================
                    HOSTING
                    ============================== */}

                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    Hosting
                  </DropdownMenuLabel>

                  <DropdownMenuItem
                    render={
                      <Link href="/hosting/dashboard">
                        Hosting dashboard
                      </Link>
                    }
                  />

                  <DropdownMenuItem
                    render={
                      <Link href="/hosting/listings">
                        My listings
                      </Link>
                    }
                  />

                  <DropdownMenuItem
                    render={
                      <Link href="/hosting/reservations">
                        Reservations
                      </Link>
                    }
                  />
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* ==============================
                    SIGN OUT
                    ============================== */}

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={
                      <Link href="/logout">
                        Sign out
                      </Link>
                    }
                  />
                </DropdownMenuGroup>
              </>
            ) : (
              <>
                {/* ==============================
                    GUEST ACCOUNT
                    ============================== */}

                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    Welcome to Wikendia
                  </DropdownMenuLabel>

                  <DropdownMenuItem
                    render={
                      <Link
                        href="/login"
                        className="flex items-center gap-2"
                      >
                        <LogIn className="h-4 w-4" />

                        <span>Log in</span>
                      </Link>
                    }
                  />

                  <DropdownMenuItem
                    render={
                      <Link
                        href="/register"
                        className="flex items-center gap-2"
                      >
                        <UserPlus className="h-4 w-4" />

                        <span>Sign up</span>
                      </Link>
                    }
                  />
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* ==============================
                    HOSTING
                    ============================== */}

                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    Earn with Wikendia
                  </DropdownMenuLabel>

                  <DropdownMenuItem
                    render={
                      <Link href="/hosting/dashboard">
                        Start hosting
                      </Link>
                    }
                  />
                </DropdownMenuGroup>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* =====================================================
          MOBILE
          ===================================================== */}

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Open account menu"
                className="
                  inline-flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-ink-200
                  bg-surface
                  text-ink-900
                  transition
                  hover:bg-ink-100
                  focus:outline-none
                  focus:ring-2
                  focus:ring-brand-500/30
                "
              >
                <Menu className="h-5 w-5" />
              </button>
            }
          />

          <SheetContent
            side="right"
            className="w-[320px] bg-surface"
          >
            <SheetHeader className="text-left">
              <SheetTitle>
                {isAuthenticated
                  ? userName || "My account"
                  : "Welcome to Wikendia"}
              </SheetTitle>

              <SheetDescription>
                {isAuthenticated
                  ? "Manage your Wikendia account."
                  : "Log in or create an account to continue."}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-1">
              {isAuthenticated ? (
                <>
                  <MobileMenuLink
                    href="/account/dashboard"
                    label="Dashboard"
                  />

                  <MobileMenuLink
                    href="/account/profile"
                    label="Profile"
                  />

                  <MobileMenuLink
                    href="/account/trips"
                    label="My trips"
                  />

                  <MobileMenuLink
                    href="/account/favorites"
                    label="Favorites"
                  />

                  <div className="my-3 border-t border-ink-200" />

                  <MobileMenuLink
                    href="/hosting/dashboard"
                    label="Hosting dashboard"
                  />

                  <MobileMenuLink
                    href="/hosting/listings"
                    label="My listings"
                  />

                  <MobileMenuLink
                    href="/hosting/reservations"
                    label="Reservations"
                  />

                  <div className="my-3 border-t border-ink-200" />

                  <MobileMenuLink
                    href="/logout"
                    label="Sign out"
                  />
                </>
              ) : (
                <>
                  <MobileMenuLink
                    href="/login"
                    label="Log in"
                    icon={<LogIn className="h-4 w-4" />}
                  />

                  <MobileMenuLink
                    href="/register"
                    label="Sign up"
                    icon={<UserPlus className="h-4 w-4" />}
                  />

                  <div className="my-3 border-t border-ink-200" />

                  <MobileMenuLink
                    href="/hosting/dashboard"
                    label="Start hosting"
                  />
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE MENU LINK
   ========================================================= */

type MobileMenuLinkProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

function MobileMenuLink({
  href,
  label,
  icon,
}: MobileMenuLinkProps) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-sm
        font-medium
        text-ink-800
        transition
        hover:bg-ink-100
      "
    >
      {icon}

      <span>{label}</span>
    </Link>
  );
}

