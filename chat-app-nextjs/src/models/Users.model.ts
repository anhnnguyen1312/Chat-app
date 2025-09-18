import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  timestamps: false,
})
export class Users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;
}
