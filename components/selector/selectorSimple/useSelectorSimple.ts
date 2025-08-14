
import { useState, useEffect, useRef } from "react";
import { Option, SingleSelectorProps } from "../selector.interface";

export const useSelectorSimple = ({
  onSelect,
}: SingleSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number>('');
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
    setSelected(option.value as string);
    handleToggle();
    if (onSelect) {
      onSelect(option.value as string);
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
    selected,
    containerRef,
    handleToggle,
    handleSelect,
  };
};