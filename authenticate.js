const User = require("./models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_PRIVATE_KEY, { expiresIn: 3600 });
};

exports.verifyAdmin = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  await User.findById(payload._id)
    .then(
      (user) => {
        if (user.admin) {
          return next();
        } else {
          let err = new Error(
            "You are not authorized to perform this operation!"
          );
          err.status = 403;
          return next(err);
        }
      },
      (err) => {
        next(err);
      }
    )
    .catch((err) => {
      next(err);
    });
};

exports.verifyAdministrationStaff = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  await User.findById(payload._id)
    .then(
      (user) => {
        if (user.userType === "Administration Staff") {
          return next();
        } else {
          let err = new Error(
            "You are not authorized to perform this operation!"
          );
          err.status = 403;
          return next(err);
        }
      },
      (err) => {
        next(err);
      }
    )
    .catch((err) => {
      next(err);
    });
};

exports.verifyExaminationStaff = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  await User.findById(payload._id)
    .then(
      (user) => {
        if (user.userType === "Examination Staff") {
          return next();
        } else {
          let err = new Error(
            "You are not authorized to perform this operation!"
          );
          err.status = 403;
          return next(err);
        }
      },
      (err) => {
        next(err);
      }
    )
    .catch((err) => {
      next(err);
    });
};
