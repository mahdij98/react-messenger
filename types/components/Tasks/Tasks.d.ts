export interface TaskInterface {
    id: string;
    name: string;
}
export interface TasksProps {
    symbol?: string;
    task: TaskInterface;
    onClick: (id: string, text: string) => void;
}
declare const Tasks: ({ symbol, onClick, task }: TasksProps) => import("react/jsx-runtime").JSX.Element;
export default Tasks;
