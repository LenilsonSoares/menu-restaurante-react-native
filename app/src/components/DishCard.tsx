import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';
import { colors, spacing, typography } from '../theme';

export function DishCard({
  name,
  price,
  description,
  image,
  onPress,
}: {
  name: string;
  price: number;
  description?: string;
  image?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.sm }}>
      <View style={{ width: 72, height: 72, backgroundColor: colors.surfaceMuted, borderRadius: 8, overflow: 'hidden' }}>
        {image ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} /> : null}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[typography.h3, { color: colors.text }]}>{name}</Text>
        {description ? <Text numberOfLines={2} style={[typography.body, { color: colors.textMuted, marginTop: 2 }]}>{description}</Text> : null}
        <Text style={[typography.body, { marginTop: spacing.sm, fontWeight: '700', color: colors.text }]}>{formatCurrency(price)}</Text>
      </View>
    </TouchableOpacity>
  );
}
