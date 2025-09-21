// models/user.model.ts

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  IsEmail,
  AllowNull,
  Unique,
  Default,
} from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  timestamps: true,
})
export class Users extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar?: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  auth_token_chat?: string;
}
