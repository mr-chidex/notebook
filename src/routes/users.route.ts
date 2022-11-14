import expressPromise from 'express-promise-router';

import { profile } from '../controllers';

const router = expressPromise();

router.route('/').get(profile);

export const userRoutes = router;
