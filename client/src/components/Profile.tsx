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
  const [newMessage, setNewMessage] = useState("");
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
      text: "Anda yakin ingin logout? Anda akan diarahkan ke halaman login.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthToken("");
        router.push("/login");
      }
    });
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Hapus Akun",
      text: "Anda yakin ingin menghapus akun? Akun Anda akan terhapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
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
          await Swal.fire("Dihapus!", "Akun Anda telah dihapus.", "success");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuthToken("");
          router.push("/login");
        } else {
          await Swal.fire(
            "Gagal!",
            data.message || "Terjadi kesalahan saat menghapus akun.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        await Swal.fire(
          "Error!",
          "Terjadi kesalahan, silakan coba lagi.",
          "error"
        );
      }
    }
  };

  const handleAddMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      await Swal.fire("Validasi Gagal", "Pesan tidak boleh kosong.", "warning");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/signup/api/message/add-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inputString: newMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        await Swal.fire("Berhasil", "Pesan berhasil ditambahkan.", "success");
        const updatedMessages = [...user!.message, newMessage];
        const updatedUser: User = { ...user!, message: updatedMessages };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setNewMessage("");
      } else {
        await Swal.fire(
          "Gagal",
          data.message || "Gagal menambahkan pesan.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error adding message:", error);
      await Swal.fire(
        "Error!",
        "Terjadi kesalahan saat menambahkan pesan.",
        "error"
      );
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteMessage = async (index: number) => {
    if (index < 0 || index >= user!.message.length) {
      await Swal.fire("Error", "Indeks pesan tidak valid.", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Hapus Pesan",
      text: "Anda yakin ingin menghapus pesan ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `/signup/api/message/delete-message?token=${token}&index=${index}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (response.ok && data.message === "Message deleted successfully") {
          await Swal.fire("Dihapus!", "Pesan berhasil dihapus.", "success");
          const updatedMessages = user!.message.filter((_, i) => i !== index);
          const updatedUser: User = { ...user!, message: updatedMessages };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          await Swal.fire(
            "Gagal!",
            data.message || "Gagal menghapus pesan.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        await Swal.fire(
          "Error!",
          "Terjadi kesalahan saat menghapus pesan.",
          "error"
        );
      }
    }
  };

  const handleEditMessage = async (index: number) => {
    // Validasi indeks yang diberikan
    if (index < 0 || index >= user!.message.length) {
      await Swal.fire("Error", "Indeks pesan tidak valid.", "error");
      return;
    }

    const currentMessage = user!.message[index] || "";

    const { value: editedMessage, isConfirmed } = await Swal.fire({
      title: "Edit Pesan",
      input: "text",
      inputLabel: "Ubah pesan Anda:",
      inputValue: currentMessage,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      inputValidator: (value) => {
        if (!value || value.trim() === "") {
          return "Pesan tidak boleh kosong!";
        }
        return null;
      },
    });

    if (isConfirmed && editedMessage) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/signup/api/message/edit-message", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            index: index,
            newMessage: editedMessage.trim(),
          }),
        });

        const data = await response.json();

        if (response.ok && data.message === "Message edited successfully") {
          await Swal.fire("Berhasil", "Pesan berhasil diubah.", "success");
          const updatedMessages = user!.message.map((msg, i) =>
            i === index ? editedMessage.trim() : msg
          );
          const updatedUser: User = { ...user!, message: updatedMessages };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          await Swal.fire(
            "Gagal",
            data.message || "Gagal mengubah pesan.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error editing message:", error);
        await Swal.fire(
          "Error!",
          "Terjadi kesalahan saat mengubah pesan.",
          "error"
        );
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center relative  gap-4">
      <div>
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
          className="bg-emerald-200/30 text-emerald-800 border-2 border-emerald-400/30 rounded-full p-2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          ?
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-4 space-y-2">
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:text-red-800 font-semibold px-3 py-2 rounded-md"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full text-left text-red-600 hover:text-red-800 font-semibold px-3 py-2 rounded-md"
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
