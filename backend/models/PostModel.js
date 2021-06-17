const mongoose = require('mongoose');

const PostSchema= mongoose.Schema({

    title: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true},
    author:{type: String, required: true},
    uploadDate: {type: Date, default: Date.now, required: true}

})

// Exporting the model Posts that will use the schema of PostSchema
module.exports = mongoose.model('Posts', PostSchema);