import expressPromise from 'express-promise-router';
import { createNote, deleteNote, getNote, getNotes, updateNote } from '../controllers';

const router = expressPromise();

router.route('/').post(createNote).get(getNotes);
router.route('/:noteId').get(getNote).patch(updateNote).delete(deleteNote);

export const noteRoutes = router;
