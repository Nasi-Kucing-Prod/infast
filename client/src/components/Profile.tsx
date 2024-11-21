"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuth } from "@/app/signup/context/AuthContext";

interface User {
  name: string;
  id: number;
  email: string;
  phone: string;
  password: string;
  token: string;
  message: string[];
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setToken: setAuthToken } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const storedUser = JSON.parse(
        localStorage.getItem("user") ||
          '{"name": "User 1", "id": 3133, "email": "", "phone": "", "password": "", "token": "", "message": []}'
      );
      if (storedUser && storedUser.name) {
        setUser(storedUser);
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthToken("");
        router.push("/");
      }
    });
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Delete Account",
      text: "Are you sure you want to delete your account? Your account will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch("/signup/api/delete-account", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.id }),
        });

        const data = await response.json();

        if (response.ok && data.message === "Account deleted successfully") {
          await Swal.fire(
            "Deleted!",
            "Your account has been deleted..",
            "success"
          );
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuthToken("");
          router.push("/login");
        } else {
          await Swal.fire(
            "Failed!",
            data.message || "An error occurred while deleting the account.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        await Swal.fire(
          "Error!",
          "An error occurred, please try again.",
          "error"
        );
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center relative  gap-4 z-50">
      <div className="sm:block hidden text-end">
        <h2 className="text-base md:text-lg font-semibold">
          {user.name || "User 1"}
        </h2>
        <h3 className="text-xs md:text-sm text-gray-500">
          ID: {user.id || "3133"}
        </h3>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="bg-emerald-200/30 text-emerald-800 border-2 border-emerald-400/30 rounded-full p-2 w-10 h-10 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          ?
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-4 space-y-2">
              <div className="sm:hidden block text-start">
                <h2 className="text-base md:text-lg font-semibold">
                  {user.name || "User 1"}
                </h2>
                <h3 className="text-xs md:text-sm text-gray-500">
                  ID: {user.id || "3133"}
                </h3>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:text-red-800 font-semibold py-2 rounded-md"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full text-left text-red-600 hover:text-red-800 font-semibold py-2 rounded-md"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
