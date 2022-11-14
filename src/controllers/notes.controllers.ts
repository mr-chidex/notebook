import { RequestHandler } from 'express';
import { IRequest } from '../libs/types';
import { Note } from '../models/Note';
import { NoteShared } from '../models/NoteShared';
import { User } from '../models/User';
import { validateNote } from '../utils/note.validators';

/**
 *
 * @route POST /api/v1/notes
 * @desc - create  note
 * @acces Private
 */
export const createNote: RequestHandler = async (req: IRequest, res) => {
  const user = req.user as User;

  const { error, value } = validateNote(req.body as Note);

  if (error)
    return res.status(422).json({
      error: true,
      message: error.details[0].message,
    });

  const { text } = value as Note;

  const note = await Note.create({
    text,
    ownerId: user.id,
  }).save();

  res.status(201).json({ success: true, message: 'note successfully created', data: note });
};

/**
 *
 * @route GET /api/v1/notes
 * @desc - get all user notes
 * @acces Private
 */
export const getNotes: RequestHandler = async (req: IRequest, res) => {
  const user = req.user as User;

  const notes = await Note.find({
    order: {
      createdAt: 'DESC',
    },
    where: {
      ownerId: user.id,
    },
  });

  res.json({ success: true, message: 'success', data: notes });
};

/**
 *
 * @route GET /api/v1/notes/:noteId
 * @desc - get a note by user
 * @acces Private
 */
export const getNote: RequestHandler = async (req: IRequest, res) => {
  const user = req.user as User;
  const { noteId } = req.params;

  if (!noteId) return res.status(400).json({ error: true, message: 'invalid note id provided' });

  const note = await Note.findOne({
    where: {
      ownerId: user.id,
      id: noteId,
    },
  });

  res.json({ success: true, message: 'success', data: note });
};

/**
 *
 * @route PATCH /api/v1/notes/:noteId
 * @desc - update note
 * @acces Private
 */
export const updateNote: RequestHandler = async (req: IRequest, res) => {
  const user = req.user as User;
  const noteId = req.params.postId;

  const { error, value } = validateNote(req.body as Note);

  if (error)
    return res.status(422).json({
      error: true,
      message: error.details[0].message,
    });

  const { text } = value as Note;

  const note = await Note.findOne({
    where: {
      id: noteId,
      ownerId: user.id,
    },
  });

  if (!note) return res.status(404).json({ error: true, message: 'note does not exist' });

  note.text = text;

  await note.save();

  res.json({ success: true, message: 'note successfully updated', data: note });
};

/**
 *
 * @route DELETE /api/v1/notes/:noteId
 * @desc - delete note
 * @acces Private
 */
export const deleteNote: RequestHandler = async (req: IRequest, res) => {
  const { noteId } = req.params;
  const user = req.user as User;

  const note = await Note.findOne({
    where: {
      id: noteId,
      ownerId: user.id,
    },
  });

  if (!note) return res.status(404).json({ error: true, message: 'note does not exist' });

  await note.remove();

  res.json({ success: true, message: 'note successfully deleted' });
};

/**
 *
 * @route POST /api/v1/notes/:noteId/share
 * @desc - share note to another user
 * @acces Private
 */
export const shareNote: RequestHandler = async (req: IRequest, res) => {
  const { noteId } = req.params;
  const user = req.user as User;
  const { receiverId } = req.body;

  if (!receiverId) return res.status(400).json({ error: true, message: 'Receiver id is not provided' });

  if (receiverId === user.id) return res.status(400).json({ error: true, message: 'cannot share note to yourself.' });

  // check if note of user is available
  const isNote = await Note.findOne({
    where: { id: noteId, ownerId: user.id },
  });
  if (!isNote) return res.status(404).json({ error: true, message: 'this note does not exist' });

  //check if receiver is a user
  const isExist = await User.findOne({
    where: { id: receiverId },
    relations: ['notes_received'],
  });
  if (!isExist) return res.status(400).json({ error: true, message: 'targeted receiver is not a user' });

  // check if you already sent note to receiver
  const alreadyShared = isExist.notes_received.find((noteShared) => noteShared.noteId === noteId);
  if (alreadyShared) return res.status(400).json({ error: true, message: 'note already shared to this user' });

  //share note
  const noteShared = await NoteShared.create({
    ownerId: user.id,
    receiverId,
    noteId,
  }).save();

  res.json({ success: true, message: 'note successfully shared', data: noteShared });
};
