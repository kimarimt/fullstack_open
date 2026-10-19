import express from 'express'
import contactController from './contactController.js';

const router = express.Router();

router.get('/', contactController.getAllContacts)

export default router