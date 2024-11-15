"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(main-content)/signup/context/AuthContext";

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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Email dan password harus diisi.");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm p-6 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && (
          <div className="p-3 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-semibold text-white bg-emerald-500 rounded hover:bg-emerald-600 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:text-indigo-500">
            Sign Up Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
