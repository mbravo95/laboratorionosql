import express from 'express';
import {registrarPaciente, guardarRegistroMedico, consultarHistorialMedico, obtenerRegistrosPorCriterio} from '../controllers/historialMedicoController.js'

const router = express.Router();

router.post('/paciente', registrarPaciente);
router.post('/registro-medico', guardarRegistroMedico);
router.get('/consulta/:cedula', consultarHistorialMedico);
router.get('/busqueda', obtenerRegistrosPorCriterio);


export default router;