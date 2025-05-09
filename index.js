import express from 'express';
import dotenv from 'dotenv';
import historialMedicoRoutes from './routes/historialMedicoRoutes.js';
import conectarDB from './config/db.js';


const app = express();

app.use(express.json());

dotenv.config();

conectarDB()

app.use('/api', historialMedicoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});

export default app;