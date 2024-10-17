import Paciente from "../models/Paciente.js";

const registrarPaciente = async (req, res) => {
    const { cedula } = req.body;

    const existePaciente = await Paciente.findOne({cedula});

    if(existePaciente){
        const error = new Error('El paciente ya existe');
        return res.status(401).json({msg: error.message});
    }

    try {
        const paciente = new Paciente(req.body);
        const pacienteGuardado = await paciente.save();
        res.json(pacienteGuardado);
    } catch (error) {
        console.log(error);
    }

    res.json({msg: "registrarPaciente => Funcion sin implementar"});
}

const guardarRegistroMedico = (req, res) => {
    res.json({msg: "guardarRegistroMedico => Funcion sin implementar"});
}

const consultarHistorialMedico = (req, res) => {
    res.json({msg: "consultarHistorialMedico => Funcion sin implementar"});
}

const obtenerRegistrosPorCriterio = (req, res) => {
    res.json({msg: "obtenerRegistrosPorCriterio => Funcion sin implementar"});
}


export {
    registrarPaciente,
    guardarRegistroMedico,
    consultarHistorialMedico,
    obtenerRegistrosPorCriterio
}
