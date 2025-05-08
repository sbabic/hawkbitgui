'use client';

import Select, { MultiValue } from 'react-select';
import { useGetSoftwareModules } from '../../hooks/use-get-software-modules';
import { SoftwareModule } from '@/entities';
import { useMemo } from 'react';
import { useGetDistributionSetAssignedModules } from '@/app/x/distributions/hooks/use-get-distribution-set-assigned-modules';
import { useAssignModuleToDistributionSet } from '@/app/x/distributions/hooks/use-assign-module-to-distribution-set';

type SoftwareModuleOption = SoftwareModule & {
    value: number;
    label: string;
};

interface SoftwareModuleSelectContainerProps {
    distributionSetId?: number;
}

export default function SoftwareModuleSelectContainer({ distributionSetId }: SoftwareModuleSelectContainerProps) {
    const { data: softwareModules, isLoading } = useGetSoftwareModules();
    const { data: assignedSoftwareModules } = useGetDistributionSetAssignedModules(distributionSetId ?? 0, {
        queryOptions: { enabled: !!distributionSetId },
    });
    const { assignModuleToDistributionSet } = useAssignModuleToDistributionSet();

    const handleChange = (selected: MultiValue<SoftwareModuleOption>) => {
        if (distributionSetId) {
            assignModuleToDistributionSet({
                distributionSetId: distributionSetId,
                softwareModuleIds: selected.map((module) => module.value),
            });
        }
    };

    const selectedSoftwareModules = useMemo(() => {
        if (isLoading || !softwareModules || !assignedSoftwareModules) {
            return [];
        }

        return assignedSoftwareModules
            .filter((assignedModule) => {
                const selectedModule = softwareModules.find((module) => module.id === assignedModule.id);
                return selectedModule;
            })
            .map((softwareModule) => ({
                value: softwareModule.id,
                label: softwareModule.name,
                ...softwareModule,
            }));
    }, [softwareModules, assignedSoftwareModules, isLoading]);

    const mappedOptions = useMemo(() => {
        return (softwareModules ?? []).map((softwareModule) => ({
            value: softwareModule.id,
            label: softwareModule.name,
            ...softwareModule,
        }));
    }, [softwareModules]);

    return (
        <Select<SoftwareModuleOption, true>
            name='software-modules'
            value={selectedSoftwareModules}
            options={mappedOptions}
            onChange={(selected) => handleChange(selected)}
            isLoading={isLoading}
            classNamePrefix='select'
            className='basic-multi-select'
            isMulti
        />
    );
}
