import React, { useEffect, useState } from 'react';
import ConfigurationForm, { FormStateType } from '@/app/x/configuration/components/configuration-form';
import { HawkbitSystemConfigKey, HawkbitSystemConfiguration } from '@/services/system-configuration-service.types';
import { SystemConfigurationService } from '@/services/system-configuration-service';
import { handleErrorWithToast } from '@/utils/handle-error-with-toast';

function mapSystemConfigToFormState(configs: HawkbitSystemConfiguration): FormStateType {
  return {
    repository: {
      autocloseRunningActions: Boolean(configs['repository.actions.autoclose.enabled']?.value),
      requestConfirmation: Boolean(configs['user.confirmation.flow.enabled']?.value),
      autoDelete: {
        enabled: Boolean(configs['action.cleanup.enabled']?.value),
        deleteStatus: String(configs['action.cleanup.actionStatus']?.value ?? ''),
        deleteAfterDays: Number(configs['action.cleanup.actionExpiry']?.value ?? 0) / (1000 * 60 * 60 * 24),
      },
    },
    rollout: {
      approveRollout: Boolean(configs['rollout.approval.enabled']?.value),
    },
    assignment: {
      allowBatchAssignments: Boolean(configs['batch.assignments.enabled']?.value),
      allowMultiAssignments: Boolean(configs['multi.assignments.enabled']?.value),
    },
    authentication: {
      allowCertAuth: {
        enabled: Boolean(configs['authentication.header.enabled']?.value),
        sslIssuerHash: String(configs['authentication.header.authority']?.value ?? ''),
      },
      allowTokenAuth: Boolean(configs['authentication.targettoken.enabled']?.value),
      allowGateway: {
        enabled: Boolean(configs['authentication.gatewaytoken.enabled']?.value),
        gatewayToken: String(configs['authentication.gatewaytoken.key']?.value ?? ''),
      },
      allowDownloadWithoutCreds: {
        enabled: Boolean(configs['anonymous.download.enabled']?.value),
      },
    },
    polling: {
      pollingTime: {
        enabled: Boolean(configs['pollingTime']),
        value: String(configs['pollingTime']?.value ?? ''),
      },
      pollingOverdueTime: {
        enabled: Boolean(configs['pollingOverdueTime']),
        value: String(configs['pollingOverdueTime']?.value ?? ''),
      },
      maintenanceWindowPollCount: {
        value: Number(configs['maintenanceWindowPollCount']?.value),
      },
    },
  };
}

function mapFormStateToSystemConfig(form: FormStateType): Partial<Record<HawkbitSystemConfigKey, string | number | boolean>> {
  return {
    'repository.actions.autoclose.enabled': form.repository.autocloseRunningActions,
    'user.confirmation.flow.enabled': form.repository.requestConfirmation,
    'action.cleanup.enabled': form.repository.autoDelete.enabled,
    'action.cleanup.actionStatus': form.repository.autoDelete.deleteStatus,
    'action.cleanup.actionExpiry': form.repository.autoDelete.deleteAfterDays * 24 * 60 * 60 * 1000,
    'rollout.approval.enabled': form.rollout.approveRollout,
    'authentication.header.enabled': form.authentication.allowCertAuth.enabled,
    'authentication.header.authority': form.authentication.allowCertAuth.sslIssuerHash,
    'authentication.targettoken.enabled': form.authentication.allowTokenAuth,
    'authentication.gatewaytoken.enabled': form.authentication.allowGateway.enabled,
    'authentication.gatewaytoken.key': form.authentication.allowGateway.gatewayToken,
    pollingTime: form.polling.pollingTime.value,
    pollingOverdueTime: form.polling.pollingOverdueTime.value,
    'anonymous.download.enabled': form.authentication.allowDownloadWithoutCreds.enabled,
    'batch.assignments.enabled': form.assignment.allowBatchAssignments,
    'multi.assignments.enabled': form.assignment.allowMultiAssignments,
    maintenanceWindowPollCount: form.polling.maintenanceWindowPollCount.value,
    //default.ds.type
    //minPollingTime
    //implicit.lock.enabled
  };
}

function diffConfigs(
  original: Partial<Record<HawkbitSystemConfigKey, string | number | boolean>>,
  updated: Partial<Record<HawkbitSystemConfigKey, string | number | boolean>>
): Partial<Record<HawkbitSystemConfigKey, string | number | boolean>> {
  const changed: Partial<Record<HawkbitSystemConfigKey, string | number | boolean>> = {};

  for (const key in updated) {
    if (updated[key as HawkbitSystemConfigKey] !== original[key as HawkbitSystemConfigKey]) {
      changed[key as HawkbitSystemConfigKey] = updated[key as HawkbitSystemConfigKey];
    }
  }

  return changed;
}

export default function ConfigurationFormContainer() {
  const [initialValues, setInitialValues] = useState<FormStateType | null>(null);
  const [originalConfigMap, setOriginalConfigMap] = useState<Partial<Record<HawkbitSystemConfigKey, string | number | boolean>> | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configs = await SystemConfigurationService.getSystemConfiguration();
        const mappedForm = mapSystemConfigToFormState(configs);
        const originalMapped = mapFormStateToSystemConfig(mappedForm);

        setInitialValues(mappedForm);
        setOriginalConfigMap(originalMapped);
      } catch (error) {
        console.error('Failed to load system configuration', error);
      }
    };

    fetchConfig();
  }, []);

  const handleSubmit = async (form: FormStateType) => {
    try {
      const newConfig = mapFormStateToSystemConfig(form);
      const diff = diffConfigs(originalConfigMap ?? {}, newConfig);
      console.log(diff);
      if (Object.keys(diff).length === 0) {
        console.log('No changes to update');
        return;
      }

      await SystemConfigurationService.updateSystemConfiguration(diff);
      console.log('Updated keys:', Object.keys(diff));
    } catch (err) {
      console.error('Error updating system configuration:', err);
      handleErrorWithToast(err);
    }
  };

  return initialValues && <ConfigurationForm initialValues={initialValues ?? undefined} onSubmit={handleSubmit} />;
}
