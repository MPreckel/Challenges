export interface Option<T extends HTMLElement = HTMLDivElement> {
  value: string | number;
  label: string;
  ref?: React.RefObject<T> | null;
}

export type SelectorProps = SimpleSelectorProps | MultipleSelectorProps;

export interface SimpleSelectorProps {
  type: 'simple';
  data: Option[];
  value?: string;
  isLoading?: boolean;
  onSelect?: (value: string) => void;
  hasMore?: boolean;
}

export interface MultipleSelectorProps {
  type: 'multiple';
  data: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
}
