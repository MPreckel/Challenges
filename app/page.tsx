"use client";
import { useState } from 'react';
import { Card } from "@/components/card/Card";
import { Selector } from "@/components/selector/Selector";
import {
  SCButton,
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
import { useAuth } from "@/context/AuthContext";
import PokemonModal from '@/components/modal/PokemonModal';

export default function Home() {
  const {
    pokemonList,
    detailedPokemon,
    loading,
    hasMore,
    searchPokemon,
    selectedPokemon,
    selectedPokemons,
    handlePokemonSelect,
    handleMultipleSelect,
    lastPokemonElementRef,
  } = usePage();

    const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
 
  return (
    <SCMainWrapper className="container">
      <SCSelectorsWrapper className="d-flex justify-content-center align-items-center w-100">
        <SCSelector className="col-5">
          <Selector
            type="simple"
            onSelect={handlePokemonSelect}
            data={pokemonList.map((pokemon, index) => ({
              value: pokemon.name,
              label:
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) ||
                detailedPokemon?.name || '',
              ref:
                index === pokemonList.length - 1 ? lastPokemonElementRef : null,
            }))}
            isLoading={loading}
            hasMore={hasMore}
            onSearch={searchPokemon}
            selectedPokemon={selectedPokemon}
          />
        </SCSelector>
        <SCSelector className="col-12">
          <Selector
            type="multiple"
            data={pokemonList
              .filter(pokemon => !selectedPokemons.includes(pokemon.name))
              .map((pokemon, index, filteredList) => ({
                value: pokemon.name,
                label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                ref: index === filteredList.length - 1 ? lastPokemonElementRef : null,
              }))}
            isLoading={loading}
            hasMore={hasMore}
            onSearch={searchPokemon}
            onSelect={handleMultipleSelect}
            value={selectedPokemons}
          />
        </SCSelector>
      </SCSelectorsWrapper>
      <SCCardAndImageWrapper className="d-flex flex-column align-items-center">
        <SCCardWrapper>
          <Card
            imageUrl={detailedPokemon?.sprites?.other?.dream_world.front_default || detailedPokemon?.sprites?.front_default || null}
            pokemonName={selectedPokemon || detailedPokemon?.name || null}
            onImageClick={() => setIsModalOpen(true)}
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
      <SCButton
        onClick={logout}
      >
        Cerrar sesión
      </SCButton>
      <PokemonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemon={detailedPokemon}
      />
    </SCMainWrapper>
  );
}
