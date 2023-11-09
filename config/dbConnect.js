import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://sunilsahoosks2002:sunil000@cluster0.9afxkke.mongodb.net/ecommerce"
    );

    console.log(`db connected successfully...${conn.connection.host}`);
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};
export default dbConnect;
