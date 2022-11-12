import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/User';
import getToken from '../utils/getToken';
import { ValidateUser } from '../utils/user.validators';
import hashPassword from '../utils/hashPassword';

/**
 *s
 * @route POST /api/v1/auth/register
 * @desc - register new user
 * @acces Public
 */
export const registerUser: RequestHandler = async (req, res) => {
  const { error, value } = ValidateUser(req.body as User);

  if (error)
    return res.status(422).json({
      error: true,
      message: error.details[0].message,
    });

  const { email, password } = value as User;

  //check if email is already in use
  const userExist = await User.findOneBy({ email });
  if (userExist)
    return res.status(400).json({
      error: true,
      message: 'email already in use',
    });

  //hash password
  const hashPass = await hashPassword(password);

  await User.create({
    email,
    password: hashPass,
  }).save();

  res.status(201).json({
    success: true,
    message: 'signup successful',
  });
};

/**
 * @route POST /api/v1/auth/login
 * @desc - signin user with email and password
 * @acces Public
 */
export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body as User;

  //check if user exist
  const user = await User.findOneBy({ email });

  if (!user)
    return res.status(422).json({
      error: true,
      message: 'username or password is incorrect',
    });

  //check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      error: true,
      message: 'email or password is incorrect',
    });

  const token = getToken(user);

  res.json({
    success: true,
    message: 'login successful',
    data: token,
  });
};
