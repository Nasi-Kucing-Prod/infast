"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(main-content)/signup/context/AuthContext";
import Swal from "sweetalert2";

interface User {
  name: string;
  id: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setToken: setAuthToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const storedUser = JSON.parse(localStorage.getItem("user") || '{"name": "User 1", "id": "3133"}');
      if (storedUser && storedUser.name) {
        setUser(storedUser); 
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out and redirected to the login page.",
      icon: "warning",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthToken("");
        router.push("/login"); 
      }
    });
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your account.",
      icon: "warning",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Account",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("signup/api/delete-account", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.id }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Account deleted successfully") {
              Swal.fire("Deleted!", "Your account has been deleted.", "success");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setAuthToken("");
              router.push("/login"); 
            } else {
              Swal.fire("Error", "There was an error deleting your account.", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error", "Something went wrong, please try again.", "error");
          });
      }
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex gap-2 items-center relative">
      <div className="text-right">
        <h2 className="text-sm">{user?.name || "User 1"}</h2>
        <h3 className="text-xs">ID: {user?.id || "3133"}</h3>
      </div>
      <div
        className="bg-emerald-200/30 text-emerald-800 border-2 border-emerald-400/30 rounded-full p-2 w-10 h-10 flex items-center justify-center relative cursor-pointer"
        onClick={toggleDropdown}
      >
        ?
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 bg-white p-2 shadow-lg rounded-lg text-sm z-10 w-36 md:w-48">
            <button onClick={handleLogout} className="text-red-600 w-full py-2 text-left hover:text-red-800 hover:font-semibold">
              Logout
            </button>
            <button onClick={handleDeleteAccount} className="text-red-600 w-full py-2 text-left hover:text-red-800 hover:font-semibold">
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
