"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      toast.success("Email Sent");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
