export interface TaskInterface {
    id: string;
    name: string;
}
export interface TasksProps {
    symbol?: string;
    task: TaskInterface;
    onClick: (id: string, text: string) => void;
}
export interface UserPropsInterface {
    id: string;
    name: string;
}
export interface UserProps {
    symbol?: string;
    user: UserPropsInterface;
    onClick: (id: string, value: string) => void;
}
declare function App(): import("react/jsx-runtime").JSX.Element;
export default App;
