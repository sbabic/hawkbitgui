'use client';

import Select, { components, MultiValueGenericProps, StylesConfig } from 'react-select';
import { useMemo } from 'react';

export interface Tag {
    name: string;
    colour: string;
    id: number;
}

interface OptionType {
    value: number;
    label: string;
    color: string;
}

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

const customStyles: StylesConfig<OptionType, true> = {
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

export interface MultipleTargetTagSelectProps {
    tags: Tag[];
    selectedTags?: Tag[];
    onChange?: (selectedTags: Tag[]) => void;
}

export default function MultipleTargetTagSelect({ tags, selectedTags, onChange }: MultipleTargetTagSelectProps) {
    const options = useMemo(
        () =>
            tags.map((tag) => ({
                value: tag.id,
                label: tag.name,
                color: tag.colour,
            })),
        [tags]
    );

    const selectedOptions = useMemo(
        () =>
            selectedTags?.map((tag) => ({
                value: tag.id,
                label: tag.name,
                color: tag.colour,
            })) ?? [],
        [selectedTags]
    );

    const handleChange = (selectedOptions: readonly OptionType[]) => {
        const selectedTags = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
            colour: option.color,
        }));
        onChange?.(selectedTags);
    };

    return (
        <Select
            value={selectedOptions}
            isMulti
            name='colors'
            options={options}
            className='basic-multi-select'
            classNamePrefix='select'
            components={{ MultiValueLabel }}
            styles={customStyles}
            onChange={handleChange}
            isLoading={selectedOptions.length === 0}
        />
    );
}
