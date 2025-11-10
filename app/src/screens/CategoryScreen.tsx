/**
 * Tela de listagem por categoria.
 * Recebe `categoryId` via rota e filtra os produtos exibidos.
 */
import React from 'react'; // React para JSX
import { View, FlatList } from 'react-native'; // Layout e lista
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'; // Hooks de rota e navegação
import type { RootStackParamList } from '../navigation/RootNavigator'; // Tipagem das rotas
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipagem de navegação do stack
import { products } from '../data/products'; // Fonte de dados de produtos
import { DishCard } from '../components/DishCard'; // Card de produto
import { colors, spacing } from '../theme'; // Tokens de design
import { useCart } from '../state/cart.context'; // Hook do carrinho para adicionar itens

type CategoryRoute = RouteProp<RootStackParamList, 'Category'>; // Tipo da rota Category (params esperados)

type Nav = NativeStackNavigationProp<RootStackParamList>; // Alias de navegação

export default function CategoryScreen() { // Tela para listar produtos de uma categoria
  const route = useRoute<CategoryRoute>(); // Acesso aos parâmetros da rota
  const navigation = useNavigation<Nav>(); // Controle de navegação
  const { categoryId } = route.params; // Extrai categoryId dos params
  const filtered = products.filter(p => p.categoryId === categoryId); // Filtra produtos pela categoria
  const { add } = useCart(); // Ação para adicionar item ao carrinho
  const dotByCategory: Record<string, string> = { // Mapa de cor por categoria
    burgers: colors.danger,
    pizzas: colors.secondary,
    drinks: colors.primary,
    desserts: colors.success,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}> {/* Container principal */}
      <FlatList
        data={filtered} // Produtos filtrados
        keyExtractor={(item) => item.id} // Usa id do produto como chave
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />} // Espaço entre itens
        renderItem={({ item }) => (
          <DishCard
            name={item.name} // Nome do produto
            price={item.price} // Preço unitário
            description={item.description} // Descrição
            image={item.image} // Imagem
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} // Navega para detalhe
            onAdd={() => add({ productId: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })} // Adiciona 1 unidade ao carrinho
            dotColor={dotByCategory[item.categoryId] ?? colors.success} // Cor indicador da categoria
          />
        )}
      />
    </View>
  );
}
