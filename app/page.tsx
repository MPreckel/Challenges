"use client"
import { Card } from "@/components/card/Card";
import { Selector } from "@/components/selector/Selector";
import { useGetPokemons } from "@/pokemons/useGetPokemons";
import { useEffect, useState } from "react";
import { SCCardWrapper, SCMainWrapper, SCSelector, SCSelectorsWrapper } from "./test/page.styles";
import Image from "next/image";

export default function Home() {
  const { detailedPokemons, loading, getPokemones } = useGetPokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  useEffect(() => {
    getPokemones();
  }, []);

  const handlePokemonSelect = (value: string) => {
    setSelectedPokemon(value);
  };
 
  return (
    <SCMainWrapper>
      <SCSelectorsWrapper>
        <SCSelector>
      <Selector
        type="simple"
        onSelect={handlePokemonSelect}
        data={detailedPokemons.map((pokemon) => ({
          value: pokemon.name,
          label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        }))}
        isLoading={loading}
        />
        
        </SCSelector>
        <SCSelector>

      <Selector
        type="multiple"
        data={[
          { value: 'Opción 1', label: 'Opción 1' },
          { value: 'Opción 2', label: 'Opción 2' },
          { value: 'Opción 3', label: 'Opción 3' }
        ]}
        />
        </SCSelector>
        </SCSelectorsWrapper>

        <SCCardWrapper>
        <Card 
          imageUrl={detailedPokemons.find(p => p.name === selectedPokemon)?.sprites.front_default || null}
          pokemonName={selectedPokemon || null} 
        />
        </SCCardWrapper>
        <Image
        onError={() => {console.log('Error al cargar la imagen')}} 
        src="/pokedex.png" 
        alt="Pokedex" 
        width={700}
        height={700}
        />

    </SCMainWrapper>
  );
}
