'use client';

import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useEffect, useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import TargetAttributes from '@/app/components/target-info-modal/components/target-attributes';

export default function TargetAttributesContainer() {
    const selectedTarget = useTargetsTableStore(
        (state) => state.selectedTarget
    );
    const [targetAttributes, setTargetAttributes] = useState<
        Record<string, string>
    >({});

    useEffect(() => {
        if (!selectedTarget) return;

        const fetchAttributes = async () => {
            const attributes = await TargetsService.getAttributes(
                selectedTarget.controllerId
            );
            setTargetAttributes(attributes);
        };

        fetchAttributes();
    }, [selectedTarget]);

    return <TargetAttributes attributes={targetAttributes} />;
}
