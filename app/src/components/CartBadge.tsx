import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { colors } from '../theme';
import { useCart } from '../state/cart.context';

export function CartBadge({ onPress }: { onPress: () => void }) {
  const { count } = useCart();
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
      <View style={{ position: 'relative' }}>
        <Text style={{ fontSize: 18 }}>🛒</Text>
        {count > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -6,
              backgroundColor: colors.danger,
              borderRadius: 8,
              paddingHorizontal: 6,
              minWidth: 16,
            }}
          >
            <Text style={{ color: colors.white, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
