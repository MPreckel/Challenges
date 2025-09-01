"use client";
import { useState } from "react";
import { Card } from "@/components/card/Card";
import { Selector } from "@/components/selector/Selector";
import {
  SCBannerRow,
  SCButton,
  SCCardAndImageWrapper,
  SCCardWrapper,
  SCImageWrapper,
  SCSelectorsWrapper,
  SCType,
  SCTypesWrapper,
  SCUserNameAndButtonWrapper,
} from "./test/page.styles";
import Image from "next/image";
import { PokemonType } from "@/pokemons/pokemonTypes";
import { usePage } from "./usePage";
import { useAuth } from "@/context/AuthContext";
import PokemonModal from "@/components/modal/PokemonModal";

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

  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container">
      {/* Fila 1: Banner y usuario */}
      <SCBannerRow className="row align-items-center justify-content-end">
        <div className="col-6 d-flex justify-content-center">
          <Image
            src="/images/pokedexBanner.png"
            alt="PokedexBanner"
            width={400}
            height={120}
          />
        </div>
        <div className="col-3 d-flex justify-content-end wid">
          <SCUserNameAndButtonWrapper>
            {user?.name && <div>Hola {user.name}</div>}
            <SCButton onClick={logout}>Cerrar sesión</SCButton>
          </SCUserNameAndButtonWrapper>
        </div>
      </SCBannerRow>

      {/* Fila 2: Selectores */}
      <SCSelectorsWrapper className="row">
        <div className="col-2 justify-content-start">
          <Selector
            type="multiple"
            data={pokemonList
              .filter((pokemon) => !selectedPokemons.includes(pokemon.name))
              .map((pokemon, index, filteredList) => ({
                value: pokemon.name,
                label:
                  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                ref:
                  index === filteredList.length - 1
                    ? lastPokemonElementRef
                    : null,
              }))}
            isLoading={loading}
            hasMore={hasMore}
            onSearch={searchPokemon}
            onSelect={handleMultipleSelect}
            value={selectedPokemons}
          />
        </div>

        <div className="col-2 justify-content-center">
          <Selector
            type="simple"
            onSelect={handlePokemonSelect}
            data={pokemonList.map((pokemon, index) => ({
              value: pokemon.name,
              label:
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) ||
                detailedPokemon?.name ||
                "",
              ref:
                index === pokemonList.length - 1 ? lastPokemonElementRef : null,
            }))}
            isLoading={loading}
            hasMore={hasMore}
            onSearch={searchPokemon}
            selectedPokemon={selectedPokemon}
          />
        </div>
      </SCSelectorsWrapper>

      {/* Fila 4: Pokédex con tarjeta y tipos */}

        <SCCardAndImageWrapper className="row">
          <SCImageWrapper>
            <Image
              onError={() => {
                console.log("Error al cargar la imagen");
              }}
              src="/pokedex.png"
              alt="Pokedex"
              width={700}
              height={700}
            />
          </SCImageWrapper>
          <SCCardWrapper>
            <Card
              imageUrl={
                detailedPokemon?.sprites?.other?.dream_world.front_default ||
                detailedPokemon?.sprites?.front_default ||
                null
              }
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
        </SCCardAndImageWrapper>


      <PokemonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemon={detailedPokemon}
      />
    </div>
  );
}
