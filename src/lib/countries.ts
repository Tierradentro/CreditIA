import type { CountryConfig } from '@/types';

export const COUNTRIES: Record<string, CountryConfig> = {
  ecuador: {
    code: 'ecuador',
    name: 'Ecuador',
    flag: '\uD83C\uDDEA\uD83C\uDDE8',
    currency: 'USD',
    logo: '/logoBG.png',
    logoWidth: 40,
    idLabel: 'Cedula',
    idExample: '0912345678',
    incomeLabel: 'Ingresos mensuales (USD)',
    incomeExamples: ['$4,500', '$3,500', '$6,000', '$2,800'],
    agentName: 'Sofia',
    welcomeMessage: 'Hola! Bienvenido a Banco Guayaquil. Soy Sofia, tu asistente virtual para solicitudes de credito.',
  },
  peru: {
    code: 'peru',
    name: 'Peru',
    flag: '\uD83C\uDDF5\uD83C\uDDEA',
    currency: 'PEN',
    logo: '/logo_bcp.png',
    logoWidth: 48,
    idLabel: 'DNI',
    idExample: '45678912',
    incomeLabel: 'Ingresos mensuales (PEN)',
    incomeExamples: ['S/ 4,500', 'S/ 3,500', 'S/ 6,000', 'S/ 2,800'],
    agentName: 'Lucia',
    welcomeMessage: 'Hola! Bienvenido a BCP. Soy Lucia, tu asistente virtual para solicitudes de credito.',
  },
  colombia: {
    code: 'colombia',
    name: 'Colombia',
    flag: '\uD83C\uDDE8\uD83C\uDDF4',
    currency: 'COP',
    logo: '/logo_avvillas.png',
    logoWidth: 44,
    idLabel: 'Cedula',
    idExample: '1034567890',
    incomeLabel: 'Ingresos mensuales (COP)',
    incomeExamples: ['$ 4.500.000', '$ 3.500.000', '$ 6.000.000', '$ 2.800.000'],
    agentName: 'Valentina',
    welcomeMessage: 'Hola! Bienvenido a Banco AvVillas. Soy Valentina, tu asistente virtual para solicitudes de credito.',
  },
};

export const COUNTRY_LIST = Object.values(COUNTRIES);
