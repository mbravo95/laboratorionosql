import request from 'supertest';
import app from '../index.js';


describe('GET /api/consulta/:cedula/:pagina/:limite', function() {
	it('Consultar historial medico paginado', function(done) {
	  request(app)
		.get('/api/consulta/16449135/5/10')
		.expect(200, done);
	});
  });

  describe('GET /api/consulta-cache/:cedula/:pagina/:limite', function() {
    it('Consultar historial medico paginado con cache', function(done) {
      request(app)
      .get('/api/consulta/16449135/5/10')
      .expect(200, done);
    });
    });

  
  describe('POST /api/paciente', function() {
	it('Agregar un paciente', function(done) {
      let paciente = {
        "cedula": "16449135",
        "nombre": "Silvia",
        "apellido": "Sugo",
        "fechaNacimiento": "1959-07-12",
        "sexo": "Femenino"
    }  
	  request(app)
		.post('/api/paciente')
        .send(paciente)
		.expect(401, done);
	});
  });
  
  describe('POST /api/registro-medico', function() {
	it('Agregar un registro medico', function(done) {
      let registroMedico = {
        "fechaAlta": "2024-10-01 14:00:00",
        "tipo": "Examen",
        "diagnostico": "Analisis de Sangre",
        "medico": "Miguel Merentiel",
        "institucion": "Casmu",
        "cedula_paciente": "16449135"
    }  
	  request(app)
		.post('/api/registro-medico')
        .send(registroMedico)
		.expect(200, done);
	});
  });


  describe('GET /api/busqueda', function() {
	it('Obtener registros medicos segun filtros de busqueda', function(done) {
      let criterioBusqueda = {
        "tipo":"", 
        "diagnostico":"", 
        "medico":"", 
        "institucion":"Casmu"
    }  
	  request(app)
		.get('/api/busqueda')
        .send(criterioBusqueda)
		.expect(200, done);
	});
  });
