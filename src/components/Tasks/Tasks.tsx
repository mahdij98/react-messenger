export interface TaskInterface {
  id: string;
  name: string;
}

export interface TasksProps {
  symbol?: string;
  task: TaskInterface;
  onClick: (id: string, text: string) => void;
}
const Tasks = ({ symbol, onClick, task }: TasksProps) => {
  return (
    <div
      onClick={() => {
        onClick(task.id, task.name);
      }}
      className="flex gap-2 justify-between, items-center"
    >
      <div>{symbol}</div>
      <div>{task.name}</div>
    </div>
  );
};

export default Tasks;
