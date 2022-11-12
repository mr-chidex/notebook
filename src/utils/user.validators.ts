import Joi from 'joi';
import { User } from '../models/User';

export const ValidateUser = (userData: User) => {
  return Joi.object({
    email: Joi.string().required().email().normalize(),
    password: Joi.string().min(4).trim().required(),
  }).validate(userData);
};

export const ValidateAuth = (userData: User) => {
  return Joi.object({
    email: Joi.string().required().email().normalize(),
  }).validate(userData);
};
