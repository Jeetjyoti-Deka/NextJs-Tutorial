"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleReset = async () => {
    try {
      const res = await axios.post("/api/users/resetpassword", {
        password,
        token,
      });
      toast.success(`${res.data.message}`);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="password">Password</label>
      <input
        className="p-2  border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <button
        className="p-2 border-gray-300 border-solid border-2 rounded-md mb-4 hover:border-gray-600"
        onClick={handleReset}
      >
        Reset Password
      </button>
    </div>
  );
}
