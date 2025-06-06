import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
import { useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Registra los componentes necesarios de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const VentasPorMes = ({ meses, totales_por_mes }) => {
  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Ventas (C$)',
        data: totales_por_mes,
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
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Córdobas (C$)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
    },
  };

  const chartRef = useRef(null);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(0, 81, 81);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Reporte de Ventas por Mes', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL('image/png', 1.0);

    if (chartImage) {
      doc.addImage(chartImage, 'PNG', 14, 40, 180, 100);
    } else {
      doc.text('No se pudo generar la imagen del gráfico.', 14, 40);
    }

    const columns = ['Mes', 'Ventas (C$)'];
    const filas = meses.length > 0 ? meses.map((mes, index) => [mes, totales_por_mes[index] || 0]) : [];

    autoTable(doc, {
      head: [columns],
      body: filas,
      startY: 150,
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
    });

    const now = new Date();
    const fechaStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    doc.save(`ReporteVentasPorMes_${fechaStr}.pdf`);
  };

  return (
    <Card style={{ height: '100%' }}>
      <Card.Body>
        <Card.Title>Ventas por mes</Card.Title>
        <div style={{ height: '100%', position: 'relative' }}>
          <Line ref={chartRef} data={data} options={options} />
          <Button className="btn btn-primary mt-3" onClick={generatePDF}>
            Generar Reporte
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorMes;