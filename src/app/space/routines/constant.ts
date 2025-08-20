import { routineTypeEnum, routineFrequencyEnum, dayOfWeekEnum } from '~/db/schema/routines';

export const routineTypeOptions = routineTypeEnum.enumValues.map((value) => ({
  value,
  label: value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}));

export const routineFrequencyOptions = routineFrequencyEnum.enumValues.map((value) => ({
  value,
  label: value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}));

export const dayOfWeekOptions = dayOfWeekEnum.enumValues.map((value) => ({
  value,
  label: value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}));
