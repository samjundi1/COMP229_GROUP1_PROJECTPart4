const mongoose = require('mongoose');
//Schema for catalogs
const OccasionSchema = new mongoose.Schema({
    occasionId:{
        type:String,
        trim:true,
        unique: true,
        required:'Occasion id is required'
    },
    name:{
        type:String,
        trim:true,
        required:'Name is required'   
    },
    description:{
        type:String,
        trim:true,
        required:"Description is required"
    }
});

  
module.exports = mongoose.model('occasions',OccasionSchema);