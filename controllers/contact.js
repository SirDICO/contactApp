
const Contact = require('../models/Contact')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

//@desc Get all Contact
//@route GET /api/v1/contacts
//access public
const getContacts = async (req, res) =>{
    const contact = await Contact.find({
        createdBy: req.user.userId
    }).sort('createdAt');
    res.status(StatusCodes.OK).json({contact, count: contact.length})
}


//@desc Get single Contact
//@route GET /api/v1/:id
//access public
const getContact = async (req, res) =>{

    const{user: {userId}, params: {id:contactId}} = req
     
     const contact = await Contact.findOne({ _id: contactId, createdBy: userId} )

     if(!contact){
        throw new NotFoundError(`No Such Contact with Id : ${contactId}`)
     }
     
    res.status(StatusCodes.OK).json({contact})
}


//@desc Create  Contact
//@route POST /api/v1/contact
//access public
const createContact = async (req, res) =>{
    req.body.createdBy = req.user.userId
    const contact = await Contact.create(req.body)
    res.status(StatusCodes.CREATED).json({contact})
}


//@desc update single Contact
//@route PATCH /api/v1/:id
//access public
const updateContact =async (req, res) =>{
     const { 
    body: {firstName, lastName, phone, address, employementStatus },
    user: {userId}, 
    params: {id: contactId}} = req

    if(firstName === '' || lastName ==='' || phone ==='' || address ===''){
        throw new BadRequestError('Fields cannot be empty');
    }

    const contact = await Contact.findByIdAndUpdate(
        {_id:contactId,
         createdBy: userId},
         req.body,
         {new:true, runValidators:true}
    )
   if(!contact){
   throw new NotFoundError(`NO Contact with id ${contactId}`);
}

  res.status(StatusCodes.OK).json({ contact})
}

//@desc Delete Contact
//@route DELETE /api/v1/:id
//access public
const deleteContact = async (req, res) =>{
    const {user: {userId}, params: {id: contactId}} = req;

    const contact = await Contact.findOneAndRemove({
        _id:contactId,
        createdBy:userId
    });
    if(!contact){
        throw new NotFoundError(`No Such Contact with Id ${contactId}`)

    }
    res.status(StatusCodes.OK).send();
}


module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}