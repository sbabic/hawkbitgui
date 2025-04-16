'use client';

import { TargetsService } from '@/services/targets-service';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { TargetType } from '@/entities';
import { useEffect, useState } from 'react';
import { TargetsTypesService } from '@/services/targets-types-service';
import TargetForm from '@/app/components/target-form';

export interface EditTargetFormContainerProps {
    onSubmitSuccess?: () => void;
    onCancel?: () => void;
}

export default function EditTargetFormContainer({ onSubmitSuccess, onCancel }: EditTargetFormContainerProps) {
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);
    const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
    const [targetTypes, setTargetTypes] = useState<TargetType[]>([]);
    const handleSubmit = async (data: { controllerId: string; name: string; targetTypeId: number; description: string }) => {
        console.log('Form submitted:', data);
        await TargetsService.updateTarget({ ...data, targetType: data.targetTypeId });
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

    return (
        <TargetForm
            mode={'edit'}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            targetTypes={targetTypes}
            defaultValues={{ ...selectedTarget, targetTypeId: selectedTarget?.targetType }}
        />
    );
}
