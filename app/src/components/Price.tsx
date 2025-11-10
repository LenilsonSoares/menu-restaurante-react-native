/**
 * Exibe um valor monetário formatado (BRL) com estilo opcional.
 */
import React from 'react'; // React para componente funcional
import { Text, StyleProp, TextStyle } from 'react-native'; // Text para exibição e tipos de estilo
import { formatCurrency } from '../utils/formatCurrency'; // Utilitário de formatação BRL

export function Price({ value, style }: { value: number; style?: StyleProp<TextStyle> }) { // Componente simples que formata valor
  return <Text style={style}>{formatCurrency(value)}</Text>; // Renderiza texto formatado com estilo opcional
}
