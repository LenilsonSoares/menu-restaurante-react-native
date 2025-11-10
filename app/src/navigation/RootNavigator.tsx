/**
 * Navegação raiz do app (React Navigation - Native Stack).
 * Define as rotas principais e título/ações de cabeçalho.
 */
import React from 'react'; // Necessário para JSX e componentes funcionais
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; // Container raiz e tema da navegação
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Criação do stack navigator nativo
import HomeScreen from '../screens/HomeScreen'; // Tela inicial com categorias/destaques
import CategoryScreen from '../screens/CategoryScreen'; // Lista de produtos por categoria
import ProductDetailScreen from '../screens/ProductDetailScreen'; // Detalhe de um produto
import CartScreen from '../screens/CartScreen'; // Tela do carrinho
import CheckoutScreen from '../screens/CheckoutScreen'; // Fluxo de finalização
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen'; // Confirmação do pedido
import { CartBadge } from '../components/CartBadge'; // Componente de ícone/badge do carrinho para o header

/**
 * Tipagem dos parâmetros de rota.
 */
export type RootStackParamList = { // Tipos dos parâmetros esperados por cada rota do stack
  Home: undefined; // Tela inicial não recebe parâmetros
  Category: { categoryId: string; title: string }; // Categoria requer id e título (mostrado no header)
  ProductDetail: { productId: string }; // Detalhe do produto precisa do id
  Cart: undefined; // Carrinho sem parâmetros
  Checkout: undefined; // Checkout sem parâmetros
  OrderConfirmation: { orderId: string }; // Confirmação exibe id do pedido realizado
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Cria o stack tipado com as rotas definidas acima

/**
 * Tema leve: mantém cores padrão, alterando apenas o background.
 */
const theme = { // Personaliza levemente o tema, mantendo cores padrão e fundo branco
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF', // Garante fundo branco em todas as telas
  },
};

export default function RootNavigator() { // Componente que define a árvore de navegação do app
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home" // Rota: Home
          component={HomeScreen} // Componente associado
          options={({ navigation }: any) => ({ // Opções de header dinâmicas com acesso à navegação
            title: 'Cardápio', // Título do cabeçalho
            headerRight: () => <CartBadge onPress={() => navigation.navigate('Cart')} />, // Ação rápida para acessar o carrinho
          })}
        />
        <Stack.Screen
          name="Category" // Rota: Category
          component={CategoryScreen}
          options={({ route, navigation }: any) => ({ // Recebe route para usar título vindo dos params
            title: route.params.title, // Mostra o título da categoria selecionada
            headerRight: () => <CartBadge onPress={() => navigation.navigate('Cart')} />, // Atalho para carrinho
          })}
        />
        <Stack.Screen
          name="ProductDetail" // Rota: ProductDetail
          component={ProductDetailScreen}
          options={({ navigation }: any) => ({
            title: 'Detalhe do prato', // Título padrão da tela de detalhe
            headerRight: () => <CartBadge onPress={() => navigation.navigate('Cart')} />, // Badge do carrinho
          })}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrinho' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
          options={{ title: 'Pedido confirmado' }} // Tela pós-checkout com confirmação
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
