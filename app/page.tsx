"use client";
import { Card } from "@/components/card/Card";
import { Selector } from "@/components/selector/Selector";
import { useGetPokemons } from "@/pokemons/useGetPokemons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SCCardAndImageWrapper,
  SCCardWrapper,
  SCMainWrapper,
  SCSelector,
  SCSelectorsWrapper,
  SCType,
  SCTypesWrapper,
} from "./test/page.styles";
import Image from "next/image";
import { PokemonType } from "@/pokemons/pokemonTypes";
import { usePage } from "./usePage";

export default function Home() {
  const {
    pokemonList,
    detailedPokemon,
    loading,
    hasMore,
    searchPokemon,
    selectedPokemon,
    handlePokemonSelect,
    lastPokemonElementRef,
  } = usePage();

  return (
    <SCMainWrapper>
      <SCSelectorsWrapper>
        <SCSelector>
          <Selector
            type="simple"
            onSelect={handlePokemonSelect}
            data={pokemonList.map((pokemon, index) => ({
              value: pokemon.name,
              label:
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) ||
                detailedPokemon?.name,
              ref:
                index === pokemonList.length - 1 ? lastPokemonElementRef : null,
            }))}
            isLoading={loading}
            hasMore={hasMore}
            onSearch={searchPokemon}
            selectedPokemon={selectedPokemon}
          />
        </SCSelector>
        <SCSelector>
          <Selector
            type="multiple"
            onSelect={handlePokemonSelect}
            data={pokemonList.map((pokemon, index) => ({
              value: pokemon.name,
              label:
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
              ref:
                index === pokemonList.length - 1 ? lastPokemonElementRef : null,
            }))}
            isLoading={loading}
            hasMore={hasMore}
            onSearch={searchPokemon}
          />
        </SCSelector>
      </SCSelectorsWrapper>
      <SCCardAndImageWrapper>
        <SCCardWrapper>
          <Card
            imageUrl={detailedPokemon?.sprites?.front_default || null}
            pokemonName={selectedPokemon || detailedPokemon?.name || null}
          />
        </SCCardWrapper>
        {detailedPokemon &&
          (() => {
            const pokemon = detailedPokemon;
            const types = pokemon?.types || [];
            return (
              <SCTypesWrapper $singleType={types.length === 1}>
                {types.map((type, index) => (
                  <SCType
                    key={index}
                    type={type.type.name.toLowerCase() as PokemonType}
                  >
                    {type.type.name.charAt(0).toUpperCase() +
                      type.type.name.slice(1)}
                  </SCType>
                ))}
              </SCTypesWrapper>
            );
          })()}
        <Image
          onError={() => {
            console.log("Error al cargar la imagen");
          }}
          src="/pokedex.png"
          alt="Pokedex"
          width={700}
          height={700}
        />
      </SCCardAndImageWrapper>
    </SCMainWrapper>
  );
}
