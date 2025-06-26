import { StylesConfig } from 'react-select';

export interface BaseOption {
  id: number | string;
  name: string;
  colour?: string;
  onEdit?: (opt: BaseOption) => void;
  onDelete?: (opt: BaseOption) => void;
}

export function createCustomStyles<T extends BaseOption>(): StylesConfig<T, true> {
  return {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused || state.menuIsOpen ? '#562563' : '#ccc',
      boxShadow: state.isFocused || state.menuIsOpen ? '0 0 0 1px #562563' : 'none',
      ':hover': {
        border: '1px solid #562563',
        boxShadow: '0 0 0 1px #562563',
      },
      ':focus': {
        border: '1px solid #562563',
        boxShadow: '0 0 0 1px #562563',
      },
      ':active': {
        border: '1px solid #562563',
        boxShadow: '0 0 0 1px #562563',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'transparent',
      border: '1px solid #E4E7F2',
      borderRadius: '8px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
    }),
  };
}
