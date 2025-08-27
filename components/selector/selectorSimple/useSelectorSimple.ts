import { useState, useEffect, useRef, useCallback } from "react";
import { Option, SingleSelectorProps } from "../selector.interface";

export const useSelectorSimple = ({
  onSelect,
}: SingleSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number>('');
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    setSelected(option.label);
    setSearchValue('');
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.value as string);
    }
  }, [onSelect]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    isOpen,
    selected,
    searchValue,
    inputRef,
    containerRef,
    handleToggle,
    handleSelect,
    handleSearchChange,
    setSearchValue,
  };
};