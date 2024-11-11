import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ISignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const usersFilePath = path.join(process.cwd(), 'src', 'app','signup', 'data', 'users.json');

export async function POST(req: NextRequest) {
  const { name, email, phone, password }: ISignUpData = await req.json();

  const errors: { [key in keyof ISignUpData]?: string } = {};

  if (!name || !name.trim()) {
    errors.name = 'Name is required';
  }

  if (!email || !email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email is invalid';
  }

  if (!phone || !phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[0-9]{10,15}$/.test(phone)) {
    errors.phone = 'Phone number must be between 10 and 15 digits';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: 'Validation failed', errors }, { status: 400 });
  }

  try {
    const fileData = fs.readFileSync(usersFilePath, 'utf-8');
    const parsedData = JSON.parse(fileData);

    const emailExists = parsedData.users.some((user: ISignUpData) => user.email === email);
    if (emailExists) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }
    parsedData.users.push({ name, email, phone, password });
    fs.writeFileSync(usersFilePath, JSON.stringify(parsedData, null, 2));

    return NextResponse.json({ message: 'Sign Up Successful' });
    
  } catch (error) {
    console.error('Error reading or writing to users.json:', error);
    return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
  }
}
