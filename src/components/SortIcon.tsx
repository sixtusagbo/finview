import { SortableColumn, SortOrder } from '../types';

interface SortIconProps {
  column: SortableColumn;
  currentSort: SortableColumn;
  order: SortOrder;
}

const SortIcon = ({ column, currentSort, order }: SortIconProps) => {
  if (currentSort !== column) return <span className="text-gray-300">↕</span>;
  return order === 'asc' ? <span>↑</span> : <span>↓</span>;
};

export default SortIcon;
