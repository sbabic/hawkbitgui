'use client';

import Select, { components, MultiValueGenericProps } from 'react-select';
import { useMemo } from 'react';
import { OptionType, BaseOption, customStyles } from './react-select-config';

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

const MultiValueLabel = (props: MultiValueGenericProps<OptionType>) => (
    <components.MultiValueLabel {...props}>
        <ColourDot color={props.data.color} />
        {props.data.label}
    </components.MultiValueLabel>
);

export interface MultipleSelectProps<T extends BaseOption> {
    options: T[];
    selectedOptions?: T[];
    onChange?: (selected: T[]) => void;
    isLoading?: boolean;
}

export default function MultipleSelect<T extends BaseOption>({ isLoading, options, selectedOptions, onChange }: MultipleSelectProps<T>) {
    const mappedOptions = useMemo(
        () =>
            options.map((opt) => ({
                value: opt.id,
                label: opt.name,
                color: opt.colour,
            })),
        [options]
    );

    const mappedSelectedOptions = useMemo(
        () =>
            selectedOptions?.map((opt) => ({
                value: opt.id,
                label: opt.name,
                color: opt.colour,
            })) ?? [],
        [selectedOptions]
    );

    const handleChange = (selected: readonly OptionType[]) => {
        const newSelected = selected.map((opt) => ({
            id: opt.value,
            name: opt.label,
            colour: opt.color,
        })) as T[];
        onChange?.(newSelected);
    };

    return (
        <Select<OptionType, true>
            value={mappedSelectedOptions}
            isMulti
            name='colors'
            options={mappedOptions}
            className='basic-multi-select'
            classNamePrefix='select'
            components={{ MultiValueLabel }}
            styles={customStyles}
            onChange={handleChange}
            isLoading={isLoading}
        />
    );
}
