import { useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export const useRefSelector = (selector: (state: RootState) => any) => {
  const state = useSelector(selector);
  const stateRef = useRef<typeof state>({ ...state });

  useEffect(() => {
    stateRef.current = { ...state };
  }, [state]);

  return { ...stateRef.current };
};
export const useRefState = (initialValue: any) => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef<typeof initialValue>(state);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    stateRef.current = state;
    setTimeout(forceUpdate);
  }, [state]);

  return [stateRef.current, setState];
};
