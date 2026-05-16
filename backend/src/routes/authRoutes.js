const express = require("express");

const jwt = require("jsonwebtoken");

const { jwtSecret } =
  require("../config/env");

const authService =
  require("../services/authService");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getUsersCollection,
} = require("../config/db");

const {
  ObjectId,
} = require("mongodb");



const router = express.Router();




// LOGIN
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;




      if (!email || !password) {

        return res.status(400).json({

          error:
            "Email and password required",

        });
      }




      const result =
        await authService.login(
          email,
          password
        );




      if (!result) {

        return res.status(401).json({

          error:
            "Invalid email or password",

        });
      }




      return res.json({

        success: true,

        token: result.token,

        user: result.user,

      });

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      return res.status(500).json({

        error: "Server error",

      });
    }
  }
);






// SIGNUP
router.post(
  "/signup",
  async (req, res) => {

    try {

      const {
        email,
        password,
        name,
        phone,
      } = req.body;




      if (
        !email ||
        !password ||
        !name ||
        !phone
      ) {

        return res.status(400).json({

          error:
            "All fields required",

        });
      }




      const result =
        await authService.signup({

          email,
          password,
          name,
          phone,

        });




      if (!result) {

        return res.status(400).json({

          error:
            "Email already registered",

        });
      }




      return res.json({

        success: true,

        message:
          "Account created successfully",

        token: result.token,

        user: result.user,

      });

    } catch (error) {

      console.error(
        "Signup error:",
        error
      );

      return res.status(500).json({

        error: "Server error",

      });
    }
  }
);







// GET CURRENT USER
router.get(
  "/me",

  authMiddleware,

  async (req, res) => {

    try {

      const usersCollection =
        getUsersCollection();




      const user =
        await usersCollection.findOne({

          _id: new ObjectId(
            req.user.id
          ),

        });




      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });
      }




      res.json({

        success: true,

        user,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Server Error",

      });
    }
  }
);





module.exports = router;