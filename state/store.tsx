import { createContext, useReducer } from "react";
import { ReducerState } from "../utils/types";
import { initialState } from "./initialState";
import { reducer } from "./reducer";
interface ContextWithDispatch extends ReducerState {
  dispatch: Function;
}
export const store = createContext<ContextWithDispatch>({
  ...initialState,
  dispatch: () => null,
});

const StateProvider = ({ children }: any) => {
  const { Provider } = store;
  const [state, dispatch]: [ReducerState, any] = useReducer(
    reducer,
    initialState
  );
  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

export default StateProvider;
