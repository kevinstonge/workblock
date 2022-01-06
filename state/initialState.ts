export interface ReducerState {
  email: String;
  token: String | undefined;
  userID: String | undefined;
  blocks: Object[];
}

export interface State {
  state: ReducerState;
  dispatch: React.Dispatch<any>;
}
export const initialState: ReducerState = {
  email: '',
  token: undefined,
  userID: undefined,
  blocks: [{}],
};
