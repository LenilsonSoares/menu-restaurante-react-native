import React from 'react';
import { View, Text } from 'react-native';
import { categories } from '../data/categories';
import { CategoryList } from '../components/CategoryList';
import { colors, spacing, typography } from '../theme';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.xl }}>
      <Text style={[typography.h1, { color: colors.text, marginBottom: spacing.lg }]}>Categorias</Text>
      <CategoryList categories={categories} />
    </View>
  );
}
