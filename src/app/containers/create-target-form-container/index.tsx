'use client';

import CreateTargetForm from '@/app/components/create-target-form';
import { TargetsService } from '@/services/targets-service';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { TargetType } from '@/entities';
import { useEffect, useState } from 'react';
import { TargetsTypesService } from '@/services/targets-types-service';

export interface CreateTargetFormContainerProps {
    onSubmitSuccess?: () => void;
    onCancel?: () => void;
}

export default function CreateTargetFormContainer({ onSubmitSuccess, onCancel }: CreateTargetFormContainerProps) {
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);
    const [targetTypes, setTargetTypes] = useState<TargetType[]>([]);
    const handleSubmit = async (data: { controllerId: string; name: string; targetTypeId: number; description: string }) => {
        console.log('Form submitted:', data);
        await TargetsService.createTarget({ ...data, targetType: data.targetTypeId });
        await fetchTargets();
        onSubmitSuccess?.();
    };

    useEffect(() => {
        const fetchTargetsTypes = async () => {
            const types = await TargetsTypesService.fetchTargetsTypes();
            setTargetTypes(types);
        };
        fetchTargetsTypes();
    }, []);

    return <CreateTargetForm onSubmit={handleSubmit} onCancel={onCancel} targetTypes={targetTypes} />;
}
