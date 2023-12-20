import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// Create a new user or get all users
router.route('/')
  .get(async (req, res) => {
    try {
      // Automatically create a new user with random data
      const newUser = new User({
        name: 'fan Doe',
        email: 'fan.doe@example.com',
        age: 25,
      });
      await newUser.save();

      // Retrieve all users
      const users = await User.find();
      console.log(users)
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      // Create a new user based on the request body
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  export default router;
