'use client';

import Select, { components, MultiValueGenericProps, OptionProps } from 'react-select';
import { BaseOption, createCustomStyles } from './react-select-config';
import { useCallback } from 'react';

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
  const MultiValueLabel = useCallback(
    (props: MultiValueGenericProps<T>) => (
      <components.MultiValueLabel {...props}>
        <ColourDot color={props.data.colour} />
        {props.data.label}
      </components.MultiValueLabel>
    ),
    []
  );

  const Option = useCallback((props: OptionProps<T, true>) => {
    const { data, innerRef, innerProps } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          backgroundColor: props.isFocused ? '#f5f5f5' : 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ColourDot color={data.colour} />
          {data.name}
        </div>
      </div>
    );
  }, []);

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
      components={{ MultiValueLabel, Option }}
      styles={createCustomStyles<T>()}
      onChange={handleChange}
      isLoading={isLoading}
    />
  );
}
