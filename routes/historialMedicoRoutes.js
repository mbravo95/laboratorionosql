import express from 'express';
import {registrarPaciente, guardarRegistroMedico, consultarHistorialMedico, obtenerRegistrosPorCriterio, consultarHistorialMedicoConCache} from '../controllers/historialMedicoController.js'

const router = express.Router();

router.post('/paciente', registrarPaciente);
router.post('/registro-medico', guardarRegistroMedico);
router.get('/consulta/:cedula/:pagina/:limite', consultarHistorialMedico);
router.get('/busqueda', obtenerRegistrosPorCriterio);
router.get('/consulta-cache/:cedula/:pagina/:limite', consultarHistorialMedicoConCache);

export default router;