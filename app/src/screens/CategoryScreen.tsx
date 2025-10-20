import React from 'react';
import { View, FlatList } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { products } from '../data/products';
import { DishCard } from '../components/DishCard';
import { colors, spacing } from '../theme';

type CategoryRoute = RouteProp<RootStackParamList, 'Category'>;

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CategoryScreen() {
  const route = useRoute<CategoryRoute>();
  const navigation = useNavigation<Nav>();
  const { categoryId } = route.params;
  const filtered = products.filter(p => p.categoryId === categoryId);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.border }} />}
        renderItem={({ item }) => (
          <DishCard
            name={item.name}
            price={item.price}
            description={item.description}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
      />
    </View>
  );
}
