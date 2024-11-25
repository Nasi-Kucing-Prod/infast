"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginimage from "@/image/login.png";
import { useAuth } from "../signup/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setToken: setAuthToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Email and password must be filled in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("login/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.user.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        setAuthToken(result.user.token);
        router.push("/dashboard");
      } else {
        setError(result.message || "Kredensial tidak valid.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan yang tidak terduga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen sm:flex pb-10 pt-20 rounded-lg shadow-md">
      <div className="sm:w-3/5 w-full flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl tracking-tight font-bold">Login</h1>
          <p className="text-gray-500 text-sm">
            Login to continue seeing data details
          </p>
        </div>

        {error && (
          <div className="p-3 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full px-10 space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm tracking-tight font-semibold"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-black"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm tracking-tight font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-semibold text-white bg-emerald-500 rounded hover:bg-emerald-600 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-center text-sm">
            Dont have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:text-indigo-500">
              Sign Up Here
            </a>
          </p>
        </form>
      </div>
      <div className="sm:block p-4 hidden ">
        <Image src={loginimage} alt="login" width={500} height={500} />
      </div>
    </div>

    // <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    //   <div className="w-full max-w-sm p-6 space-y-4 bg-white rounded-lg shadow-md">
    //     <h2 className="text-2xl font-bold text-center">Login</h2>

    // {error && (
    //   <div className="p-3 text-red-700 bg-red-100 border border-red-400 rounded">
    //     {error}
    //   </div>
    // )}

    //     <form onSubmit={handleSubmit} noValidate className="">
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
    //         <input
    //           id="email"
    //           name="email"
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
    //         <input
    //           id="password"
    //           name="password"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //       </div>

    // <button
    //   type="submit"
    //   disabled={loading}
    //   className="w-full px-4 py-2 font-semibold text-white bg-emerald-500 rounded hover:bg-emerald-600 transition-colors"
    // >
    //   {loading ? "Logging in..." : "Login"}
    // </button>

    //       <div className="flex-grow p-4">
    //         <Image src={loginimage} alt="login" width={500} height={500}/>
    //       </div>
    //     </form>

    // <p className="mt-4 text-center text-sm">
    //   Dont have an account?{" "}
    //   <a href="/signup" className="text-blue-500 hover:text-indigo-500">
    //     Sign Up Here
    //   </a>
    // </p>
    //   </div>
    // </div>
  );
};

export default Login;
