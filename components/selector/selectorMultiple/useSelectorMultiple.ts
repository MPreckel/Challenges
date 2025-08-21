import { useState, useRef, useEffect, useCallback } from "react";
import { Option } from "../selector.interface";
  
export const useSelectMultiple = ({ onSelect, detailedPokemon }: { onSelect?: (values: string[]) => void, detailedPokemon?: PokemonDetails }) => {
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
      setSelectedValues((prevValues) => [...prevValues, option.label]);
      setSearchValue('');
      if (onSelect) {
        onSelect(selectedValues);
      }
    }, [onSelect, selectedValues]);
  
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
        setSelectedValues((prevValues) => [...prevValues, detailedPokemon.name]);
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