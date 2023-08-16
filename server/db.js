const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://divyanshu10m:c25kvksit77ugUtv@seven-spices.9s2ed9u.mongodb.net/seven-spices?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useunifiedTopology: true },
    async (err, result) => {
      if (err) console.log("---", err);
      else {
        console.log("dbconnected");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find({}).toArray(function (err, catData) {
            if (err) console.log(data);
            else {
              global.food_items = data;
            //   console.log(global.food_items);
              global.foodCategory = catData;
            //   console.log(global.foodCategory);
            }
          });
          // if(err) console.log(data);
          // else{
          //     global.food_items = data;
          // }
        });
      }
    }
  );
};
module.exports = mongoDB();
