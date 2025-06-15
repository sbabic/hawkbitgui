'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import CalendarIcon from '../icons/calendar-icon';
import ChevronDownIcon from '../icons/chevron-down-icon';

interface DateTimePickerProps {
  initialDate?: Date;
  onChange: (date: Date) => void;
}

export default function DateTimePicker({ initialDate, onChange }: DateTimePickerProps) {
  const [date, setDate] = useState<Date>(initialDate ?? new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(date.getFullYear(), date.getMonth(), 1));
  const [hours, setHours] = useState<string>(formatHours(date));
  const [minutes, setMinutes] = useState<string>(formatMinutes(date));
  const [period, setPeriod] = useState<'AM' | 'PM'>(date.getHours() >= 12 ? 'PM' : 'AM');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange(date);
  }, [date, onChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  function formatHours(date: Date): string {
    const hours = date.getHours() % 12;
    return hours === 0 ? '12' : hours.toString().padStart(2, '0');
  }

  function formatMinutes(date: Date): string {
    return date.getMinutes().toString().padStart(2, '0');
  }

  function formatDate(date: Date): string {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} | ${formatHours(date)}:${formatMinutes(date)} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  }

  function handleDateSelect(day: number, isCurrentMonth = true) {
    const newDate = new Date(date);

    if (!isCurrentMonth) {
      if (day > 15) {
        // Previous month
        newDate.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
      } else {
        // Next month
        newDate.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
      }
    } else {
      newDate.setMonth(currentMonth.getMonth());
      newDate.setFullYear(currentMonth.getFullYear());
    }

    newDate.setDate(day);
    newDate.setSeconds(0);
    setDate(newDate);
  }

  function updateTime({ period, hours, minutes }: { period: 'AM' | 'PM'; hours: string; minutes: string }) {
    const newDate = new Date(date);
    let hrs = Number.parseInt(hours);

    if (period === 'PM' && hrs < 12) {
      hrs += 12;
    } else if (period === 'AM' && hrs === 12) {
      hrs = 0;
    }

    newDate.setHours(hrs);
    newDate.setMinutes(Number.parseInt(minutes));
    newDate.setSeconds(0);
    setDate(newDate);
  }

  function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === '' || /^\d{1,2}$/.test(value)) {
      const numValue = Number.parseInt(value || '0');
      if (numValue >= 0 && numValue <= 12) {
        setHours(value);
      }
    }
  }

  function handleMinutesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === '' || /^\d{1,2}$/.test(value)) {
      const numValue = Number.parseInt(value || '0');
      if (numValue >= 0 && numValue <= 59) {
        setMinutes(value);
      }
    }
  }

  function handlePeriodChange(newPeriod: 'AM' | 'PM') {
    setPeriod(newPeriod);
    updateTime({ period: newPeriod, hours, minutes });
  }

  function handleTimeBlur() {
    setHours(hours.padStart(2, '0'));
    setMinutes(minutes.padStart(2, '0'));
    updateTime({ period, hours, minutes });
  }

  function previousMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  }

  function getMonthData() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const previousMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: previousMonthLastDay - i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isSelected: date.getDate() === i && date.getMonth() === month && date.getFullYear() === year,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    return days;
  }

  function getMonthName(date: Date) {
    return date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
  }

  const days = getMonthData();

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputContainer} onClick={() => setShowCalendar(!showCalendar)}>
        <CalendarIcon className={styles.calendarIcon} />
        <div className={styles.dateDisplay}>{formatDate(date)}</div>
      </div>

      {showCalendar && (
        <div className={styles.calendarContainer}>
          <div className={styles.calendarHeader}>
            <div className={styles.monthNavigation}>
              <span className={styles.monthName}>{getMonthName(currentMonth)}</span>
              <div className={styles.navigationButtons}>
                <button type='button' className={styles.navButton} onClick={previousMonth}>
                  <ChevronDownIcon className={styles.navIcon} style={{ transform: 'rotate(90deg)' }} />
                </button>
                <button type='button' className={styles.navButton} onClick={nextMonth}>
                  <ChevronDownIcon className={styles.navIcon} style={{ transform: 'rotate(-90deg)' }} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.weekdays}>
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>

            <div className={styles.days}>
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`
                    ${styles.day} 
                    ${!day.isCurrentMonth ? styles.otherMonth : ''} 
                    ${day.isSelected ? styles.selectedDay : ''}
                  `}
                  onClick={() => handleDateSelect(day.day, day.isCurrentMonth)}
                >
                  {day.day}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.timeContainer}>
            <div className={styles.timeLabel}>Time</div>
            <div className={styles.timeInputs}>
              <input type='text' className={styles.timeInput} value={hours} onChange={handleHoursChange} onBlur={handleTimeBlur} />
              <span className={styles.timeSeparator}>:</span>
              <input type='text' className={styles.timeInput} value={minutes} onChange={handleMinutesChange} onBlur={handleTimeBlur} />
              <div className={styles.periodSelector}>
                <button
                  type='button'
                  className={`${styles.periodButton} ${period === 'AM' ? styles.activePeriod : ''}`}
                  onClick={() => handlePeriodChange('AM')}
                >
                  AM
                </button>
                <button
                  type='button'
                  className={`${styles.periodButton} ${period === 'PM' ? styles.activePeriod : ''}`}
                  onClick={() => handlePeriodChange('PM')}
                >
                  PM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
