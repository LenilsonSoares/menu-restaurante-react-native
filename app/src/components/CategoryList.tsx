/**
 * Lista horizontal de categorias.
 * Ao tocar em uma categoria, navega para a tela de listagem da categoria.
 */
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { Category } from '../data/categories';
import { colors, spacing, typography, radius } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function CategoryList({ categories }: { categories: Category[] }) {
  const navigation = useNavigation<Nav>();
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Category', { categoryId: item.id, title: item.name })}
          style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, backgroundColor: colors.surfaceMuted, borderRadius: radius.pill, marginRight: spacing.sm }}
        >
          <Text style={[typography.body, { fontWeight: '600', color: colors.text }]}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
