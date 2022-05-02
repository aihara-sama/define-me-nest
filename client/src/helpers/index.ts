import { SyntheticEvent } from 'react';

export const setInputValue = (
  e: SyntheticEvent,
  cb: (value: string) => void,
) => {
  const target = e.target as HTMLInputElement;
  const value = target.value;

  cb(value);
};
