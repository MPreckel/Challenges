import { useState, useRef, useEffect, useCallback } from "react";
import { Option } from "../selector.interface";
import { PokemonDetails } from "@/pokemons/useGetPokemons";
  
export const useSelectMultiple = ({ onSelect, detailedPokemon }: { onSelect?: (values: string[]) => void, detailedPokemon?: PokemonDetails | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

   const handleToggle = useCallback(() => {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      
      if (newIsOpen && inputRef.current) {
        // Small timeout to ensure the input is rendered before focusing
        setTimeout(() => inputRef.current?.focus(), 0);
      } else {
        setSearchValue('');
      }
    }, [isOpen]);
  
    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }, []);
  
    const handleSelect = useCallback((option: Option) => {
      setSelectedValues((prevValues) => {
        // Si ya está seleccionado, lo quitamos
        if (prevValues.includes(option.label)) {
          const newValues = prevValues.filter(value => value !== option.label);
          onSelect?.(newValues);
          return newValues;
        }
        // Si no está seleccionado, lo agregamos
        const newValues = [...prevValues, option.label];
        onSelect?.(newValues);
        return newValues;
      });
      setSearchValue('');
    }, [onSelect]);
  
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }, []);
  
    const handleDelete = useCallback((name: string) => {
      setSelectedValues((prevValues) => prevValues.filter((value) => value !== name));
    }, []);
    
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [handleClickOutside]);

    useEffect(() => {
      if (detailedPokemon) {
        setSelectedValues(prevValues => {
          // Solo actualizar si no está ya en la lista
          return prevValues.includes(detailedPokemon.name) 
            ? prevValues 
            : [...prevValues, detailedPokemon.name];
        });
      }
    }, [detailedPokemon]);
  
    return {
      isOpen,
      selectedValues,
      searchValue,
      inputRef,
      containerRef,
      handleToggle,
      handleSelect,
      handleSearchChange,
      setSearchValue,
      handleDelete,
    };
};