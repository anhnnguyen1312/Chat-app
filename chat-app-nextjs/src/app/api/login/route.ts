import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import {initSequelize } from "@/lib/sequelize"
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
  try {
    initSequelize()
        if(global.sequelize && global.users){
         const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        ok: false,
        message: 'Email and password are required', 
      }, { status: 400 ,headers: corsHeaders,});
    }

    // Tìm user theo email
    const user = await global.users.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid email or password',
      }, { status: 401,headers: corsHeaders, });
    }

    // So sánh mật khẩu nhập vào với hashed password trong DB
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({
        ok: false,
        message: 'Invalid email or password',
      }, { status: 401 ,headers: corsHeaders,});
    }

    // Đăng nhập thành công → trả về user (ẩn password)
    return NextResponse.json({
      ok: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        auth_token_chat:user.auth_token_chat
      },
    }, { status: 200,headers: corsHeaders, });
        
        }
   

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      ok: false,
      message: 'Server error',
    }, { status: 500,headers: corsHeaders, });
  }
}
