import Joi from 'joi';
import { Note } from '../models/Note';

export const validateNote = (note: Note) => {
  return Joi.object({
    text: Joi.string().trim().required(),
  }).validate(note);
};
