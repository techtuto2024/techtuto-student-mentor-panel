"use client";

import { getLoggedUser } from "@/app/api/user";
import React, { useEffect, useState } from "react";

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

interface UserProps {
  welcomeMessage: string;
}

const UserWelcome: React.FC<UserProps> = ({ welcomeMessage }) => {
  const [user, setUser] = useState<User | null>(null);

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
    <p className="text-xl font-semibold dark:text-white">
      Hello {user?.name}, {welcomeMessage}
    </p>
  );
};

export default UserWelcome;
