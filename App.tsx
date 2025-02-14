// App.tsx
import React from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet } from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

// Replace with your GraphQL endpoint
const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache(),
});

// Define TypeScript types for the query response
type Pokemon = {
  id: string;
  name: string;
  image: string;
};

type GetPokemonsData = {
  pokemons: Pokemon[];
};

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons(first: 10) {
      id
      name
      image
    }
  }
`;

const PokemonList: React.FC = () => {
  // Use the defined types for TypeScript inference
  const { loading, error, data } = useQuery<GetPokemonsData>(GET_POKEMONS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data?.pokemons}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text style={styles.item}>{item.name}</Text>
      )}
    />
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <PokemonList />
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default App;
