const { User } = require("../models");
// const User = Model.User;
const { checkPassword } = require("../helpers/bcrypt.js");
const { generateToken } = require("../helpers/jwt.js");

class UserController {
  static async register(req, res, next) {
    // console.log(User, "ini user");
    // console.log("masuk");
    const { email, password, username } = req.body;
    // console.log(req.body);
    try {
      const Users = await User.create({
        email,
        password,
        username,
      });
    //   console.log(Users instanceof User);
    //   console.log(Users, "=====");
    if(Users) {
        console.log(Users, 'ini USERS')
        let token = generateToken({
            id: Users.id,
            email: Users.email,
          });
          res.status(200).json({
            user: Users,
            token
          });
    }
    } catch (error) {
      console.log(error);
      next(error)
    }
    // User.create({ email, password, username })
    //   .then((user) => {
    //       console.log(user, 'ini ini ini')
    //     res.status(200).json({
    //       id: user.id,
    //       email: user.email,
    //       password: user.password,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  static Login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (user) {
          let compare = checkPassword(password, user.password);
          if (compare) {
            let token = generateToken({
              id: user.id,
              email: user.email,
            });
            res.status(200).json({
              id: user.id,
              username: user.username,
              email: user.email,
              money: user.money,
              token,
            });
          } else {
            throw {
              message: "email or password wrong",
              code: 401,
            };
          }
        } else {
          throw {
            message: "Email not found",
            code: 404,
          };
        }
      })
      .catch((error) => {
        return next(error);
      });
  }

  static async updateUser(req, res, next) {
      console.log('masuk topup')
        const { money } = req.body;
        let id = req.UserId;
        console.log(id, "id user");
        try {
          const user = await User.findByPk(id);
          console.log(user, "ini user");
          if (user) {
            const updateUser = await user.increment("money", {
              by: money,
              where: { id },
            });
            console.log(updateUser.money, "ini updateUser dalem");
            res.status(201).json({
              user: updateUser,
            });
          } else {
              throw {
                  message: "User not Found",
                  code: 404
              }
          }
        } catch (error) {
            console.log('masuk error topup', error)
          return next(error);
        }
      }
}

module.exports = UserController;
