const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (request, response) => {
  const { name, username, email, password } = request.body;
  if (!username || !email || !password) {
    response.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    response.status(400);
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    response.status(200).json({message:"Registered Successfully!",_id: user.id, email: user.email });
  } else {
    response.status(400);
    throw new Error("User data is not valid");
  }
  response.json({ message: "Register the user" });
});


const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400);
    throw new Error("All fields are mandatory!");
  }

  let user;
  if (/^@/.test(email)) {
    user = await User.findOne({ username: email });
  } else if (email != /^@/.test(email) ) {
    user = await User.findOne({ email });
  } else {
    response.status(401);
    throw new Error("Invalid username or password");
  }

  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "10080m" }
    );
    response.status(200).json({ accessToken, message: "Login Successfully!" });
  } else {
    response.status(401);
    throw new Error("Invalid email or password");
  }
});


const currentUser = asyncHandler(async (request, response) => {
  response.json(request.user);
});

module.exports = { registerUser, loginUser, currentUser };
