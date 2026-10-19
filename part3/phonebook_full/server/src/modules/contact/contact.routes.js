import express from 'express'
import contactController from './contact.controller.js';

const router = express.Router();
router.post('/', contactController.createContact)
router.get('/', contactController.getAllContacts)
router.get('/:id', contactController.getContactById)
router.delete('/:id', contactController.deleteContact)

export default router