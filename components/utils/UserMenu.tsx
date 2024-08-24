"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLoggedUser } from "@/app/api/user";
import { clearAllCookies } from "@/utils/cookies";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: {
    _id: string;
    url: string;
  };
  role: string;
  userId: string;
}

function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    try {
      // await logout();
      clearAllCookies();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getLoggedUser();
        setUser(userData.user);
      } catch (error) {
        console.error("Failed to fetch logged-in user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="relative bottom-[55px] lg:bottom-0">
      <DropdownMenu>
        <DropdownMenuTrigger className="" asChild>
          <Button
            variant="outline"
            className="flex flex-row items-center justify-between rounded-full py-5 dark:bg-[#1e1e1e] dark:border-white/50 dark:text-white"
          >
            <Avatar className="flex items-center h-fit">
              <AvatarImage
                className="h-5/6 w-5/6 rounded-full"
                src={user?.avatar.url}
                alt="User"
              />
              <AvatarFallback>
                <Image
                  src="/images/placeholder.png"
                  alt="User"
                  height={32}
                  width={32}
                  className="h-5/6 w-5/6 rounded-full"
                />
              </AvatarFallback>
            </Avatar>
            <i className="fa-solid fa-angle-down"></i>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{user?.name || "Loading..."}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/manager/settings">
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link
            target="_blank"
            href="https://wa.me/+918839474286?text=Hello%2C%20I%20need%20assistance"
          >
            <DropdownMenuItem className="cursor-pointer">
              Support
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserMenu;
