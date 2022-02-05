import sequelize from '../sequelize.js'

import database from 'sequelize'

const { DataTypes } = database

/*
* models definitions
*/

const Test = sequelize.define('test',{
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.STRING, allowNull: true}
})



// модель «Пользователь», таблица БД «users»
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

// модель «Корзина», таблица БД «baskets»
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// связь между корзиной и товаром через промежуточную таблицу «basket_products»
// у этой таблицы будет составной первичный ключ (basket_id + product_id)
const BasketProduct = sequelize.define('basket_product', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})

// модель «Товар», таблица БД «products»
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: false},
})

// модель «Категория», таблица БД «categories»
const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// модель «Бренд», таблица БД «brands»
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// модель «Рейтинг», таблица БД «ratings»
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

// свойства товара, у одного товара может быть много свойств
const ProductProp = sequelize.define('product_prop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.STRING, allowNull: false},
})

/*
 * Описание связей
 */

// связь many-to-many товаров и корзин через промежуточную таблицу basket_products;
// товар может быть в нескольких корзинах, в корзине может быть несколько товаров
Basket.belongsToMany(Product, { through: BasketProduct, as: 'products', onDelete: 'CASCADE'});
Product.belongsToMany(Basket, { through: BasketProduct });

// связь пользователя с рейтингами: пользователь может оценить несколько товаров,
// но каждая запись в таблице ratings связана только с одним пользователем
User.hasMany(Rating, {onDelete: 'CASCADE'})
Rating.belongsTo(User)

// связь категории с товарами: в категории может быть несколько товаров, но
// каждый товар может принадлежать только одной категории
Category.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Category)

// связь бренда с товарами: у бренда может быть много товаров, но каждый товар
// может принадлежать только одному бренду
Brand.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Brand)

// связь товара с рейтингами: товар может иметь несколько оценок от разных
// пользователей, но каждая оценка пользователя принадлежит одному товару
Product.hasMany(Rating, {onDelete: 'CASCADE'})
Rating.belongsTo(Product)

// связь товара с его свойствами: у товара может быть несколько свойств, но
// каждое свойство связано только с одним товаром
Product.hasMany(ProductProp, {as: 'props', onDelete: 'CASCADE'})
ProductProp.belongsTo(Product)

export {Test, User, Basket, Product, Category, Brand, Rating, BasketProduct, ProductProp}



