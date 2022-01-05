export interface ReducerState {
  username: String;
  blocks: Object[];
}

export interface State {
  state: ReducerState;
  dispatch: React.Dispatch<any>;
}
export const initialState: ReducerState = { username: '', blocks: [{}] };
