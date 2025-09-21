import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { Users } from '@/models/Users.model';

import pg from 'pg';
// Khởi tạo Sequelize instance
declare global {
  var sequelize: Sequelize | undefined;
  //   var todos: typeof Todos | undefined;
  // var projects: typeof Projects | undefined;
  var users: typeof Users | undefined;
}

console.log('sequelize instance file loaded');

export const initSequelize = async () => {
  console.log('initSequelize check!');

  if (!global.sequelize) {
    try {
      const sequelize = new Sequelize({
        dialect: 'postgres', // hoặc 'mysql', 'sqlite'
        host: 'aws-1-ap-southeast-1.pooler.supabase.com',
        port: 5432,
        dialectModule: pg,
        username: 'postgres.umoljsxpjqnywatylvrj',
        password: 'chatapp123aA@',
        database: 'postgres',
        models: [Users], // Load tất cả models từ thư mục models
        logging: false,
      }); // hoặc { force: true } nếu muốn drop bảng trước

      global.sequelize = sequelize;
      // global.todos = Todos
      global.users = Users;
      // global.projects = Projects

      console.log('initSequelize done!');
    } catch (error) {
      console.error('initSequelize failed:', error);
    }
  } else {
    console.log('Sequelize already inited!');
  }
};

// export const sequelize =  new Sequelize({
//   dialect: 'postgres', // hoặc 'mysql', 'sqlite'
//   host: 'aws-1-ap-southeast-1.pooler.supabase.com',
//   port: 5432,
//   dialectModule: pg,
//   username: 'postgres.ylqlytshhyezvlixpcgd',
//   password: 'nextjsapp123aA@',
//   database: 'postgres',
//   models: [Users, Todos,Projects],// Load tất cả models từ thư mục models
//   logging: false,
// });

// let isSynced = false;

// export const syncDb = async () => {
//         console.log('syncDb run!');

//   if (!isSynced) {
//     try {
//       await sequelize.sync({ alter: true }); // hoặc { force: true } nếu muốn drop bảng trước
//       console.log('Database synced!');
//  isSynced = true;
//   } catch (error) {
//       console.error('Sync failed:', error);
//     }
//   }
// };
