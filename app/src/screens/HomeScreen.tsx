/**
 * Tela inicial: banner, categorias e destaques.
 * Mostra lista curta de produtos em destaque e atalhos para categorias.
 */
import React, { useMemo } from 'react';
import { View, Text, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { CategoryList } from '../components/CategoryList';
import { DishCard } from '../components/DishCard';
import { useCart } from '../state/cart.context';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography, radius } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { add } = useCart();

  // Seções por categoria: mantém todos os produtos na Home, agrupados
  const sections = useMemo(
    () =>
      categories
        .map((c) => ({
          title: c.name,
          key: c.id,
          data: products.filter((p) => p.categoryId === c.id),
        }))
        .filter((s) => s.data.length > 0),
    []
  );

  const dotByCategory: Record<string, string> = {
    burgers: colors.danger,
    pizzas: colors.secondary,
    drinks: colors.primary,
    desserts: colors.success,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Conteúdo rolável */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg }}
        ListHeaderComponent={
          <View>
            {/* Banner/Logo */}
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: radius.lg,
                paddingVertical: spacing.xl,
                alignItems: 'center',
                marginBottom: spacing.lg,
              }}
            >
              <Text style={[typography.h1, { color: colors.text, textAlign: 'center' }]}>Tempero</Text>
              <Text style={[typography.h2, { color: colors.success, fontStyle: 'italic' }]}>da Itália</Text>
            </View>

            {/* Abas de categorias */}
            <View style={{ backgroundColor: colors.primaryDark, borderRadius: radius.pill, padding: spacing.xs, marginBottom: spacing.md }}>
              <CategoryList categories={categories} />
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={[typography.h3, { color: colors.text, marginTop: spacing.sm, marginBottom: spacing.sm }]}>
            {section.title}
          </Text>
        )}
        SectionSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        renderItem={({ item }) => (
          <DishCard
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            onAdd={() => add({ productId: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })}
            dotColor={dotByCategory[item.categoryId]}
          />
        )}
      />
    </View>
  );
}
