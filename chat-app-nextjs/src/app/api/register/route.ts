// app/api/test/route.ts



import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/models/Users.model';
import {initSequelize } from "@/lib/sequelize"
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
    initSequelize()
    if(global.sequelize && global.users){
  const users = await global.users.findAll({});
    return NextResponse.json({ message: 'Get User success',ok:true, user: users });
    }
    else{
    return NextResponse.json({ message: 'fail',ok:false});

    }
   // const users = await Users.findAll({});
  } catch (error) {
    console.log('k thể sync db ', error);
    return NextResponse.json({ error: 'Internal server error' ,ok:false});
  }
}
  const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // 👈 hoặc thay bằng domain cụ thể như 'http://localhost:3002'
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: corsHeaders,
  });
}
 export async function POST(req: NextRequest) {

//  const handlerPost = async (req: NextRequest) => {
  try {
     initSequelize()
    const { email,password,avatar } = await req.json();
   
    console.log(email, password);
  
if(email && password ){
   if(global.sequelize && global.users){
    const existingUser = await global.users.findOne({ where: { email } });

    if (existingUser) {
      return NextResponse.json({
        ok: false,
        message: 'Email already exists',
      }, { status: 400 ,        headers: corsHeaders,
});
    }
  const hashedPassword = await bcrypt.hash(password, 10); // 10 là salt rounds

 const newUser = await global.users.create({id: crypto.randomUUID(), email, password:hashedPassword,avatar, createdAt: new Date,
            updatedAt: new Date });

    return NextResponse.json({ message: 'User created', data: newUser ,ok:true},  {
        status: 201,
             headers: corsHeaders,

      });

   }
      
}
else{
      return NextResponse.json({ message: 'Invalid data' ,ok:false}, { status: 400 ,        headers: corsHeaders,
});

}
       
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Server error'  ,ok:false}, { status: 500 ,        headers: corsHeaders,
});
  }
}