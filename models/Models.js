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
    { timestamps: true }
);


const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: true }
);

const BasketFlower = sequelize.define("basket_flower", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
);

const Flower = sequelize.define(
    "flower",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        count: { type: DataTypes.SMALLINT, allowNull: false },
        price: { type: DataTypes.SMALLINT, allowNull: false }
    },
    { timestamps: true }
);

const FlowerType = sequelize.define("flower_type", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false }
    },
    { timestamps: false }
);

const FlowerPicture = sequelize.define("flower_picture", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        picture: { type: DataTypes.TEXT, allowNull: false }
    },
    { timestamps: false }
);


User.hasOne(Basket)
Basket.belongsTo(User);

Basket.hasMany(BasketFlower);
BasketFlower.belongsTo(Basket);

BasketFlower.hasMany(Flower)
Flower.belongsTo(BasketFlower);

Flower.hasMany(FlowerPicture)
FlowerPicture.belongsTo(Flower)

Flower.hasOne(FlowerType)
FlowerType.belongsTo(Flower)


module.exports = {
    User,
    Rating,
    Review,
    ReviewImage,
    Tags,
};
