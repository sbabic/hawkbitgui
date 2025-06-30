import React, { useEffect, useState } from 'react';
import Checkbox from '@/app/components/checkbox';
import Select from '@/app/components/select';
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import styles from './styles.module.scss';
import Skeleton from 'react-loading-skeleton';

export type FormStateType = {
  repository: {
    autocloseRunningActions: boolean;
    requestConfirmation: boolean;
    autoDelete: {
      enabled: boolean;
      deleteStatus: string;
      deleteAfterDays: number;
    };
  };
  rollout: {
    approveRollout: boolean;
  };
  assignment: {
    allowMultiAssignments: boolean;
    allowBatchAssignments: boolean;
  };
  authentication: {
    allowCertAuth: {
      enabled: boolean;
      sslIssuerHash: string;
    };
    allowTokenAuth: boolean;
    allowGateway: {
      enabled: boolean;
      gatewayToken: string;
    };
    allowDownloadWithoutCreds: {
      enabled: boolean;
    };
  };
  polling: {
    pollingTime: {
      enabled: boolean;
      value: string;
    };
    pollingOverdueTime: {
      enabled: boolean;
      value: string;
    };
    maintenanceWindowPollCount: {
      value?: number;
    };
  };
};

type ConfigurationFormProps = {
  onSubmit?: (data: FormStateType) => void;
  initialValues?: FormStateType;
  loading?: boolean;
};

const actionStatuses = [
  { value: 'ERROR', label: 'ERROR' },
  { value: 'CANCELED', label: 'CANCELED' },
  { value: 'CANCELED,ERROR', label: 'ERROR + CANCELED' },
];

