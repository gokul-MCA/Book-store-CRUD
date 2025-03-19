import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoDBURL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;


// mongoose
//   .connect(process.env.mongoDBURL)
//   .then(() => {
//     console.log("App connected to database");
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening to port: ${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });