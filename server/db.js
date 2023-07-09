const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Foodking:Foodking@cluster0.jwrfnur.mongodb.net/Foodking?retryWrites=true&w=majority';


const mongoDB = async()=>{
    await mongoose.connect(mongoURI , async(err, result)=>{
       if(err) console.log("-----", err)
       else{
        console.log("Connected to database ");
        const fetched_data = await mongoose.connection.db.collection("fooditem_2");
        fetched_data.find({}).toArray( async function (err , data) {
            const food_item = await mongoose.connection.db.collection("food_item");
            food_item.find({}).toArray( function (err , catdata){
                 if(err) console.log("-----", err);
                 else{
                   global.fooditem_2 = data;
                   global.food_item = catdata;
                 }
            } )
            // if(err) console.log("-----", err);
            // else{
            //     global.fooditem_2 = data;
                
            // }

        })

       }
    });
}



module.exports = mongoDB;

//mongodb is schema less but mongoose have schema 
// CRUD : create update read delete
// mongoose model is wrapper of mongoose schema 

