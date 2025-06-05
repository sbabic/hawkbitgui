'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import TimeZonePicker from '@/app/components/timezone-picker';

export type FormData = {
  mode: 'forced' | 'soft' | 'downloadonly' | 'timeforced';
  maintenanceWindow: boolean;
  schedule: string;
  duration: string;
  timeZone: string;
  forcedDate?: string;
};

export default function ScheduleForm({ onChange }: { onChange?: (data: FormData) => void }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      mode: 'forced',
      maintenanceWindow: false,
      timeZone: '-04:00',
    },
  });

  const watchedFields = watch();

  useEffect(() => {
    onChange?.(watchedFields);
  }, [watchedFields, onChange]);

  const isMaintenanceWindow = watchedFields.maintenanceWindow;
  const isTimeForced = watchedFields.mode === 'timeforced';

  return (
    <form className={styles.form}>
      <fieldset className={styles.modeSelector}>
        <label>
          <input type='radio' value='forced' {...register('mode')} /> Forced
        </label>
        <label>
          <input type='radio' value='soft' {...register('mode')} /> Soft
        </label>
        <label>
          <input type='radio' value='downloadonly' {...register('mode')} /> Download Only
        </label>
        <label>
          <input type='radio' value='timeforced' {...register('mode')} /> Time Forced
        </label>
      </fieldset>

      {isTimeForced && (
        <div className={styles.fieldGroup}>
          <label>Forced Date *</label>
          <input
            type='datetime-local'
            {...register('forcedDate', {
              required: 'Forced date is required when mode is TIME_FORCED',
            })}
          />
          {errors.forcedDate && <p className={styles.error}>{errors.forcedDate.message}</p>}
        </div>
      )}

      <label className={styles.checkboxLabel}>
        <input type='checkbox' {...register('maintenanceWindow')} /> Use maintenance window
      </label>

      {isMaintenanceWindow && (
        <div className={styles.maintenanceFields}>
          <div className={styles.fieldGroup}>
            <label>Schedule *</label>
            <input
              type='text'
              placeholder='0 0 3 ? * 6'
              {...register('schedule', {
                required: 'Schedule is required',
                pattern: {
                  value: /^.+$/, // Replace with cron validation regex if needed
                  message: 'Please enter a valid Cron expression',
                },
              })}
            />
            {errors.schedule && <p className={styles.error}>{errors.schedule.message}</p>}
          </div>

          <div className={styles.fieldGroup}>
            <label>Duration *</label>
            <input type='text' placeholder='hh:mm:ss' {...register('duration', { required: 'Duration is required' })} />
            {errors.duration && <p className={styles.error}>{errors.duration.message}</p>}
          </div>

          <div className={styles.fieldGroup}>
            <label>Time Zone (from GMT)</label>
            <TimeZonePicker {...register('timeZone')} />
          </div>
        </div>
      )}
    </form>
  );
}
