"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      console.log("Sign up successfull", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Sign up failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Sign up"}</h1>
      <hr />

      <label htmlFor="username">Username</label>
      <input
        className="p-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2  border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        className="p-2 border-gray-300 border-solid border-2 rounded-md mb-4 hover:border-gray-600"
        onClick={onSignup}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No Sign Up" : "Sign Up"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
};
export default SignUp;
