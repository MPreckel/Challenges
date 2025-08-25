"use client";
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
        {/* <SCSelector>
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
            selectedValues={selectedPokemons}
          />
        </SCSelector> */}
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
      <SCButton
        onClick={logout}
      >
        Cerrar sesión
      </SCButton>
    </SCMainWrapper>
  );
}
