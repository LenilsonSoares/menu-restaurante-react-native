/**
 * Card de prato com imagem, nome, preço e ação opcional de adicionar.
 * - `onPress` abre detalhes (opcional)
 * - `onAdd` adiciona ao carrinho (opcional)
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
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
  /**
   * Aceita tanto uma URL (string) quanto um asset local (ImageSourcePropType).
   * No Expo Web, `require('...')` pode retornar um objeto; por isso aceitamos ImageSourcePropType.
   */
  image?: string | ImageSourcePropType;
  onPress?: () => void;
  onAdd?: () => void;
  dotColor?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const src = image
    ? typeof image === 'string'
      ? { uri: image }
      : (image as ImageSourcePropType)
    : undefined;

  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.sm }}>
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', gap: spacing.md }}>
        <View style={{ width: 92, height: 92, backgroundColor: colors.surfaceMuted, borderRadius: radius.lg, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
          {src && !imgError ? (
            <Image
              source={src as any}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
              onError={(e) => {
                console.warn('Falha ao carregar imagem do prato', e.nativeEvent);
                setImgError(true);
              }}
            />
          ) : (
            <Text style={{ color: colors.textMuted }}>sem imagem</Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            {
              (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    backgroundColor: dotColor ?? colors.success,
                  }}
                />
              )
            }
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
            height: 30,
            minWidth: 44,
            paddingHorizontal: spacing.sm,
            borderRadius: radius.pill,
            backgroundColor: colors.surfaceMuted,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            ...shadow.sm,
          }}
        >
          <MaterialCommunityIcons name="plus" size={20} color={colors.text} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
