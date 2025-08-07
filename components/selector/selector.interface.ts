export interface Option {
  value: string | number;
  label: string;
}

export type SelectorProps = SimpleSelectorProps | MultipleSelectorProps;

export interface SimpleSelectorProps {
  type: 'simple';
  data: Option[];
  value?: string;
  isLoading?: boolean;
  onSelect?: (value: string) => void;
}

export interface MultipleSelectorProps {
  type: 'multiple';
  data: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
}
