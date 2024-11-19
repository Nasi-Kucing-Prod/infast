import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(
  process.cwd(),
  "src",
  "app",
  "signup",
  "data",
  "users.json"
);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    if (!fs.existsSync(usersFilePath)) {
      return NextResponse.json(
        { message: "Users data not found" },
        { status: 404 }
      );
    }

    const fileData = fs.readFileSync(usersFilePath, "utf-8");
    const parsedData = JSON.parse(fileData);

    const user = parsedData.users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading or processing users.json:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
