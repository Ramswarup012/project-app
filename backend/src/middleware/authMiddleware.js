const jwt = require("jsonwebtoken");

const authMiddleware =
  async (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization;

      console.log(
        "AUTH HEADER = ",
        authHeader
      );





      if (!authHeader) {

        return res.status(401).json({

          success: false,

          message:
            "No token provided",

        });

      }






      const token =
        authHeader.split(" ")[1];

      console.log(
        "TOKEN = ",
        token
      );






      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET

        );






      console.log(
        "DECODED = ",
        decoded
      );






      req.user = decoded;

      next();

    } catch (error) {

      console.log(
        "AUTH ERROR = ",
        error
      );

      res.status(401).json({

        success: false,

        message: "Unauthorized",

      });

    }

  };

module.exports =
  authMiddleware;