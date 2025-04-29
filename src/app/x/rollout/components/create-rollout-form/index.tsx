'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './styles.module.scss';
import Input from '@/app/components/input';
import Select from '@/app/components/select';
import FormControl from '@/app/components/form-control';
import RadioGroup from '@/app/components/radio-group';
import TextArea from '@/app/components/text-area';
import { RolloutTypes } from '@/entities/rollout';
import { Distribution } from '@/entities';
import { CreateRolloutInput } from '@/services/rollouts-service.types';
import { ActionButtons } from '@/app/components/action-buttons';

type CreateRolloutFormProps = {
    distributionSets: Distribution[];
    onSubmit: (data: CreateRolloutInput) => void;
    onCancel: () => void;
};

export default function CreateRolloutForm({ distributionSets, onSubmit, onCancel }: CreateRolloutFormProps) {
    const [activeTab, setActiveTab] = useState<'numberOfGroups' | 'advancedDefinition'>('numberOfGroups');

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateRolloutInput>({
        defaultValues: {
            type: RolloutTypes.SOFT,
        },
    });

    const actionTypeOptions = [
        { id: RolloutTypes.FORCED, label: 'Forced' },
        { id: RolloutTypes.SOFT, label: 'Soft' },
        { id: RolloutTypes.DOWNLOAD_ONLY, label: 'Download only' },
        { id: RolloutTypes.TIME_FORCED, label: 'Time forced' },
    ];

    // const startTypeOptions = [
    //     { id: 'manual', label: 'Manual' },
    //     { id: 'auto', label: 'Auto' },
    //     { id: 'scheduled', label: 'Scheduled' },
    // ];

    return (
        <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.threeColumns}>
                <FormControl id='name' label='Name' errorMessage={errors.name?.message} required>
                    <Input id='name' placeholder='Enter rollout name' {...register('name', { required: 'Name is required' })} />
                </FormControl>

                <FormControl id='distributionSetId' label='Distribution set' errorMessage={errors.distributionSetId?.message} required>
                    <Select {...register('distributionSetId')} className={styles.select}>
                        <option value=''>Choose a distribution set</option>
                        {distributionSets.map((distributionSet) => (
                            <option key={distributionSet.id} value={distributionSet.id}>
                                {distributionSet.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl id='customTargetFilter' label='Custom target filter' errorMessage={errors.targetFilterQuery?.message} required>
                    <Select {...register('targetFilterQuery')} className={styles.select}>
                        <option value=''>Choose a custom target filter</option>
                        <option value='id==test*'>id==test*</option>
                    </Select>
                </FormControl>
            </div>

            <FormControl id='description' label='Description' errorMessage={errors.description?.message}>
                <TextArea id='description' placeholder='Add additional details' {...register('description')} />
            </FormControl>

            <FormControl id='type' label='Action type' errorMessage={errors.type?.message}>
                <Controller
                    name='type'
                    control={control}
                    render={({ field }) => <RadioGroup value={field.value ?? ''} options={actionTypeOptions} onChange={field.onChange} />}
                />
            </FormControl>

            {/* <FormControl id='startType' label='Start type' errorMessage={errors.startType?.message}>
                        <Controller
                            name='startType'
                            control={control}
                            render={({ field }) => <RadioGroup value={field.value ?? ''} options={startTypeOptions} onChange={field.onChange} />}
                        />
                    </FormControl> */}

            <div className={styles.tabGroup}>
                <div className={styles.tabs}>
                    <button
                        type='button'
                        className={`${styles.tab} ${activeTab === 'numberOfGroups' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('numberOfGroups')}
                    >
                        Number of groups
                    </button>
                    <button
                        type='button'
                        className={`${styles.tab} ${activeTab === 'advancedDefinition' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('advancedDefinition')}
                    >
                        Advanced group definition
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {activeTab === 'numberOfGroups' && (
                        <>
                            <p className={styles.tabDescription}>Generate the groups automatically with the specified thresholds.</p>

                            <div className={styles.threeColumns}>
                                <FormControl id='amountGroups' label='Number of groups' errorMessage={errors.amountGroups?.message}>
                                    <Input id='amountGroups' placeholder='Enter group count' type='number' {...register('amountGroups')} />
                                </FormControl>

                                <FormControl id='successCondition' label='Trigger threshold' errorMessage={errors.successCondition?.message}>
                                    <Input id='successCondition' placeholder='Enter trigger value (%)' type='number' {...register('successCondition')} />
                                </FormControl>

                                <FormControl id='errorCondition' label='Error threshold' errorMessage={errors.errorCondition?.message}>
                                    <Input id='errorCondition' placeholder='Enter max errors' type='number' {...register('errorCondition')} />
                                </FormControl>
                            </div>
                        </>
                    )}

                    {activeTab === 'advancedDefinition' && (
                        <div className={styles.tabDescription}>
                            <p>Advanced group configuration options will be available here.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.errorMessage}>Mandatory field*</div>

            <ActionButtons>
                <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
                <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
            </ActionButtons>
        </form>
    );
}
