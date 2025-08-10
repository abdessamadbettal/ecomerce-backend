const Product = require('../models/productModel');
const User = require('../models/userModel');
const connectDatabase = require('../config/database');
const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');

// Setting dotenv file
dotenv.config({ path: 'api/config/config.env' });

connectDatabase();

const seedData = async () => {
    try {
        // 1. Clear existing data
        await User.deleteMany();
        console.log('Users are deleted');
        await Product.deleteMany();
        console.log('Products are deleted');

        // 2. Create a new admin user
        const user = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            gender: 'male',
            password: 'password123', // Default password
            role: 'admin',
        });
        console.log('Admin user created successfully');
        const userId = user._id;

        // 3. Create new products associated with the new user
        const products = [];
        const numberOfProducts = 50;

        for (let i = 0; i < numberOfProducts; i++) {
            const productName = faker.commerce.productName();
            const price = parseFloat(faker.commerce.price({ min: 100, max: 2000, dec: 0 }));
            const cuttedPrice = price + parseFloat(faker.commerce.price({ min: 50, max: 500, dec: 0 }));

            products.push({
                name: productName,
                description: faker.commerce.productDescription(),
                highlights: [
                    faker.lorem.sentence(),
                    faker.lorem.sentence(),
                    faker.lorem.sentence(),
                ],
                specifications: [
                    {
                        title: "General",
                        description: faker.lorem.paragraph()
                    },
                    {
                        title: "Display",
                        description: faker.lorem.paragraph()
                    }
                ],
                price: price,
                cuttedPrice: cuttedPrice,
                images: [
                    {
                        public_id: faker.string.alphanumeric(20),
                        url: faker.image.urlLoremFlickr({ category: 'technics' })
                    }
                ],
                brand: {
                    name: faker.company.name(),
                    logo: {
                        public_id: faker.string.alphanumeric(20),
                        url: faker.image.avatar()
                    }
                },
                category: faker.helpers.arrayElement(['Electronics', 'Laptops', 'Mobiles', 'Apparel', 'Footwear', 'Books']),
                stock: faker.number.int({ min: 10, max: 100 }),
                warranty: faker.number.int({ min: 1, max: 3 }),
                user: userId, // Assign the created user's ID
            });
        }

        await Product.insertMany(products);
        console.log('All Products are added.');
        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedData();