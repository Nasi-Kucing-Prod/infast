import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

interface ISignUpData {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  token: string;
  message: string[];
}

const usersFilePath = path.join(
  process.cwd(),
  "src",
  "app",
  "signup",
  "data",
  "users.json"
);

const generateToken = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

const readUsersData = async (): Promise<{ users: ISignUpData[] }> => {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { users: [] };
    }
    throw error;
  }
};

const writeUsersData = async (data: {
  users: ISignUpData[];
}): Promise<void> => {
  await fs.writeFile(usersFilePath, JSON.stringify(data, null, 2), "utf-8");
};

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      password,
    }: Omit<ISignUpData, "id" | "token" | "message"> = await req.json();

    const errors: {
      [key in keyof Omit<ISignUpData, "id" | "token" | "message">]?: string;
    } = {};

    if (!name || !name.trim()) {
      errors.name = "Name is required";
    }

    if (!email || !email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!phone || !phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(phone)) {
      errors.phone = "Phone number must be between 10 and 15 digits";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const usersData = await readUsersData();

    const emailExists = usersData.users.some((user) => user.email === email);
    if (emailExists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const newId =
      usersData.users.length > 0
        ? usersData.users[usersData.users.length - 1].id + 1
        : 1;

    const token = generateToken();

    const newUser: ISignUpData = {
      id: newId,
      name,
      email,
      phone,
      password,
      token,
      message: [],
    };

    // Tambahkan pengguna baru ke array
    usersData.users.push(newUser);

    // Tulis kembali data ke users.json
    await writeUsersData(usersData);

    // Kembalikan respons sukses
    return NextResponse.json(
      { message: "Sign Up Successful", token, id: newId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing sign up:", error);
    return NextResponse.json({ message: "Error saving data" }, { status: 500 });
  }
}
