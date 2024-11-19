import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

interface GetCurrentUserResponse {
  userId: number;
  watchlist: string[];
}

const usersFilePath = path.join(process.cwd(), 'src', 'app', '(main-content)', 'signup', 'data', 'users.json');

const readUsersData = async (): Promise<{ users: User[] }> => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { users: [] };
    }
    throw error;
  }
};

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    console.log('Received request to get current user with token:', { token });

    const data = await readUsersData();
    const user = data.users.find((user: User) => user.token === token);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const response: GetCurrentUserResponse = {
      userId: user.id,
      watchlist: user.watchlist,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json({ message: "Error fetching user data" }, { status: 500 });
  }
}
