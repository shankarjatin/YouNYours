const mongoose = require("mongoose");
const schema = mongoose.Schema;
// const bcrypt =require("bcrypt");

const userSchema = new schema({
    name:{
        type:String
        
    },
    prio1:{
        type:String
        
    },
    prio2:{
        type:String
        
    },
    email:{
        type:String
    }
    
      
   
    // name:{
    //     type:String,
    //     required:true
    // },
   

  
});


// userSchema.pre('save', async function (next){
//     try{
//         const salt = await bcrypt.genSalt(5);
//         const hashedPassword =await bcrypt.hash(this.password , salt)
//         this.password =hashedPassword
//         next()
//     }
//     catch(error){
//         next (error)
//     }
// })

const Userinfo = new mongoose.model('Userinfo', userSchema);

module.exports = Userinfo;




// ("Regi",User_info);