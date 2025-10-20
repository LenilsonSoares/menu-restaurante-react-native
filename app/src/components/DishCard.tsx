import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/formatCurrency';
import { colors, spacing, typography, radius, shadow } from '../theme';

export function DishCard({
  name,
  price,
  description,
  image,
  onPress,
  onAdd,
  dotColor,
}: {
  name: string;
  price: number;
  description?: string;
  image?: string;
  onPress?: () => void;
  onAdd?: () => void;
  dotColor?: string;
}) {
  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.sm }}>
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', gap: spacing.md }}>
        <View style={{ width: 84, height: 84, backgroundColor: colors.surfaceMuted, borderRadius: radius.md, overflow: 'hidden' }}>
          {image ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} /> : null}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            {(
              <View style={{ width: 8, height: 8, borderRadius: radius.pill, backgroundColor: dotColor ?? colors.success }} />
            )}
            <Text style={[typography.h3, { color: colors.text }]}>{name}</Text>
          </View>
          {description ? (
            <Text numberOfLines={2} style={[typography.body, { color: colors.textMuted, marginTop: spacing.xs }]}>
              {description}
            </Text>
          ) : null}
          <Text style={[typography.body, { marginTop: spacing.sm, fontWeight: '700', color: colors.text }]}>
            {formatCurrency(price)}
          </Text>
        </View>
      </TouchableOpacity>
      {onAdd ? (
        <TouchableOpacity
          onPress={onAdd}
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{
            position: 'absolute',
            right: spacing.md,
            bottom: spacing.md,
            width: 36,
            height: 36,
            borderRadius: radius.pill,
            backgroundColor: colors.surfaceMuted,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <MaterialCommunityIcons name="plus" size={22} color={colors.text} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
