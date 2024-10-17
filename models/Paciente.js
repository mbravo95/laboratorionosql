import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    sexo: {
        type: String,
        required: true
    }
});

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;