export default function ConfigurationForm({ onSubmit, initialValues, loading = false }: ConfigurationFormProps) {
  const defaultFormState: FormStateType = {
    repository: {
      autocloseRunningActions: false,
      requestConfirmation: false,
      autoDelete: {
        enabled: false,
        deleteStatus: '',
        deleteAfterDays: 0,
      },
    },
    rollout: {
      approveRollout: false,
    },
    assignment: {
      allowMultiAssignments: false,
      allowBatchAssignments: false,
    },
    authentication: {
      allowCertAuth: {
        enabled: false,
        sslIssuerHash: '',
      },
      allowTokenAuth: false,
      allowGateway: {
        enabled: false,
        gatewayToken: '',
      },
      allowDownloadWithoutCreds: {
        enabled: false,
      },
    },
    polling: {
      pollingTime: {
        enabled: false,
        value: '',
      },
      pollingOverdueTime: {
        enabled: false,
        value: '',
      },
      maintenanceWindowPollCount: {},
    },
  };

  const [form, setForm] = useState<FormStateType>(initialValues ?? defaultFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      onSubmit?.(form);
    }
  };

  const handleNestedChange = <T extends keyof FormStateType>(section: T, field: keyof FormStateType[T], value: FormStateType[T][typeof field]) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setForm(initialValues ?? defaultFormState);
  };

  const handleSubfieldChange = <T extends keyof FormStateType, K extends keyof FormStateType[T], F extends keyof FormStateType[T][K]>(
    section: T,
    parent: K,
    field: F,
    value: FormStateType[T][K][F]
  ) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
          [field]: value,
        },
      },
    }));
  };

  const maybeSkeleton = (content: React.ReactNode, width: string | number = '100%', height: string | number = 24) =>
    loading ? <Skeleton width={width} height={height} /> : content;

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  return (
    <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
      {/* Repository */}
      <section>
        <h3 className={styles.sectionTitle}>Repository Configuration</h3>
        {maybeSkeleton(
          <label>
            <Checkbox
              checked={form.repository.autocloseRunningActions}
              onChange={(e) => handleNestedChange('repository', 'autocloseRunningActions', e.target.checked)}
            />
            Autoclose running actions when a new distribution set is assigned
          </label>
        )}

        {maybeSkeleton(
          <label>
            <Checkbox
              checked={form.repository.requestConfirmation}
              onChange={(e) => handleNestedChange('repository', 'requestConfirmation', e.target.checked)}
            />
            Request confirmation before download/install
          </label>
        )}

        {maybeSkeleton(
          <label>
            <Checkbox
              checked={form.repository.autoDelete.enabled}
              onChange={(e) => handleSubfieldChange('repository', 'autoDelete', 'enabled', e.target.checked)}
            />
            Automatically delete terminated actions
          </label>
        )}

        {form.repository.autoDelete.enabled &&
          maybeSkeleton(
            <div className={styles.inlineRow}>
              <span>Delete actions with status</span>
              <Select
                value={form.repository.autoDelete.deleteStatus}
                onChange={(e) => handleSubfieldChange('repository', 'autoDelete', 'deleteStatus', e.target.value)}
              >
                {actionStatuses.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              <span>after</span>
              <Input
                type='number'
                min={1}
                value={form.repository.autoDelete.deleteAfterDays}
                onChange={(e) => handleSubfieldChange('repository', 'autoDelete', 'deleteAfterDays', Number(e.target.value))}
                style={{ width: 100 }}
              />
              <span>day(s)</span>
            </div>,
            600,
            32
          )}
      </section>

      {/* Rollout */}
      <section>
        <h3 className={styles.sectionTitle}>Rollout Configuration</h3>
        {maybeSkeleton(
          <label>
            <Checkbox checked={form.rollout.approveRollout} onChange={(e) => handleNestedChange('rollout', 'approveRollout', e.target.checked)} />
            Approve rollout before it can be started
          </label>
        )}
      </section>

      {/* Assignment */}
      <section>
        <h3 className={styles.sectionTitle}>Assignment Configuration</h3>
        {maybeSkeleton(
          <label>
            <Checkbox
              checked={form.assignment.allowMultiAssignments}
              onChange={(e) => handleNestedChange('assignment', 'allowMultiAssignments', e.target.checked)}
            />
            Defines if multiple distribution sets can be assigned to the same targets.
          </label>
        )}

        {maybeSkeleton(
          <label>
            <Checkbox
              checked={form.assignment.allowBatchAssignments}
              onChange={(e) => handleNestedChange('assignment', 'allowBatchAssignments', e.target.checked)}
            />
            Defines if distribution set can be assigned to multiple targets in a single batch message.
          </label>
        )}
      </section>

      {/* Authentication */}
      <section>
        <h3 className={styles.sectionTitle}>Authentication Configuration</h3>
        {maybeSkeleton(
          <label>
            <Checkbox
              checked={form.authentication.allowCertAuth.enabled}
              onChange={(e) => handleSubfieldChange('authentication', 'allowCertAuth', 'enabled', e.target.checked)}
            />
            Allow certificate-based authentication
          </label>
        )}

        {form.authentication.allowCertAuth.enabled &&
          maybeSkeleton(
            <Input
              type='text'
              placeholder='SSL Issuer Hash'
              value={form.authentication.allowCertAuth.sslIssuerHash}
              onChange={(e) => handleSubfieldChange('authentication', 'allowCertAuth', 'sslIssuerHash', e.target.value)}
            />,
            400
          )}

        {maybeSkeleton(
          <label>
            <Checkbox checked={form.authentication.allowTokenAuth} onChange={(e) => handleNestedChange('authentication', 'allowTokenAuth', e.target.checked)} />
            Allow token authentication
          </label>
        )}

        {maybeSkeleton(
          <label>
            <Checkbox
              checked={form.authentication.allowGateway.enabled}
              onChange={(e) => handleSubfieldChange('authentication', 'allowGateway', 'enabled', e.target.checked)}
            />
            Allow gateway authentication
          </label>
        )}

        {form.authentication.allowGateway.enabled &&
          maybeSkeleton(
            <Input
              type='text'
              value={form.authentication.allowGateway.gatewayToken}
              style={{ width: 400 }}
              onChange={(e) => handleSubfieldChange('authentication', 'allowGateway', 'gatewayToken', e.target.value)}
            />,
            400
          )}
      </section>

      {/* Polling */}
      <section>
        <h3 className={styles.sectionTitle}>Polling Configuration</h3>

        {maybeSkeleton(
          <label>
            Polling Time
            <Input
              type='text'
              pattern='\d{2}:\d{2}:\d{2}'
              placeholder='HH:MM:SS'
              value={form.polling.pollingTime.value}
              onChange={(e) => handleSubfieldChange('polling', 'pollingTime', 'value', e.target.value)}
            />
          </label>
        )}

        {maybeSkeleton(
          <label>
            Polling Overdue Time
            <Input
              type='text'
              pattern='\d{2}:\d{2}:\d{2}'
              placeholder='HH:MM:SS'
              value={form.polling.pollingOverdueTime.value}
              onChange={(e) => handleSubfieldChange('polling', 'pollingOverdueTime', 'value', e.target.value)}
            />
          </label>
        )}

        {maybeSkeleton(
          <label>
            Maintenance Window Poll Count
            <Input
              type='number'
              value={form.polling.maintenanceWindowPollCount.value ?? ''}
              onChange={(e) => handleSubfieldChange('polling', 'maintenanceWindowPollCount', 'value', Number(e.target.value))}
              style={{ width: 100 }}
            />
          </label>
        )}
      </section>

      {!loading && (
        <div className={styles.actionButtons}>
          <Button type='submit'>Save</Button>
          <Button variant='outline' type='reset'>
            Reset
          </Button>
        </div>
      )}
    </form>
  );
}
