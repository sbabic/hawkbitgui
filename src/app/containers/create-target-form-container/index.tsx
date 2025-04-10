'use client';

import CreateTargetForm from '@/app/components/create-target-form';
import { TargetsService } from '@/services/targets-service';
import { useTargetsTableStore } from '@/stores/targets-table-store';

export interface CreateTargetFormContainerProps {
    onSubmitSuccess?: () => void;
    onCancel?: () => void;
}

export default function CreateTargetFormContainer({ onSubmitSuccess, onCancel }: CreateTargetFormContainerProps) {
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);
    const handleSubmit = async (data: { controllerId: string; name: string; type: string; description: string }) => {
        console.log('Form submitted:', data);
        await TargetsService.createTarget({ ...data });
        await fetchTargets();
        onSubmitSuccess?.();
    };
    return <CreateTargetForm onSubmit={handleSubmit} onCancel={onCancel} />;
}
