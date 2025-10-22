/**
 * Estilos tipográficos básicos para títulos/corpo/legenda com escala responsiva.
 */
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Fator de escala simples baseado na largura da tela
// - Telas muito estreitas (<360): -5%
// - Médio (360–480): base
// - Largas (>480): +10%
// - Tablet-ish (>=768): +20%
let scale = 1;
if (width < 360) scale = 0.95;
else if (width > 480 && width < 768) scale = 1.1;
else if (width >= 768) scale = 1.2;

const fs = (n: number) => Math.round(n * scale);

export const typography = {
  h1: { fontSize: fs(24), fontWeight: '700' as const },
  h2: { fontSize: fs(20), fontWeight: '700' as const },
  h3: { fontSize: fs(18), fontWeight: '600' as const },
  body: { fontSize: fs(16), fontWeight: '400' as const },
  caption: { fontSize: fs(12), fontWeight: '400' as const },
};
