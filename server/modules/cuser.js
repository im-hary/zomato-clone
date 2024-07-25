const mongoose = require('mongoose');

const createUserSchema = new mongoose.Schema({
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
});

const createUserModal = mongoose.model('users', createUserSchema);

module.exports = createUserModal;
