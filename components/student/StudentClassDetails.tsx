"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchClassDetails, getLoggedUser } from "@/app/api/user";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "../utils/Loading";

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

const StudentClassDetails = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [details, setDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await getLoggedUser();
        setDetails(userData.user);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError("Failed to fetch user details.");
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    const getClassDetails = async (userId: string) => {
      try {
        const data = await fetchClassDetails(userId, "studentId");
        setClasses(data);
      } catch (error) {
        setError("Failed to fetch class details");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch class details if `details` is populated and `userId` is available
    if (details && details.userId) {
      getClassDetails(details.userId);
    }
  }, [details]); // The effect depends on `details`

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-6">
      {classes.map((classItem: any) => (
        <Card
          key={classItem._id}
          className="border-violet-500 dark:bg-violet-500"
        >
          <CardHeader>
            <CardTitle className="text-violet-500 dark:text-white">
              {classItem.subjectName}
            </CardTitle>
            <CardDescription className="dark:text-slate-100">
              {classItem.classNumber}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-white">
              Date: {classItem.mentorClassDate}
            </p>
            <p className="text-sm text-gray-600 dark:text-white">
              Time: {classItem.mentorClassTime}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className="w-full bg-violet-500 hover:bg-violet-600 dark:hover:bg-stone-900 dark:hover:text-white"
            >
              <Link target="_blank" href={classItem.classLink}>
                Join Class
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StudentClassDetails;
