/**
 * Escala de espaçamento em pontos (dp) com leve responsividade.
 */
import { Dimensions } from 'react-native'; // Para obter largura da janela e ajustar escala

const { width } = Dimensions.get('window'); // Largura atual da tela
let scale = 1; // Fator base
if (width < 360) scale = 0.95; // Telas muito estreitas: reduz levemente o espaçamento
else if (width > 480 && width < 768) scale = 1.05; // Médias/grandes: aumenta um pouco
else if (width >= 768) scale = 1.15; // Tablet e acima: espaçamento mais generoso

const sp = (n: number) => Math.round(n * scale); // Função de escala arredondada

export const spacing = { // Escala de espaçamento usada em paddings/margens
  xs: sp(4), // extra pequeno
  sm: sp(8), // pequeno
  md: sp(12), // médio
  lg: sp(16), // grande
  xl: sp(24), // extra grande
  xxl: sp(32), // 2x extra grande
};
