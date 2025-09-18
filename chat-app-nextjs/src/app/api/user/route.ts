// app/api/test/route.ts



import { NextResponse } from 'next/server';
import { Users } from '@/models/Users.model';
import {initSequelize } from "@/lib/sequelize"

export async function GET() {
  // Xử lý logic ở đây, ví dụ trả về JSON

  try {
    //await syncDb(); // sync bảng nếu chưa có

    // Thêm user mẫu để test
    // const newUser = await Users.create({
    //   name: 'Nguyễn Văn A',
    //   email: 'vana@example.com',
    // });
    initSequelize()
    if(global.sequelize && global.users){
  const users = await global.users.findAll({});
    return NextResponse.json({ message: 'Get User success', user: users });
    }
    else{
    return NextResponse.json({ message: 'fail'});

    }
   // const users = await Users.findAll({});
  } catch (error) {
    console.log('k thể sync db ', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
