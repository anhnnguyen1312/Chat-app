// app/api/test/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/models/Users.model';
import { initSequelize } from '@/lib/sequelize';
import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid'; // Import UUID

export async function GET() {
  // Xử lý logic ở đây, ví dụ trả về JSON

  try {
    //await syncDb(); // sync bảng nếu chưa có

    // Thêm user mẫu để test
    // const newUser = await Users.create({
    //   name: 'Nguyễn Văn A',
    //   email: 'vana@example.com',
    // });
    initSequelize();
    if (global.sequelize && global.users) {
      const users = await global.users.findAll({});
      return NextResponse.json(
        { message: 'Get User success', ok: true, user: users },
        { headers: corsHeaders }
      );
    } else {
      return NextResponse.json({ message: 'fail', ok: false }, { headers: corsHeaders });
    }
    // const users = await Users.findAll({});
  } catch (error) {
    console.log('k thể sync db ', error);
    return NextResponse.json({ error: 'Internal server error', ok: false });
  }
}
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // 👈 hoặc thay bằng domain cụ thể như 'http://localhost:3002'
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}
export async function POST(req: NextRequest) {
  //  const handlerPost = async (req: NextRequest) => {

  try {
    initSequelize();
    const { email, password, avatar } = await req.json();

    console.log(email, password);

    if (email && password) {
      if (global.sequelize && global.users) {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 là salt rounds
        const id = crypto.randomUUID();
        const existingUser = await global.users.findOne({ where: { email } });

        if (existingUser) {
          return NextResponse.json(
            {
              ok: false,
              message: 'Email already exists',
            },
            { status: 400, headers: corsHeaders }
          );
        }

        // const appid="1669024bacf5ec14d"
        // const region="IN"
        const apikey = '1bf73ce66e2454c6a0975bbe3d1e2f14bf15537b';
        const response = await fetch(`https://1669024bacf5ec14d.api-in.cometchat.io/v3/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: apikey,
          },
          body: JSON.stringify({
            uid: id,
            name: email,
            avatar: avatar,
            withAuthToken: true,
          }),
        });

        const data = await response.json();
        console.log('data', data);
        if (response.ok) {
          console.log(data.data.authToken);

          const newUser = await global?.users?.create({
            id,
            email,
            password: hashedPassword,
            avatar,
            auth_token_chat: data.data.authToken,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          return NextResponse.json(
            { message: 'User created', user: newUser, ok: true },
            {
              status: 201,
              headers: corsHeaders,
            }
          );
        } else {
          return NextResponse.json(
            { message: 'Register chat account fail!', ok: false },
            { status: 400, headers: corsHeaders }
          );
        }
      }
    } else {
      return NextResponse.json(
        { message: 'Invalid data', ok: false },
        { status: 400, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { message: 'Server error', ok: false },
      { status: 500, headers: corsHeaders }
    );
  }
}
