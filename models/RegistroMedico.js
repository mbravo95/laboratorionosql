import mongoose from "mongoose";

const registroMedicoSchema = mongoose.Schema({
    fechaAlta: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Consulta', 'Examen', 'Internacion'],
        required: true        
    },
    diagnostico: {
        type: String,
        required: true
    },
    medico: {
        type: String,
        required: true
    },
    institucion: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    medicacion: {
        type: String,
        required: false
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente'
    }
});

const RegistroMedico = mongoose.model('RegistroMedico', registroMedicoSchema);

export default RegistroMedico;