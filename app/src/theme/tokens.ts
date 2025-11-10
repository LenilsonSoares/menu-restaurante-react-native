/**
 * Tokens diversos: raios de borda e sombras padronizadas.
 */
export const radius = { // Raios de borda padronizados para consistência visual
  xs: 4, // Muito pequeno (chips, pequenos detalhes)
  sm: 6, // Pequeno
  md: 8, // Médio (cards, botões)
  lg: 12, // Grande (containers maiores)
  xl: 16, // Extra grande
  pill: 999, // Pílula totalmente arredondada
};

export const shadow = { // Conjunto de sombras para profundidade em componentes
  // Sombras leves para cards/botões; simplificadas para compatibilidade entre iOS/Android/Web
  sm: {
    shadowColor: '#000', // Cor base
    shadowOpacity: 0.05, // Opacidade reduzida
    shadowRadius: 4, // Dispersão
    shadowOffset: { width: 0, height: 2 }, // Deslocamento vertical leve
    elevation: 2, // Elevação Android
  },
  md: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
};