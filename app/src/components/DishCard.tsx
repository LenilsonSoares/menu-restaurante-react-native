import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';
import { colors, spacing, typography, radius, shadow } from '../theme';

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
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md }}>
      <View style={{ width: 84, height: 84, backgroundColor: colors.surfaceMuted, borderRadius: radius.md, overflow: 'hidden', ...shadow.sm }}>
        {image ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} /> : null}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[typography.h3, { color: colors.text }]}>{name}</Text>
        {description ? <Text numberOfLines={2} style={[typography.body, { color: colors.textMuted, marginTop: spacing.xs }]}>{description}</Text> : null}
        <Text style={[typography.body, { marginTop: spacing.sm, fontWeight: '700', color: colors.text }]}>{formatCurrency(price)}</Text>
      </View>
    </TouchableOpacity>
  );
}
