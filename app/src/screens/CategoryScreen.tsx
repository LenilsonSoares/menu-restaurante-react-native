/**
 * Tela de listagem por categoria.
 * Recebe `categoryId` via rota e filtra os produtos exibidos.
 */
import React from 'react';
import { View, FlatList } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { products } from '../data/products';
import { DishCard } from '../components/DishCard';
import { colors, spacing } from '../theme';
import { useCart } from '../state/cart.context';

type CategoryRoute = RouteProp<RootStackParamList, 'Category'>;

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CategoryScreen() {
  const route = useRoute<CategoryRoute>();
  const navigation = useNavigation<Nav>();
  const { categoryId } = route.params;
  const filtered = products.filter(p => p.categoryId === categoryId);
  const { add } = useCart();
  const dotByCategory: Record<string, string> = {
    burgers: colors.danger,
    pizzas: colors.secondary,
    drinks: colors.primary,
    desserts: colors.success,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        renderItem={({ item }) => (
          <DishCard
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            onAdd={() => add({ productId: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })}
            dotColor={dotByCategory[item.categoryId] ?? colors.success}
          />
        )}
      />
    </View>
  );
}
