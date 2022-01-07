export interface ReducerState {
  email: String;
  token: String | undefined;
  userID: String | undefined;
  blocks: Object[] | undefined;
  tasks: Object[] | undefined;
  activeBlock: String | undefined;
  playing: Boolean | undefined;
  timestamp: Number | undefined;
}

export interface State {
  state: ReducerState;
  dispatch: React.Dispatch<any>;
}
export const initialState: ReducerState = {
  email: '',
  token: undefined,
  userID: undefined,
  blocks: undefined,
  tasks: undefined,
  activeBlock: undefined,
  playing: undefined,
  timestamp: undefined,
};
