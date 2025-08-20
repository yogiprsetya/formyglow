import { skincareTypesEnum } from '~/db/schema/inventory';

export const categoriesOptions = skincareTypesEnum.enumValues.map((value) => ({
  value,
  label: value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}));
