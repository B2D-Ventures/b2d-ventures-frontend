// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

interface LoginRequestBody {
  email: string;
  password: string;
  captcha: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, captcha } = (await request.json()) as LoginRequestBody;

    console.log('Received login request:', { email, password, captcha });

    // Validate input fields
    if (!email || !password || !captcha) {
      console.log('Missing fields.');
      return NextResponse.json(
        { message: 'Missing email, password, or CAPTCHA' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET is not defined.');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const prisma = new PrismaClient();

    // Utility function for password hashing
    const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
    };


    // Utility function to compare passwords
    const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
    };


    const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;

    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', captcha);

    const captchaResponse = await fetch(verificationURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const captchaData = await captchaResponse.json();

    console.log('CAPTCHA verification response:', captchaData);

    if (!captchaData.success) {
      console.log('CAPTCHA failed:', captchaData);
      return NextResponse.json(
        { message: 'CAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Authenticate user
    // Currently, only admin credentials are recognized
    if (email === 'admin.b2d@gmail.com' && password === 'Gx2109me++!') {
      console.log('Admin login successful.');
      return NextResponse.json(
        { message: 'Admin login successful' },
        { status: 200 }
      );
    }

    // TODO: Implement regular user authentication
    // For now, any non-admin credentials are considered invalid
    console.log('Invalid credentials for:', email);
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}