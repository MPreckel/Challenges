import { useState, useRef, useEffect } from "react";
import { Option } from "../selector.interface";
  
export const useSelectMultiple = ({ onSelect }: { onSelect?: (values: string[]) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: Option) => {
    const optionValue = option.value as string;
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
      
    setSelectedValues(newSelectedValues);
    
    if (onSelect) {
      onSelect(newSelectedValues);
    }
  };
  
  const handleRemoveChip = (valueToRemove: string) => {
    const newSelectedValues = selectedValues.filter(v => v !== valueToRemove);
    setSelectedValues(newSelectedValues);
    
    if (onSelect) {
      onSelect(newSelectedValues);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    isOpen,
    selectedValues,
    containerRef,
    handleToggle,
    handleSelect,
    handleRemoveChip,
  };
};