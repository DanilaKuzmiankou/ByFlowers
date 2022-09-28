const sequelize = require('../DB')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
  'user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const BasketProduct = sequelize.define(
  'basket_product',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.SMALLINT, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const Product = sequelize.define(
  'product',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: 'name' },
    description: { type: DataTypes.TEXT, allowNull: false },
    count: { type: DataTypes.SMALLINT, allowNull: false },
    price: { type: DataTypes.SMALLINT, allowNull: false },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }

  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const ProductType = sequelize.define(
  'product_type',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: 'name' },
    isFlower: { type: DataTypes.TINYINT, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const ProductPicture = sequelize.define(
  'product_picture',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    picture: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

const RefreshToken = sequelize.define(
  'refresh_token',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.TEXT, allowNull: false, required: true },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
)

RefreshToken.hasOne(User)
User.belongsTo(RefreshToken, {
  as: 'refreshToken',
  onDelete: 'CASCADE',
})

User.hasMany(BasketProduct, {
  as: 'basketProduct',
  onDelete: 'CASCADE',
})
BasketProduct.belongsTo(User, {
  as: 'user',
  onDelete: 'CASCADE',
})

BasketProduct.hasOne(Product, {
  as: 'product',
})
Product.belongsTo(BasketProduct)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductPicture, {
  as: { singular: 'picture', plural: 'pictures' },
  onDelete: 'CASCADE',
})
ProductPicture.belongsTo(Product)

ProductType.hasOne(Product)
Product.belongsTo(ProductType, {
  as: 'productType',
  onDelete: 'CASCADE',
})

module.exports = {
  User,
  RefreshToken,
  BasketProduct,
  Product,
  ProductType,
  ProductPicture,
}
