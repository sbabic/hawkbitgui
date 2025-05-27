'use client';

import Select, { components, MultiValueGenericProps } from 'react-select';
import { BaseOption, createCustomStyles } from './react-select-config';

const ColourDot = ({ color }: { color: string }) => (
  <span
    style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: color,
      marginRight: 8,
    }}
  />
);

export interface MultipleSelectProps<T extends BaseOption> {
  options: T[];
  selectedOptions?: T[];
  onChange?: (selected: T[]) => void;
  isLoading?: boolean;
}

export default function MultipleSelect<T extends BaseOption>({ isLoading, options, selectedOptions, onChange }: MultipleSelectProps<T>) {
  const MultiValueLabel = (props: MultiValueGenericProps<T>) => (
    <components.MultiValueLabel {...props}>
      <ColourDot color={props.data.colour} />
      {props.data.label}
    </components.MultiValueLabel>
  );

  const handleChange = (selected: readonly T[]) => {
    onChange?.([...selected]);
  };

  return (
    <Select<T, true>
      value={selectedOptions?.map((option) => ({ ...option, value: option.id, label: option.name }))}
      isMulti
      name='colors'
      options={options?.map((option) => ({ ...option, value: option.id, label: option.name }))}
      className='basic-multi-select'
      classNamePrefix='select'
      components={{ MultiValueLabel }}
      styles={createCustomStyles<T>()}
      onChange={handleChange}
      isLoading={isLoading}
    />
  );
}
