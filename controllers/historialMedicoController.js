import Paciente from "../models/Paciente.js";
import RegistroMedico from "../models/RegistroMedico.js";

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
        res.json({paciente: pacienteGuardado});
    } catch (error) {
        console.log(error);
        const errorResp = new Error('Error interno');
        return res.status(500).json({msg: errorResp.message});
    }
}

const guardarRegistroMedico = async (req, res) => {
    const { cedula_paciente } = req.body;

    const existePaciente = await Paciente.findOne({cedula: cedula_paciente});

    if(!existePaciente){
        const error = new Error('No existe un paciente con la cédula aportada como parámetro');
        return res.status(402).json({msg: error.message});
    }
    const registroMedico = new RegistroMedico(req.body);
    registroMedico.paciente = existePaciente._id;
    try {
        const registroGuardado = await registroMedico.save();
        res.json({registroMedico: registroGuardado})
    } catch (error) {
        console.log(error);
        const errorResp = new Error('Error interno');
        return res.status(500).json({msg: errorResp.message});
    }
}

const consultarHistorialMedico = async (req, res) => {
    const {cedula, pagina, limite} = req.params;
    const existePaciente = await Paciente.findOne({cedula});

    if(!existePaciente){
        const error = new Error('No existe un paciente con la cédula aportada como parámetro');
        return res.status(402).json({msg: error.message});
    }

    const paginaInt = parseInt(pagina);
    const limiteInt = parseInt(limite);
    const salto = (paginaInt - 1) * limiteInt;

    const historialPaciente = await RegistroMedico.find({paciente: existePaciente._id})
        .sort({fechaAlta: -1})
        .skip(salto)
        .limit(limiteInt)
        .select("-_id -__v");
    res.json({historialPaciente, total: historialPaciente.length});
}

const obtenerRegistrosPorCriterio = async (req, res) => {
    const {tipo, diagnostico, medico, institucion} = req.body;
    
    let listadoBusqueda = await RegistroMedico.find()
        .select("-_id -__v");
    
    if(tipo !== ''){
        listadoBusqueda = listadoBusqueda.filter(registro => registro.tipo === tipo);
    }
    if(diagnostico !== ''){
        listadoBusqueda = listadoBusqueda.filter(registro => registro.diagnostico === diagnostico);
    }
    if(medico !== ''){
        listadoBusqueda = listadoBusqueda.filter(registro => registro.medico === medico);
    }
    if(institucion !== ''){
        listadoBusqueda = listadoBusqueda.filter(registro => registro.institucion === institucion);
    }
    res.json({resultado: listadoBusqueda, total: listadoBusqueda.length});
}


export {
    registrarPaciente,
    guardarRegistroMedico,
    consultarHistorialMedico,
    obtenerRegistrosPorCriterio
}
