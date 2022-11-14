import { RequestHandler } from 'express';

import { IRequest } from '../libs/types';
import { User } from '../models/User';

/**
 *
 * @route GET /api/v1/users
 * @desc - getuser profile
 * @acces Private
 */
export const profile: RequestHandler = async (req: IRequest, res) => {
  const user = req.user as User;

  const userProfile = await User.find({
    order: {
      createdAt: 'DESC',
    },
    where: {
      id: user.id,
    },
    relations: ['notes_received', 'notes_shared', 'notes'],
  });

  res.json({ success: true, message: 'success', data: userProfile });
};
