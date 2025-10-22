/**
 * Escala de espaçamento em pontos (dp) com leve responsividade.
 */
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
let scale = 1;
if (width < 360) scale = 0.95;
else if (width > 480 && width < 768) scale = 1.05;
else if (width >= 768) scale = 1.15;

const sp = (n: number) => Math.round(n * scale);

export const spacing = {
  xs: sp(4),
  sm: sp(8),
  md: sp(12),
  lg: sp(16),
  xl: sp(24),
  xxl: sp(32),
};
