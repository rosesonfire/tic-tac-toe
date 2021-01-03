import { useState, Dispatch, SetStateAction } from 'react';

type ToggleFunc = () => void;

const useSwitch: (initialState?: boolean) => [
  boolean,
  ToggleFunc,
  Dispatch<SetStateAction<boolean>>,
] = (
  initialState = false,
) => {
  const [value, setValue] = useState(initialState);

  return [value, () => setValue(!value), setValue];
};

export default useSwitch;
