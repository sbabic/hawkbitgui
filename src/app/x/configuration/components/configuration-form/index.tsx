import React, { useState } from 'react';
import Checkbox from '@/app/components/checkbox';
import Select from '@/app/components/select';
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import styles from './styles.module.scss';

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
};

const actionStatuses = [
  { value: 'ERROR', label: 'ERROR' },
  { value: 'CANCELED', label: 'CANCELED' },
  { value: 'CANCELED,ERROR', label: 'ERROR + CANCELED' },
];

export default function ConfigurationForm({ onSubmit, initialValues }: ConfigurationFormProps) {
  const [form, setForm] = useState<FormStateType>(
    initialValues ?? {
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
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Repository Configuration */}
      <section>
        <h3 className={styles.sectionTitle}>Repository Configuration</h3>

        <label>
          <Checkbox
            checked={form.repository.autocloseRunningActions}
            onChange={(e) => handleNestedChange('repository', 'autocloseRunningActions', e.target.checked)}
          />
          Autoclose running actions when a new distribution set is assigned
        </label>

        <label>
          <Checkbox checked={form.repository.requestConfirmation} onChange={(e) => handleNestedChange('repository', 'requestConfirmation', e.target.checked)} />
          Request confirmation before download/install
        </label>

        <label>
          <Checkbox
            checked={form.repository.autoDelete.enabled}
            onChange={(e) => handleSubfieldChange('repository', 'autoDelete', 'enabled', e.target.checked)}
          />
          Automatically delete terminated actions
        </label>

        {form.repository.autoDelete.enabled && (
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
          </div>
        )}
      </section>

      {/* Rollout Configuration */}
      <section>
        <h3 className={styles.sectionTitle}>Rollout Configuration</h3>
        <label>
          <Checkbox checked={form.rollout.approveRollout} onChange={(e) => handleNestedChange('rollout', 'approveRollout', e.target.checked)} />
          Approve rollout before it can be started
        </label>
      </section>

      {/* Assignment Configuration */}
      <section>
        <h3 className={styles.sectionTitle}>Assignment Configuration</h3>
        <label>
          <Checkbox
            checked={form.assignment.allowMultiAssignments}
            onChange={(e) => handleNestedChange('assignment', 'allowMultiAssignments', e.target.checked)}
          />
          Defines if multiple distribution sets can be assigned to the same targets.
        </label>
        <label>
          <Checkbox
            checked={form.assignment.allowBatchAssignments}
            onChange={(e) => handleNestedChange('assignment', 'allowBatchAssignments', e.target.checked)}
          />
          Defines if distribution set can be assigned to multiple targets in a single batch message.
        </label>
      </section>

      {/* Authentication Configuration */}
      <section>
        <h3 className={styles.sectionTitle}>Authentication Configuration</h3>

        <label>
          <Checkbox
            checked={form.authentication.allowCertAuth.enabled}
            onChange={(e) => handleSubfieldChange('authentication', 'allowCertAuth', 'enabled', e.target.checked)}
          />
          Allow certificate-based authentication
        </label>

        {form.authentication.allowCertAuth.enabled && (
          <Input
            type='text'
            placeholder='SSL Issuer Hash'
            value={form.authentication.allowCertAuth.sslIssuerHash}
            onChange={(e) => handleSubfieldChange('authentication', 'allowCertAuth', 'sslIssuerHash', e.target.value)}
          />
        )}

        <label>
          <Checkbox checked={form.authentication.allowTokenAuth} onChange={(e) => handleNestedChange('authentication', 'allowTokenAuth', e.target.checked)} />
          Allow token authentication
        </label>

        <label>
          <Checkbox
            checked={form.authentication.allowGateway.enabled}
            onChange={(e) => handleSubfieldChange('authentication', 'allowGateway', 'enabled', e.target.checked)}
          />
          Allow gateway authentication
        </label>

        {form.authentication.allowGateway.enabled && (
          <div className={styles.inlineRow}>
            <Input type='text' value={form.authentication.allowGateway.gatewayToken} readOnly style={{ width: 400 }} />
          </div>
        )}

        {/*<label>*/}
        {/*  <Checkbox*/}
        {/*    checked={form.authentication.allowDownloadWithoutCreds.enabled}*/}
        {/*    onChange={(e) => handleSubfieldChange('authentication', 'allowDownloadWithoutCreds', 'enabled', e.target.checked)}*/}
        {/*  />*/}
        {/*  Allow artifact download without credentials*/}
        {/*</label>*/}
      </section>

      {/* Polling Configuration */}
      <section>
        <h3 className={styles.sectionTitle}>Polling Configuration</h3>

        <div className={styles.inlineRow}>
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
        </div>

        <div className={styles.inlineRow}>
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
        </div>

        <label>
          Maintenance Window Poll Count
          <Input
            type='number'
            value={form.polling.maintenanceWindowPollCount.value ?? ''}
            onChange={(e) => handleSubfieldChange('polling', 'maintenanceWindowPollCount', 'value', Number(e.target.value))}
            style={{ width: 100 }}
          />
        </label>
      </section>

      <Button type='submit'>Save Configuration</Button>
    </form>
  );
}
