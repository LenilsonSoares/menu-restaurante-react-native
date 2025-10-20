import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';

export function Price({ value, style }: { value: number; style?: StyleProp<TextStyle> }) {
  return <Text style={style}>{formatCurrency(value)}</Text>;
}
