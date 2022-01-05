import { createContext, useReducer } from 'react';
import { initialState, State, ReducerState } from './initialState';
import { reducer } from './reducer';
export const store = createContext<State>({
  state: initialState,
  dispatch: () => {},
});

const StateProvider = ({ children }: any) => {
  const { Provider } = store;
  const [state, dispatch]: [ReducerState, any] = useReducer(
    reducer,
    initialState
  );
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default StateProvider;
