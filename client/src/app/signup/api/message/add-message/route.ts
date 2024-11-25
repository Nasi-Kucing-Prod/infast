import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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

const verifyToken = async (token: string): Promise<ISignUpData | null> => {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    const parsedData: { users: ISignUpData[] } = JSON.parse(data);
    const user = parsedData.users.find((user) => user.token === token);
    return user || null;
  } catch (error) {
    console.error("Error reading users.json:", error);
    return null;
  }
};

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const { inputString } = await req.json();

    if (
      !inputString ||
      typeof inputString !== "string" ||
      inputString.trim() === ""
    ) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    user.message.push(inputString.trim());

    const data = await fs.readFile(usersFilePath, "utf-8");
    const parsedData: { users: ISignUpData[] } = JSON.parse(data);

    const userIndex = parsedData.users.findIndex((u) => u.token === token);
    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    parsedData.users[userIndex].message = user.message;

    await fs.writeFile(
      usersFilePath,
      JSON.stringify(parsedData, null, 2),
      "utf-8"
    );

    return NextResponse.json(
      { message: "Message added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
