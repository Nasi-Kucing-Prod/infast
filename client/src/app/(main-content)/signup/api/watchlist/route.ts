import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  token: string;
  watchlist: string[];
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
const readUsersData = async (): Promise<{ users: User[] }> => {
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
const writeUsersData = async (data: { users: User[] }): Promise<void> => {
  await fs.writeFile(usersFilePath, JSON.stringify(data, null, 2), "utf-8");
};
export async function POST(request: Request) {
  try {
    const { userId, uniqueId } = await request.json();
    console.log("Received request:", { userId, uniqueId });
    const data = await readUsersData();
    const userIndex = data.users.findIndex((user: User) => user.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const user = data.users[userIndex];
    if (user.watchlist.includes(uniqueId)) {
      user.watchlist = user.watchlist.filter((id: string) => id !== uniqueId);
    } else {
      user.watchlist.push(uniqueId);
    }
    user.watchlist = Array.from(new Set(user.watchlist));
    await writeUsersData(data);
    return NextResponse.json(
      { message: "Watchlist updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating watchlist:", error);
    return NextResponse.json(
      { message: "Error updating watchlist" },
      { status: 500 }
    );
  }
}
