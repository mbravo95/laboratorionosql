import mongoose from "mongoose";

const conectarDB = async () => {

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`Mongo db conectado en: ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }

}

export default conectarDB;