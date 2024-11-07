import redis from 'redis';
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


const consultarHistorialMedicoConCache = async (req, res) => {
    const {cedula, pagina, limite} = req.params;
    const existePaciente = await Paciente.findOne({cedula});

    if(!existePaciente){
        const error = new Error('No existe un paciente con la cédula aportada como parámetro');
        return res.status(402).json({msg: error.message});
    }

    const keyPaciente = cedula + '-' + pagina + '-' + limite;

    // Conecto al Redis
    const redisClient = redis.createClient({ url: process.env.REDIS_URL });
    redisClient.connect()
        .then(() => console.log("Conectado al redis"))
        .catch((err) => console.log("Error al conectarme al redis ", err));

    // Consulto en el cache si existe el registro
    const getResultRedis = await redisClient.get(keyPaciente);
    if (getResultRedis) {
      console.log('Respondiendo desde el cache');
      const historialPaciente = JSON.parse(getResultRedis);
      return res.json({ historialPaciente, total: historialPaciente.length});
    }

    // Si no existe en el cache voy al mongoDB
    const paginaInt = parseInt(pagina);
    const limiteInt = parseInt(limite);
    const salto = (paginaInt - 1) * limiteInt;

    const historialPaciente = await RegistroMedico.find({paciente: existePaciente._id})
        .sort({fechaAlta: -1})
        .skip(salto)
        .limit(limiteInt)
        .select("-_id -__v");
    
    // Guardo en cache
    const saveResultRedis = await redisClient.set(keyPaciente, JSON.stringify(historialPaciente));
    console.log('Cacheando nueva busqueda ', saveResultRedis);

    res.json({historialPaciente, total: historialPaciente.length});
}

const obtenerRegistrosPorCriterio = async (req, res) => {
    const {tipo, diagnostico, medico, institucion} = req.body;

    const query = {};

    if(tipo !== ''){
        query.tipo = tipo;
    }
    if(diagnostico !== ''){
        query.diagnostico = diagnostico;
    }
    if(medico !== ''){
        query.medico = medico;
    }
    if(institucion !== ''){
        query.institucion = institucion;
    }

    let listadoBusqueda = await RegistroMedico.find(query)
        .select("-_id -__v");
    res.json({resultado: listadoBusqueda, total: listadoBusqueda.length});
}


export {
    registrarPaciente,
    guardarRegistroMedico,
    consultarHistorialMedico,
    obtenerRegistrosPorCriterio,
    consultarHistorialMedicoConCache
}
