import express from 'express';
import * as diaryController from '../controller/diary.js';

const router = express.Router();

// GET /diary or /diary?nickname:nickname
router.get('/', diaryController.get);

// GET /diary/:id
router.get('/:id', diaryController.getById);

// POST /diary
router.post('/', diaryController.create);

// PUT /diary/:id
router.put('/:id', diaryController.modify);

// DELETE /diary/:id
router.delete('/:id', diaryController.remove);
export default router;
