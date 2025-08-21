import { dayOfWeekEnum, routineFrequencyEnum, routineTypeEnum } from '~/db/schema/routines';

export const dayOfWeekOptions = dayOfWeekEnum.enumValues.map((value) => ({
  value,
  label: value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}));

export const routineFrequencyOptions = routineFrequencyEnum.enumValues.map((value) => ({
  value,
  label: value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}));

export const routineTypeOptions = routineTypeEnum.enumValues.map((value) => ({
  value,
  label: value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}));
