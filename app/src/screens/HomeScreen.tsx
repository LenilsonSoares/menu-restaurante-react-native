/**
 * Tela inicial: banner, categorias e destaques.
 * Mostra lista curta de produtos em destaque e atalhos para categorias.
 */
import React, { useMemo } from 'react';
import { View, Text, SectionList, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { categories } from '../data/categories';
import { products, type Product } from '../data/products';
import { CategoryList } from '../components/CategoryList';
import { DishCard } from '../components/DishCard';
import { useCart } from '../state/cart.context';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography, radius } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { add } = useCart();
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  // Seções por categoria: mantém todos os produtos na Home, agrupados
  const sections = useMemo(
    () => {
      return categories
        .map((c) => {
          const items = products.filter((p) => p.categoryId === c.id);
          if (!isWide) {
            return { title: c.name, key: c.id, data: items };
          }
          // Em telas largas: agrupar em linhas de 2 colunas
          const rows: Product[][] = [];
          for (let i = 0; i < items.length; i += 2) {
            rows.push(items.slice(i, i + 2));
          }
          return { title: c.name, key: c.id, data: rows as unknown as Product[] };
        })
        .filter((s) => (s.data as any[]).length > 0);
    },
    [isWide]
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
        sections={sections as any}
        keyExtractor={(item: any, index) => (Array.isArray(item) ? `${item[0]?.id || 'row'}-${index}` : item.id)}
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
        renderItem={({ item }: { item: any }) => {
          if (!isWide) {
            const it: Product = item as Product;
            return (
              <DishCard
                name={it.name}
                price={it.price}
                description={it.description}
                image={it.image}
                onPress={() => navigation.navigate('ProductDetail', { productId: it.id })}
                onAdd={() => add({ productId: it.id, name: it.name, price: it.price, quantity: 1, image: it.image })}
                dotColor={dotByCategory[it.categoryId]}
              />
            );
          }
          const row: Product[] = item as Product[];
          return (
            <View style={{ flexDirection: 'row', gap: spacing.lg }}>
              {[0, 1].map((col) => {
                const it = row[col];
                if (!it) return <View key={`empty-${col}`} style={{ flex: 1 }} />;
                return (
                  <View key={it.id} style={{ flex: 1 }}>
                    <DishCard
                      name={it.name}
                      price={it.price}
                      description={it.description}
                      image={it.image}
                      onPress={() => navigation.navigate('ProductDetail', { productId: it.id })}
                      onAdd={() => add({ productId: it.id, name: it.name, price: it.price, quantity: 1, image: it.image })}
                      dotColor={dotByCategory[it.categoryId]}
                    />
                  </View>
                );
              })}
            </View>
          );
        }}
      />
    </View>
  );
}
