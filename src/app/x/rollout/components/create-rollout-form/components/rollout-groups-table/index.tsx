'use client';

import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import IconButton from '@/app/components/icon-button';
import TrashIcon from '@/app/components/icons/trash-icon';
import Input from '@/app/components/input';
import FormControl from '@/app/components/form-control';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import Button from '@/app/components/button';
import { CreateRolloutFormData, RolloutGroup } from '../../types';
import PlusIcon from '@/app/components/icons/plus-icon';
import { Condition } from '@/entities/rollout';

export default function RolloutGroupsTable() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateRolloutFormData>();
  const columnHelper = createColumnHelper<RolloutGroup>();
  const didInit = useRef(false);

  const {
    fields: groupsField,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'groups',
  });

  useEffect(() => {
    if (groupsField.length === 0 && !didInit.current) {
      append({
        name: 'Group 1',
        targetFilterQuery: '',
        targetPercentage: 100,
        successCondition: { condition: Condition.THRESHOLD, expression: 50 },
        errorCondition: { condition: Condition.THRESHOLD, expression: 50 },
      });
      didInit.current = true;
    }
  }, [groupsField.length, append]);

  const handleAddGroup = () => {
    append({
      name: `Group ${groupsField.length + 1}`,
      targetFilterQuery: '',
      targetPercentage: 100,
      successCondition: { condition: Condition.THRESHOLD, expression: 50 },
      errorCondition: { condition: Condition.THRESHOLD, expression: 50 },
    });
  };

  const handleDeleteGroup = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        size: 150,
        cell: (cell) => (
          <FormControl id={`groups.${cell.row.index}.name`} errorMessage={errors.groups?.[cell.row.index]?.name?.message} required>
            <Controller
              control={control}
              name={`groups.${cell.row.index}.name`}
              render={({ field }) => <Input inputSize='sm' {...field} id={`groups.${cell.row.index}.name`} />}
            />
          </FormControl>
        ),
      }),
      columnHelper.accessor('targetFilterQuery', {
        header: 'Target filter query',
        size: 200,
        cell: (cell) => (
          <FormControl id={`groups.${cell.row.index}.targetFilterQuery`} errorMessage={errors.groups?.[cell.row.index]?.targetFilterQuery?.message}>
            <Controller
              control={control}
              name={`groups.${cell.row.index}.targetFilterQuery`}
              render={({ field }) => <Input inputSize='sm' {...field} id={`groups.${cell.row.index}.targetFilterQuery`} placeholder='Custom target filter' />}
            />
          </FormControl>
        ),
      }),
      columnHelper.accessor('targetPercentage', {
        header: 'Target percentage',
        size: 120,
        cell: (cell) => (
          <FormControl id={`groups.${cell.row.index}.targetPercentage`} errorMessage={errors.groups?.[cell.row.index]?.targetPercentage?.message} required>
            <Controller
              control={control}
              name={`groups.${cell.row.index}.targetPercentage`}
              render={({ field }) => (
                <Input
                  {...field}
                  inputSize='sm'
                  id={`groups.${cell.row.index}.targetPercentage`}
                  type='number'
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </FormControl>
        ),
      }),
      columnHelper.accessor('successCondition', {
        header: 'Trigger threshold',
        size: 120,
        cell: (cell) => (
          <FormControl id={`groups.${cell.row.index}.successCondition`} errorMessage={errors.groups?.[cell.row.index]?.successCondition?.expression?.message}>
            <Controller
              control={control}
              name={`groups.${cell.row.index}.successCondition`}
              render={({ field }) => (
                <Input
                  id={`groups.${cell.row.index}.successCondition`}
                  type='number'
                  inputSize='sm'
                  value={field.value?.expression ?? ''}
                  onChange={(e) => {
                    field.onChange({ condition: Condition.THRESHOLD, expression: Number(e.target.value) });
                  }}
                />
              )}
            />
          </FormControl>
        ),
      }),
      columnHelper.accessor('errorCondition', {
        header: 'Error threshold',
        size: 120,
        cell: (cell) => (
          <FormControl id={`groups.${cell.row.index}.errorCondition`} errorMessage={errors.groups?.[cell.row.index]?.errorCondition?.expression?.message}>
            <Controller
              control={control}
              name={`groups.${cell.row.index}.errorCondition`}
              render={({ field }) => (
                <Input
                  id={`groups.${cell.row.index}.errorCondition`}
                  type='number'
                  inputSize='sm'
                  value={field.value?.expression ?? ''}
                  onChange={(e) => {
                    field.onChange({ condition: Condition.THRESHOLD, expression: Number(e.target.value) });
                  }}
                />
              )}
            />
          </FormControl>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        size: 80,
        cell: (cell) => (
          <div style={{ marginLeft: 8 }}>
            <IconButton onClick={() => handleDeleteGroup(cell.row.index)}>
              <TrashIcon />
            </IconButton>
          </div>
        ),
      }),
    ];
  }, [columnHelper, control, errors.groups, handleDeleteGroup]);

  return (
    <div>
      <Table variant='unstyled' columns={columns} data={groupsField} />
      <div style={{ marginTop: 16 }}>
        <Button onClick={handleAddGroup} leftIcon={<PlusIcon />}>
          Add group
        </Button>
      </div>
    </div>
  );
}
