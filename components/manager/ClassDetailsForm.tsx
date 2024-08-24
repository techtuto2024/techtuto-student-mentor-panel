"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendClassDetails } from "@/app/api/user";
import toast, { Toaster } from "react-hot-toast";

const ClassDetailsForm = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    mentorId: "",
    subjectName: "",
    classLink: "",
    classDate: "",
    classTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const transformDateFormat = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Transform the date before sending
      const transformedData = {
        ...formData,
        classDate: transformDateFormat(formData.classDate),
      };
      await sendClassDetails(transformedData);
      toast.success("Class details sent successfully!");
      // Reset form after successful submission
      setFormData({
        studentId: "",
        mentorId: "",
        subjectName: "",
        classLink: "",
        classDate: "",
        classTime: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-3 pt-4"
    >
      <p className="text-3xl font-bold dark:text-white">Send Class Details</p>
      <Toaster />
      <div className="flex flex-col lg:w-2/3 w-full gap-6 dark:text-white">
        <div>
          <Label htmlFor="studentId">Student Id</Label>
          <Input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter student id"
          />
        </div>
        <div>
          <Label htmlFor="mentorId">Mentor Id</Label>
          <Input
            type="text"
            id="mentorId"
            name="mentorId"
            value={formData.mentorId}
            onChange={handleChange}
            placeholder="Enter mentor id"
          />
        </div>
        <div>
          <Label htmlFor="subjectName">Subject</Label>
          <Input
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            placeholder="Enter subject name"
          />
        </div>
        <div>
          <Label htmlFor="classLink">Class Link</Label>
          <Input
            type="text"
            id="classLink"
            name="classLink"
            value={formData.classLink}
            onChange={handleChange}
            placeholder="Enter class link"
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-x-6">
          <div className="w-1/2">
            <Label htmlFor="classDate">Class Date</Label>
            <Input
              type="date"
              id="classDate"
              name="classDate"
              value={formData.classDate}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="classTime">Class Time</Label>
            <Input
              type="time"
              id="classTime"
              name="classTime"
              value={formData.classTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          className="hover:bg-violet-500 dark:hover:bg-violet-500 dark:hover:text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Details"}
        </Button>
      </div>
    </form>
  );
};

export default ClassDetailsForm;
