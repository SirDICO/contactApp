# contactApps

A simple contact manager API performing basic crude operationS. the application include a well crafted JWT authentication 

*******************************************************************************************
//REGISTER NEW USER
//METHOD: POST
localhost:3005/api/v1/auth/register
params: username, email, password

//LOGIN USER
//METHOD: POST
localhost:3005/api/v1/auth/login
param: email, password
*********************************************************************************************
//GET  
//get all CONTACT
localhost:3005/api/v1/contact

//GET  
//get single CONTACTS
localhost:3005/api/v1/contact/:id

//POST
//CREATE CONTACT
localhost:3005/api/v1/contact
params: firstName,lastName,phone,address,employmentStatus:enum: ['employed', 'unemployed', 'undisclosed']

//METHOD: PATCH
//UPDATE CONTACT
localhost:3005/api/v1/contact/:id
params: firstName,lastName,phone,address,employmentStatus:enum: ['employed', 'unemployed', 'undisclosed']

//METHOD: DELETE
//UPDATE CONTACT
localhost:3005/api/v1/contact/:id




