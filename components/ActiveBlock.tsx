import type { NextPage } from 'next';

const ActiveBlock: NextPage = () => {
  return (
    <div className="activeBlock">
      <h2>Block Name: _</h2>
      <p>Time remaining in block: </p>
      <p>Time remaining on current task: </p>
      <h2>Task List:</h2>
      <div className="tasklist">
        <div>task1</div>
        <div>task2</div>
        <div>task3</div>
        <div>task4</div>
      </div>
    </div>
  );
};
export default ActiveBlock;

//need to display TIME (remaining (?option for elapsed/remaining/both?))
//need to display current task description prominently
//other tasks past and future still visible (somehow) - small list, that pops up modal details
//full list always displayed, current task expanded, other tasks collapsed to just title in scrollable view - each item has view button to pop up view/edit dialog
