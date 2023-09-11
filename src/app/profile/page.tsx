"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>{data ? <Link href={`/profile/${data}`}>{data}</Link> : "nothin"}</h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-4 mt-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-4 mt-4 rounded"
        onClick={getUserDetails}
      >
        Get Details
      </button>
    </div>
  );
}
