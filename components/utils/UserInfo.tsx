"use client";

import { getLoggedUser } from "@/app/api/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface UserDetails {
  name: string;
  email: string;
  role: string;
  userId: string;
  country: {
    name: string;
    timezone: string;
  };
  avatar: {
    url: string;
  };
}

function UserInfo() {
  const [details, setDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await getLoggedUser();
        setDetails(userData.user);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    getUserDetails();
  }, []);
  return (
    <div className="flex flex-col items-center gap-6 lg:pt-4 dark:text-white">
      <p className="text-3xl font-bold text-center">Your Details</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Key</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details ? (
            <>
              <TableRow>
                <TableCell className="font-medium">Name</TableCell>
                <TableCell>{details.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{details.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Role</TableCell>
                <TableCell>{details.role}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">User ID</TableCell>
                <TableCell>{details.userId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Country</TableCell>
                <TableCell>{details.country.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Timezone</TableCell>
                <TableCell>{details.country.timezone}</TableCell>
              </TableRow>
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="text-sm text-red-500 font-semibold text-center">
        Please contact our help & support to edit your details
      </p>
    </div>
  );
}

export default UserInfo;
