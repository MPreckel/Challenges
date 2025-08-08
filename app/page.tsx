"use client"
import { Card } from "@/components/card/Card";
import { Selector } from "@/components/selector/Selector";
import { useGetPokemons } from "@/pokemons/useGetPokemons";
import { useCallback, useEffect, useRef, useState } from "react";
import { SCCardAndImageWrapper, SCCardWrapper, SCMainWrapper, SCSelector, SCSelectorsWrapper } from "./test/page.styles";
import Image from "next/image";

export default function Home() {
  const { 
    detailedPokemons, 
    loading, 
    getPokemones, 
    loadMorePokemons, 
    hasMore 
  } = useGetPokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver>(null);

  // Callback para el último elemento del selector
  const lastPokemonElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePokemons();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMorePokemons]);

  useEffect(() => {
    getPokemones();
  }, [getPokemones]);

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
        data={detailedPokemons.map((pokemon, index) => ({
          value: pokemon.name,
          label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          ref: index === detailedPokemons.length - 1 ? lastPokemonElementRef : null
        }))}
        isLoading={loading}
        hasMore={hasMore}
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
          <SCCardAndImageWrapper>
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
          
        </SCCardAndImageWrapper>
    </SCMainWrapper>
  );
}
