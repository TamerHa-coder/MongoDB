const mongoose = require('mongoose');

const TutorialSchema = mongoose.Schema({
    title: String,
    content: String,
    published: Boolean,
});



module.exports = mongoose.model('Tutorial', TutorialSchema);

