import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface ProductAttributes {
  id: number;
  name: string;
  type: string;
  isUsed: boolean;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public type!: string;
  public isUsed!: boolean;
}

export const ProductFactory = (sequelize: Sequelize) => {
  Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isUsed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
      tableName: 'products',
      sequelize
    }
  );

  return Product;
};
