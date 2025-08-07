"use client"
import { Card } from "@/components/card/Card";
import { Selector } from "@/components/selector/Selector";
import { useGetPokemons } from "@/pokemons/useGetPokemons";
import { useEffect, useState } from "react";

export default function Home() {
  const { detailedPokemons, loading, getPokemones } = useGetPokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  useEffect(() => {
    getPokemones();
  }, []);

  const handlePokemonSelect = (value: string) => {
    setSelectedPokemon(value);
  };
console.log(selectedPokemon)
  return (
    <div>
      <Selector
        type="simple"
        onSelect={handlePokemonSelect}
        data={detailedPokemons.map((pokemon) => ({
          value: pokemon.name,
          label: pokemon.name,
        }))}
        isLoading={loading}
      />
      <Selector
        type="multiple"
        data={[
          { value: 'Opción 1', label: 'Opción 1' },
          { value: 'Opción 2', label: 'Opción 2' },
          { value: 'Opción 3', label: 'Opción 3' }
        ]}
      />
      {selectedPokemon && (
        <Card 
          imageUrl={detailedPokemons.find(p => p.name === selectedPokemon)?.sprites.front_default || ''} 
        />
      )}
    </div>
  );
}
