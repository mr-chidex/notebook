import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/User';
import getToken from '../utils/getToken';

/**
 *s
 * @route POST /api/v1/auth/register
 * @desc - register new user
 * @acces Public
 */
export const registerUser: RequestHandler = async (req, res) => {
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
  res.json({
    success: true,
    message: 'login successful',
    data: 'token',
  });
};
