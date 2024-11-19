import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  token: string;
  message: string[];
}

const usersFilePath = path.join(process.cwd(), 'src', 'app', '(main-content)', 'signup', 'data', 'users.json');

const verifyToken = async (token: string): Promise<IUser | null> => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const parsedData: { users: IUser[] } = JSON.parse(data);
    const user = parsedData.users.find(user => user.token === token);
    return user || null;
  } catch (error) {
    console.error('Error reading users.json:', error);
    return null;
  }
};

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const indexParam = searchParams.get('index');

    if (!token || indexParam === null) {
      return NextResponse.json({ message: 'Unauthorized or missing parameters' }, { status: 400 });
    }

    const index = parseInt(indexParam, 10);
    if (isNaN(index)) {
      return NextResponse.json({ message: 'Invalid message index' }, { status: 400 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    if (index < 0 || index >= user.message.length) {
      return NextResponse.json({ message: 'Message index out of range' }, { status: 400 });
    }

    user.message.splice(index, 1);

    const data = await fs.readFile(usersFilePath, 'utf-8');
    const parsedData: { users: IUser[] } = JSON.parse(data);

    const userIndex = parsedData.users.findIndex(u => u.token === token);
    if (userIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    parsedData.users[userIndex].message = user.message;

    await fs.writeFile(usersFilePath, JSON.stringify(parsedData, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
