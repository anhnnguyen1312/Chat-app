// models/message.model.ts

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { ListConversation } from './ListConversation.model';
import { Users } from './Users.model';

@Table({
  tableName: 'messages',
  timestamps: true,
})
export class Messages extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => ListConversation)
  @Column(DataType.INTEGER)
  conversationId!: number;

   @BelongsTo(() => ListConversation)
  conversation!: ListConversation;
  
  @AllowNull(false)
@ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  senderId!: number;

  @BelongsTo(() => Users)
  sender!: Users;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
