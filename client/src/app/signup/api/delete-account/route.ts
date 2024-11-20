import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'src', 'app', 'signup', 'data', 'users.json');

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json(); 

  try {
    let parsedData: { users: any[] } = { users: [] };
    if (fs.existsSync(usersFilePath)) {
      const fileData = fs.readFileSync(usersFilePath, 'utf-8');
      parsedData = JSON.parse(fileData);
    }

    const userIndex = parsedData.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    parsedData.users.splice(userIndex, 1);

    fs.writeFileSync(usersFilePath, JSON.stringify(parsedData, null, 2));

    return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting user from users.json:', error);
    return NextResponse.json({ message: 'Error deleting account' }, { status: 500 });
  }
}
