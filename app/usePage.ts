import { useGetPokemons } from "@/pokemons/useGetPokemons";
import { useCallback, useEffect, useRef, useState } from "react";

export const usePage = () => {
     const {
       pokemonList,
       detailedPokemon,
       loading,
       getPokemons,
       loadMorePokemons,
       hasMore,
       getPokemonDetails,
       searchPokemon,
     } = useGetPokemons();
     const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const observer = useRef<IntersectionObserver>(null);
   
     const lastPokemonElementRef = useCallback(
       (node: HTMLElement | null) => {
         if (loading) return;
         if (observer.current) observer.current.disconnect();
   
         observer.current = new IntersectionObserver((entries) => {
           if (entries[0].isIntersecting && hasMore) {
             loadMorePokemons();
           }
         });
   
         if (node) observer.current.observe(node);
       },
       [loading, hasMore, loadMorePokemons]
     );
   
     useEffect(() => {
       getPokemons();
     }, [getPokemons]);
   
     // Restaurar el Pokémon guardado al montar
     useEffect(() => {
       const savedPokemon = localStorage.getItem("selectedPokemon");
       if (savedPokemon) {
         setSelectedPokemon(savedPokemon);
         getPokemonDetails(savedPokemon);
       }
     }, [getPokemonDetails]);
   
     // Guardar el Pokémon detallado cuando cambie
     useEffect(() => {
       if (!window) return;
       const name = detailedPokemon?.name;
       if (name) {
         localStorage.setItem("selectedPokemon", name);
       }
     }, [detailedPokemon?.name]);
   
     const handlePokemonSelect = (value: string) => {
       setSelectedPokemon(value);
       getPokemonDetails(value);
     };

     const handleMultipleSelect = (values: string[]) => {
       setSelectedPokemons(values);
     };

     return {
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
     };
};
