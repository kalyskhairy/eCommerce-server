"use strict";
const { generatePassword } = require("../helpers/bcrypt.js");
const Admin = require("../admin.json").map((admin) => {
  admin.createdAt = new Date();
  admin.updatedAt = new Date();
  admin.password = generatePassword(admin.password);
  return admin;
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", Admin, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
