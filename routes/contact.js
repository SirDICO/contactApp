const express = require('express')
const router = express.Router();

const  { getContact, getContacts, createContact, deleteContact, updateContact } = require('../controllers/contact')

router.route('/').post(createContact).get(getContacts)
router.route('/:id').get(getContact).delete(deleteContact).patch(updateContact)


module.exports = router;