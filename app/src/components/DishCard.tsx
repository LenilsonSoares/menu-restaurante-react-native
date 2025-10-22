/**
 * Card de prato com imagem, nome, preço e ação opcional de adicionar.
 * - `onPress` abre detalhes (opcional)
 * - `onAdd` adiciona ao carrinho (opcional)
 */
import React, { useState } from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';
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
    <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, position: 'relative', ...shadow.sm }}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#00000010' }}
        style={({ pressed }) => ({ flexDirection: 'row', gap: spacing.md, opacity: pressed ? 0.95 : 1 })}
      >
  <View style={{ width: 96, aspectRatio: 1, backgroundColor: colors.surfaceMuted, borderRadius: radius.lg, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
          {src && !imgError ? (
            <Image
              source={src as any}
              style={{ width: '100%', height: '100%', transform: [{ scale: 1.05 }] }}
              resizeMode="cover"
              onError={(e) => {
                console.warn('Falha ao carregar imagem do prato', e.nativeEvent);
                setImgError(true);
              }}
            />
          ) : (
            <Text style={{ color: colors.textMuted }}>sem imagem</Text>
          )}
          {/* Botão '+' removido daqui para manter posição consistente relativa ao card inteiro */}
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
      </Pressable>
      {onAdd ? (
        <Pressable
          onPress={() => onAdd?.()}
          android_ripple={{ color: '#00000010' }}
          style={({ pressed }) => ({
            position: 'absolute',
            right: spacing.md,
            bottom: spacing.md,
            height: 32,
            width: 44,
            borderRadius: radius.pill,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1,
            zIndex: 2,
            ...shadow.sm,
          })}
          accessibilityRole="button"
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <MaterialCommunityIcons name="plus" size={18} color={colors.text} />
        </Pressable>
      ) : null}
    </View>
  );
}
