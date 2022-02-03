import { createContext, useReducer, useEffect } from "react";
import { ReducerState } from "../utils/types";
import actionTypes from "./actionTypes";
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

  useEffect(() => {
    const storedState: string = localStorage.getItem("state") || '';
    if (storedState !== '') { 
      dispatch({ 
          type: actionTypes.RETURNING_USER_LOCAL_STORAGE, 
          payload: JSON.parse(storedState),
      });
    }
  }, []);

  useEffect(() => {
      localStorage.setItem("state", JSON.stringify(state)); 
  }, [state]);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

export default StateProvider;
