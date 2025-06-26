'use client';

import Select, { components, MultiValueGenericProps, OptionProps } from 'react-select';
import { BaseOption, createCustomStyles } from './react-select-config';
import IconButton from '@/app/components/icon-button';
import React, { useCallback } from 'react';
import TrashIcon from '@/app/components/icons/trash-icon';
import EditIcon from '@/app/components/icons/edit-icon';

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
  onDataEdit?: (data: T) => void;
  onDataDelete?: (data: T) => void;
}

export default function EditableMultipleSelect<T extends BaseOption>({
  isLoading,
  options,
  selectedOptions,
  onChange,
  onDataEdit,
  onDataDelete,
}: EditableMultipleSelectProps<T>) {
  const handleChange = (selected: readonly T[]) => {
    onChange?.([...selected]);
  };

  const MultiValueLabel = useCallback(
    (props: MultiValueGenericProps<T>) => (
      <components.MultiValueLabel {...props}>
        <ColourDot color={props.data.colour} />
        {props.data.label}
      </components.MultiValueLabel>
    ),
    []
  );

  const EditableOption = useCallback(
    (props: OptionProps<T, true>) => {
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
            <ColourDot color={data.colour ?? ''} />
            {data.name}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <IconButton
              width={'24px'}
              onClick={(e) => {
                e.stopPropagation();
                if (onDataEdit) {
                  return onDataEdit(data);
                }
                data.onEdit?.(data);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              width={'24px'}
              onClick={(e) => {
                e.stopPropagation();
                if (onDataDelete) {
                  return onDataDelete(data);
                }
                data.onDelete?.(data);
              }}
            >
              <TrashIcon />
            </IconButton>
          </div>
        </div>
      );
    },
    [onDataEdit, onDataDelete]
  );

  return (
    <Select<T, true>
      value={selectedOptions?.map((option) => ({ ...option, value: option.id, label: option.name }))}
      isMulti
      name='colors'
      options={options?.map((option) => ({ ...option, value: option.id, label: option.name }))}
      className='basic-multi-select'
      classNamePrefix='select'
      components={{ MultiValueLabel, Option: EditableOption }}
      styles={createCustomStyles<T>()}
      onChange={handleChange}
      isLoading={isLoading}
    />
  );
}
