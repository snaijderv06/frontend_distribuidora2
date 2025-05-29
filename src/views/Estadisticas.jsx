import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import VentasPorMes from '../components/Graficos/VentasPorMes';
import VentasPorEmpleado from '../components/Graficos/VentasPorEmpleado';
import ChatIA from '../components/Chat/chatIa';

const Estadisticas = () => {
  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [totalVentas, setTotalVentas] = useState([]);
  // Agregar estado para el modal
  const [mostrarChatModal, setMostrarChatModal] = useState(false);


  const cargaVentas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/totalventaspormes');
      const data = await response.json();
      console.log('Datos de ventas por mes:', data);

      if (data.mensaje || !Array.isArray(data) || data.length === 0) {
        console.error(data.mensaje || 'No se encontraron datos de ventas.');
        setMeses([]);
        setTotalesPorMes([]);
        return;
      }

      const mesesNombres = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      setMeses(data.map(item => {
        const mesNum = parseInt(item.mes, 10);
        return isNaN(mesNum) ? item.mes : mesesNombres[mesNum - 1] || `Mes ${item.mes}`;
      }));
      setTotalesPorMes(data.map(item => item.total_ventas));
      
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      alert('Error al cargar ventas: ' + error.message);
    }
  };

  const cargaVentasPorEmpleado = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/totalventasporempleado');
      const data = await response.json();
      console.log('Datos de ventas por empleado:', data);

      if (data.mensaje || !Array.isArray(data) || data.length === 0) {
        console.error(data.mensaje || 'No se encontraron datos de ventas por empleado.');
        setEmpleados([]);
        setTotalVentas([]);
        return;
      }

      setEmpleados(data.map(item => `${item.primer_nombre} ${item.primer_apellido}`));
      setTotalVentas(data.map(item => item.total_ventas));
    } catch (error) {
      console.error('Error al cargar ventas por empleado:', error);
      alert('Error al cargar ventas por empleado: ' + error.message);
    }
  };

  useEffect(() => {
    cargaVentas();
    cargaVentasPorEmpleado();
  }, []);

  return (
    <Container
      className="mt-5"
      style={{
        background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
        minHeight: '80vh',
      }}
    >
      <h4
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#2c3e50',
          textAlign: 'center',
          marginBottom: '40px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        📊 Estadísticas
      </h4>
      <ChatIA mostrarChatModal={mostrarChatModal} setMostrarChatModal={setMostrarChatModal} />
      <Button 
        variant="primary" 
        className="mb-4"
        onClick={() => setMostrarChatModal(true)}
      >
        Consultar con IA
      </Button>

      <Row className="mt-4">
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorEmpleado empleados={empleados} totales_por_empleado={totalVentas} />
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
