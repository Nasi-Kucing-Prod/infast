// signup/page.tsx
"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import signupimage from "@/image/signup.png";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const { setToken, setUserId } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    const validationErrors: FormErrors = {};
    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.phone.trim()) validationErrors.phone = "Phone is required";
    if (!formData.password.trim())
      validationErrors.password = "Password is required";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("/signup/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);

        if (result.token) {
          setToken(result.token);
        }

        if (result.id) {
          setUserId(result.id); // set user ID in context
        }

        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        setErrors({});
        router.push("/login");
      } else {
        setServerError(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up Page" />
      </Head>

      <div className="h-screen sm:flex pb-10 pt-20 rounded-lg shadow-md">
        <div className="flex-grow p-4 sm:block hidden">
          <Image
            src={signupimage}
            alt="signup"
            width={500}
            height={500}
            className="bject-cover rounded-lg"
          />
        </div>
        <div className="sm:w-3/5 w-full flex flex-col gap-5 items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl tracking-tight font-bold">Signup</h1>
            <p className="text-gray-500 text-sm">
              Register to continue seeing data details
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full px-10 space-y-5">
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            {serverError && <p className="text-red-500">{serverError}</p>}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm tracking-tight font-semibold"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
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
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm tracking-tight font-semibold"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
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
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-emerald-500 rounded hover:bg-emerald-600 transition-colors"
            >
              Sign Up
            </button>
            <div className="mt-0 mb-4 text-center text-sm">
              <span>Already have an account?</span>{" "}
              <Link
                href="/login"
                className="text-emerald-500 hover:text-emerald-600"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
