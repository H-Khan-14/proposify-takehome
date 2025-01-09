import { Router } from 'express';

const router = Router();
const notes: { [id: string]: string } = {};

//Fetch a Note
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ content: notes[id] || '' });
});

// Save or update a note
router.post('/', (req, res) => {
  const { id, content } = req.body;
  notes[id] = content;
  res.status(201).json({ message: 'Note saved', id });
});

export default router;
