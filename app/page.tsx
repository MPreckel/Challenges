"use client"
import { Card } from "@/components/card/Card";
import { Selector } from "@/components/selector/Selector";
import { useGetPokemons } from "@/pokemons/useGetPokemons";
import { useCallback, useEffect, useRef, useState } from "react";
import { SCCardAndImageWrapper, SCCardWrapper, SCMainWrapper, SCSelector, SCSelectorsWrapper, SCType, SCTypesWrapper } from "./test/page.styles";
import Image from "next/image";
import { PokemonType } from "@/pokemons/pokemonTypes";

export default function Home() {
  const { 
    pokemonList, 
    detailedPokemon, 
    loading, 
    getPokemons, 
    loadMorePokemons, 
    hasMore,
    getPokemonDetails,
    searchPokemon
  } = useGetPokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver>(null);

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
    getPokemons();
  }, [getPokemons]);

  const handlePokemonSelect = (value: string) => {
    setSelectedPokemon(value);
    getPokemonDetails(value);
  };
 
 
  return (
    <SCMainWrapper>
      <SCSelectorsWrapper>
        <SCSelector>
        <Selector
            type="simple"
            onSelect={handlePokemonSelect}
            data={pokemonList.map((pokemon, index) => ({
              value: pokemon.name,
              label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
              ref: index === pokemonList.length - 1 ? lastPokemonElementRef : null
            }))}
            isLoading={loading}
            hasMore={hasMore}
            onSearch={searchPokemon}
          />
        
        </SCSelector>
        <SCSelector>

      {/* <Selector
        type="multiple"
        data={pokemonList.map((pokemon, index) => ({
          value: pokemon.name,
          label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          ref: index === pokemonList.length - 1 ? lastPokemonElementRef : null
        }))}
        isLoading={loading}
        hasMore={hasMore}
        onSelect={handlePokemonSelect}
        label="Selecciona Pokemones"
        /> */}
        </SCSelector>
        </SCSelectorsWrapper>
        <SCCardAndImageWrapper>
        <SCCardWrapper>
        <Card 
          imageUrl={detailedPokemon?.sprites.front_default || null}
          pokemonName={selectedPokemon || detailedPokemon?.name || null} 
          />
        </SCCardWrapper>
          {detailedPokemon && (() => {
            const pokemon = detailedPokemon;
            const types = pokemon?.types || [];
            return (
              <SCTypesWrapper $singleType={types.length === 1}>
                {types.map((type, index) => (
                  <SCType 
                    key={index}
                    type={type.type.name.toLowerCase() as PokemonType}
                  >
                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                  </SCType>
                ))}
              </SCTypesWrapper>
            );
          })()}
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
