'use client';

import React, { InputHTMLAttributes } from 'react';

type TimeZonePickerProps = {} & InputHTMLAttributes<HTMLSelectElement>;

const timeZones = Intl.supportedValuesOf('timeZone');

function formatOffset(timeZone: string): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  };
  const formatter = new Intl.DateTimeFormat('en-US', {
    ...options,
    timeZoneName: 'shortOffset',
  });
  const parts = formatter.formatToParts(now);
  const offset = parts.find((p) => p.type === 'timeZoneName')?.value || '';
  return offset;
}

export default function TimeZonePicker(props: TimeZonePickerProps) {
  return (
    <select {...props}>
      {timeZones.map((tz) => (
        <option key={tz} value={tz}>
          (UTC{formatOffset(tz)}) {tz}
        </option>
      ))}
    </select>
  );
}
