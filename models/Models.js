const sequelize = require("../DB");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "user",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, defaultValue: "user" }
    },
    {
        timestamps: true,
        freezeTableName: true
    }
);


const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
        timestamps: true,
        freezeTableName: true
    }
);

const BasketProduct = sequelize.define("basket_product", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

const Product = sequelize.define(
    "product",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        count: { type: DataTypes.SMALLINT, allowNull: false },
        price: { type: DataTypes.SMALLINT, allowNull: false },
        isFlower: { type: DataTypes.BOOLEAN, allowNull: false }
    },
    {
        timestamps: true,
        freezeTableName: true
    }
);

const ProductType = sequelize.define("product_type", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

const ProductPicture = sequelize.define("product_picture", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        picture: { type: DataTypes.TEXT, allowNull: false }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


User.hasOne(Basket)
Basket.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

BasketProduct.hasMany(Product)
Product.belongsTo(BasketProduct);

Product.hasMany(ProductPicture, {
    as: { singular: "picture", plural: "pictures" },
    onDelete: "CASCADE",
})
ProductPicture.belongsTo(Product)

Product.hasOne(ProductType)
ProductType.belongsTo(Product)


module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    ProductType,
    ProductPicture
};
