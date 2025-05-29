import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
import { useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Registra los componentes necesarios de Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const VentasPorEmpleado = ({ empleados, totales_por_empleado }) => {
  const data = {
    labels: empleados,
    datasets: [
      {
        label: 'Ventas de Empleado (C$)',
        data: totales_por_empleado,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const chartRef = useRef(null);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(0, 81, 81);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Reporte de Ventas por Empleado', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL('image/png', 1.0);

    if (chartImage) {
      doc.addImage(chartImage, 'PNG', 14, 40, 180, 100);
    } else {
      doc.text('No se pudo generar la imagen del gráfico.', 14, 40);
    }

    const columns = ['Empleado', 'Ventas (C$)'];
    const filas = empleados.length > 0 ? empleados.map((empleado, index) => [empleado, totales_por_empleado[index] || 0]) : [];

    autoTable(doc, {
      head: [columns],
      body: filas,
      startY: 150,
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
    });

    const now = new Date();
    const fechaStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    doc.save(`ReporteVentasPorEmpleado_${fechaStr}.pdf`);
  };

  return (
    <Card style={{ height: '100%' }}>
      <Card.Body>
        <Card.Title>Ventas por Empleados</Card.Title>
        <div style={{ height: '300px', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Pie ref={chartRef} data={data} options={options} />
        </div>
        <Button className="btn btn-primary mt-3" onClick={generatePDF}>
            Generar Reporte
          </Button>
      </Card.Body>
    </Card>
  );
};

export default VentasPorEmpleado;