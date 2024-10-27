
import React, { Suspense, lazy } from 'react';
import { styled } from '@mui/material/styles';

// Importa o ApexCharts dinamicamente usando a função import() do JavaScript
const ApexChart = lazy(() => import('react-apexcharts'));

// Define o componente Chart estilizado usando MUI
export const Chart = styled(({ className, ...props }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ApexChart {...props} className={className} />
  </Suspense>
))(({ theme }) => ({
  // Você pode adicionar estilos personalizados aqui, se necessário
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));