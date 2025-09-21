// models/list-conversation.model.ts
import { HasMany } from 'sequelize-typescript';
import { Messages } from './Messages.model';
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
} from 'sequelize-typescript';
import { Users } from './Users.model';

@Table({
  tableName: 'list_conversation',
  timestamps: true,
})
export class ListConversation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
    @ForeignKey(() => Users)

  @Column(DataType.INTEGER)

  userId!: number;

  @AllowNull(false)
    @ForeignKey(() => Users)

  @Column(DataType.INTEGER)
  clientId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

    @HasMany(() => Messages)
  messages!: Messages[];

}



