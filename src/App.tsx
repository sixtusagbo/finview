import { useEffect, useState } from "react";
import { fetchIncomeStatements, FilterParams } from "./utils/api";
import SortIcon from "./components/SortIcon";
import {
  SortableColumn,
  SortOrder,
  IncomeStatement,
  formatError,
} from "./types";

export default function App() {
  const [statements, setStatements] = useState<IncomeStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});
  const [sortBy, setSortBy] = useState<SortableColumn>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchIncomeStatements({
          ...filters,
          sort_by: sortBy,
          order: sortOrder,
        });
        setStatements(data);
        setError(null);
      } catch (err: unknown) {
        setError(formatError(err));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filters, sortBy, sortOrder]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setFilters((prev) => ({
      ...prev,
      [name]: value ? Number(value) : undefined,
    }));
  };

  const handleSort = (column: SortableColumn) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Apple's annual income statements
      </h1>

      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Year Range</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="start_year"
                placeholder="Start Year"
                className="border rounded px-2 py-1 w-full"
                onChange={handleFilterChange}
                min="1900"
                max="2100"
              />
              <input
                type="number"
                name="end_year"
                placeholder="End Year"
                className="border rounded px-2 py-1 w-full"
                onChange={handleFilterChange}
                min="1900"
                max="2100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Revenue Range ($)</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="min_revenue"
                placeholder="Min"
                className="border rounded px-2 py-1 w-full"
                onChange={handleFilterChange}
                min="0"
              />
              <input
                type="number"
                name="max_revenue"
                placeholder="Max"
                className="border rounded px-2 py-1 w-full"
                onChange={handleFilterChange}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Net Income Range ($)</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="min_net_income"
                placeholder="Min"
                className="border rounded px-2 py-1 w-full"
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="max_net_income"
                placeholder="Max"
                className="border rounded px-2 py-1 w-full"
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {error ? (
        <div className="text-center text-red-500 p-4 whitespace-pre-line">
          {error}
        </div>
      ) : (
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
              <div className="text-gray-600">Loading...</div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort("date")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    Date{" "}
                    <SortIcon
                      column="date"
                      currentSort={sortBy}
                      order={sortOrder}
                    />
                  </th>
                  <th
                    onClick={() => handleSort("revenue")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    Revenue{" "}
                    <SortIcon
                      column="revenue"
                      currentSort={sortBy}
                      order={sortOrder}
                    />
                  </th>
                  <th
                    onClick={() => handleSort("net_income")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    Net Income{" "}
                    <SortIcon
                      column="net_income"
                      currentSort={sortBy}
                      order={sortOrder}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gross Profit
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    title="Earnings Per Share">
                    EPS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operating Income
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {statements.map((statement) => (
                  <tr key={statement.date} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {statement.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${statement.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${statement.net_income.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${statement.gross_profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${statement.eps.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${statement.operating_income.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
