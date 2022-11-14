import expressPromise from 'express-promise-router';
import { createNote, deleteNote, getNote, getNotes, shareNote, updateNote } from '../controllers';

const router = expressPromise();

router.route('/').post(createNote).get(getNotes);
router.route('/:noteId').get(getNote).patch(updateNote).delete(deleteNote);
router.route('/:noteId/share').post(shareNote);

export const noteRoutes = router;
