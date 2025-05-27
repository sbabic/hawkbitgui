'use client';

import Select, { components, MultiValueGenericProps, OptionProps } from 'react-select';
import { BaseOption, createCustomStyles } from './react-select-config';
import IconButton from '@/app/components/icon-button';

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

export interface EditableMultipleSelectProps<T extends BaseOption> {
  options: T[];
  selectedOptions?: T[];
  onChange?: (selected: T[]) => void;
  isLoading?: boolean;
}

export default function EditableMultipleSelect<T extends BaseOption>({ isLoading, options, selectedOptions, onChange }: EditableMultipleSelectProps<T>) {
  const handleChange = (selected: readonly T[]) => {
    onChange?.([...selected]);
  };

  const MultiValueLabel = (props: MultiValueGenericProps<T>) => (
    <components.MultiValueLabel {...props}>
      <ColourDot color={props.data.color} />
      {props.data.label}
    </components.MultiValueLabel>
  );

  const EditableOption = (props: OptionProps<T, true>) => {
    const { data, innerRef, innerProps } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 12px',
          backgroundColor: props.isFocused ? '#f5f5f5' : 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ColourDot color={data.color} />
          {data.name}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              data.onEdit?.(data);
            }}
          ></IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              data.onDelete?.(data);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <Select<T, true>
      value={selectedOptions}
      isMulti
      name='colors'
      options={options}
      className='basic-multi-select'
      classNamePrefix='select'
      components={{ MultiValueLabel, Option: EditableOption }}
      styles={createCustomStyles<T>()}
      onChange={handleChange}
      isLoading={isLoading}
    />
  );
}
