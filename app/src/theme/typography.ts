/**
 * Estilos tipográficos básicos para títulos/corpo/legenda com escala responsiva.
 */
import { Dimensions } from 'react-native'; // Para obter largura da tela e ajustar escala de fonte

const { width } = Dimensions.get('window'); // Largura atual do dispositivo

// Fator de escala simples baseado na largura da tela
// - Telas muito estreitas (<360): -5%
// - Médio (360–480): base
// - Largas (>480): +10%
// - Tablet-ish (>=768): +20%
let scale = 1; // Fator inicial de escala tipográfica
if (width < 360) scale = 0.95; // Telas pequenas: reduz um pouco tamanhos
else if (width > 480 && width < 768) scale = 1.1; // Largura média/grande: aumenta tamanhos
else if (width >= 768) scale = 1.2; // Tablet e maiores: tipografia mais destacada

const fs = (n: number) => Math.round(n * scale); // Aplica escala e arredonda

export const typography = { // Conjunto de estilos de texto reutilizáveis
  h1: { fontSize: fs(24), fontWeight: '700' as const }, // Título principal
  h2: { fontSize: fs(20), fontWeight: '700' as const }, // Subtítulo
  h3: { fontSize: fs(18), fontWeight: '600' as const }, // Cabeçalho de seção
  body: { fontSize: fs(16), fontWeight: '400' as const }, // Texto padrão
  caption: { fontSize: fs(12), fontWeight: '400' as const }, // Texto auxiliar/legenda
};
