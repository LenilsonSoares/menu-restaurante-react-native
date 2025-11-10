/**
 * Tela inicial: banner, categorias e destaques.
 * Mostra lista curta de produtos em destaque e atalhos para categorias.
 */
import React, { useMemo } from 'react'; // React e hook useMemo para memorizar seções
import { View, Text, SectionList, useWindowDimensions } from 'react-native'; // Componentes e hook para medir largura da janela
import { useNavigation } from '@react-navigation/native'; // Hook de navegação
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipagem da navegação
import { categories } from '../data/categories'; // Dados estáticos de categorias
import { products, type Product } from '../data/products'; // Dados de produtos e tipo Product
import { CategoryList } from '../components/CategoryList'; // Abas de categorias
import { DishCard } from '../components/DishCard'; // Card de prato/produto
import { useCart } from '../state/cart.context'; // Hook do carrinho para adicionar itens
import type { RootStackParamList } from '../navigation/RootNavigator'; // Tipos das rotas
import { colors, spacing, typography, radius } from '../theme'; // Tokens de design

type Nav = NativeStackNavigationProp<RootStackParamList>; // Alias para simplificar tipagem do useNavigation

export default function HomeScreen() { // Componente da tela inicial
  const navigation = useNavigation<Nav>(); // Acesso à navegação do stack
  const { add } = useCart(); // Ação para adicionar item ao carrinho
  const { width } = useWindowDimensions(); // Obtém largura da janela para layout responsivo
  const isWide = width >= 600; // Considera 'wide' quando largura >= 600 (duas colunas)

  // Seções por categoria: mantém todos os produtos na Home, agrupados
  const sections = useMemo( // Memoiza as seções para evitar recomputar a cada render
    () => {
      return categories
        .map((c) => { // Para cada categoria, cria uma seção
          const items = products.filter((p) => p.categoryId === c.id); // Filtra produtos da categoria
          if (!isWide) {
            return { title: c.name, key: c.id, data: items }; // Em telas estreitas, lista simples
          }
          // Em telas largas: agrupar em linhas de 2 colunas
          const rows: Product[][] = [];
          for (let i = 0; i < items.length; i += 2) {
            rows.push(items.slice(i, i + 2)); // Cria grupos de 2 produtos por linha
          }
          return { title: c.name, key: c.id, data: rows as unknown as Product[] }; // Faz cast para satisfazer SectionList
        })
        .filter((s) => (s.data as any[]).length > 0); // Remove seções vazias
    },
    [isWide] // Recalcula apenas quando o layout muda
  );

  const dotByCategory: Record<string, string> = { // Mapa categoria -> cor do indicador
    burgers: colors.danger,
    pizzas: colors.secondary,
    drinks: colors.primary,
    desserts: colors.success,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}> {/* Container principal da tela */}
      {/* Conteúdo rolável */}
      <SectionList
        sections={sections as any} // Seções definidas acima
        keyExtractor={(item: any, index) => (Array.isArray(item) ? `${item[0]?.id || 'row'}-${index}` : item.id)} // Chave para cada item/linha
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg }} // Espaçamento do conteúdo
        ListHeaderComponent={ // Cabeçalho com banner e lista de categorias
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
            <View
              style={{
                backgroundColor: colors.primaryDark,
                borderRadius: radius.pill,
                paddingVertical: spacing.xs,
                paddingHorizontal: spacing.sm,
                marginBottom: spacing.md,
              }}
            >
              <CategoryList categories={categories} /> {/* Renderiza a lista de categorias como atalhos */}
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => ( // Cabeçalho de cada seção com título da categoria
          <Text style={[typography.h3, { color: colors.text, marginTop: spacing.sm, marginBottom: spacing.sm }]}>
            {section.title}
          </Text>
        )}
        SectionSeparatorComponent={() => <View style={{ height: spacing.md }} />} // Espaço entre seções
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />} // Espaço entre itens
        renderItem={({ item }: { item: any }) => { // Renderização do item depende do layout (estreito/largo)
          if (!isWide) {
            const it: Product = item as Product;
            return (
              <DishCard
                name={it.name}
                price={it.price}
                description={it.description}
                image={it.image}
                onPress={() => navigation.navigate('ProductDetail', { productId: it.id })} // Abre detalhe do produto
                onAdd={() => add({ productId: it.id, name: it.name, price: it.price, quantity: 1, image: it.image })} // Adiciona 1 ao carrinho
                dotColor={dotByCategory[it.categoryId]} // Cor do indicador por categoria
              />
            );
          }
          const row: Product[] = item as Product[];
          return (
            <View style={{ flexDirection: 'row', gap: spacing.lg }}> {/* Linha com 2 colunas em telas largas */}
              {[0, 1].map((col) => {
                const it = row[col];
                if (!it) return <View key={`empty-${col}`} style={{ flex: 1 }} />; // Preenche coluna vazia para manter layout
                return (
                  <View key={it.id} style={{ flex: 1 }}>
                    <DishCard
                      name={it.name}
                      price={it.price}
                      description={it.description}
                      image={it.image}
                      onPress={() => navigation.navigate('ProductDetail', { productId: it.id })} // Abrir detalhe
                      onAdd={() => add({ productId: it.id, name: it.name, price: it.price, quantity: 1, image: it.image })} // Adicionar ao carrinho
                      dotColor={dotByCategory[it.categoryId]} // Cor do ponto
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
