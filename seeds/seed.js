const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
  
      // Math.random() - 0 to 1 with decimal 0*3 to 1*3 =>0 to 3
      // Math.floor will get rid of decimal, it rounds down
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const posts= await Post.findAll();


  process.exit(0);
};

seedDatabase();
