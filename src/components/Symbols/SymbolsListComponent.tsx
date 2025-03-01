export interface SymbolItemInterface {
  id: string;
  name: string;
}

interface SymbolsListComponentProps {
  symbol?: string;
  item: SymbolItemInterface;
  onClick: (id: string, text: string) => void;
}
const SymbolsListComponent = ({
  symbol,
  onClick,
  item,
}: SymbolsListComponentProps) => {
  return (
    <div
      onClick={() => {
        onClick(item.id, item.name);
      }}
      className="flex gap-2 justify-between, items-center"
    >
      <div>{symbol}</div>
      <div>{item.name}</div>
    </div>
  );
};

export default SymbolsListComponent;
