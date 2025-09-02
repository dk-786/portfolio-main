import { FiList, FiGrid } from "react-icons/fi";

export default function ViewControls({
  viewMode,
  gridCols,
  setViewMode,
  setGridCols,
  sortBy,
  setSortBy,
  productCount,
}: {
  viewMode: "grid" | "list";
  gridCols: number;
  setViewMode: (v: "grid" | "list") => void;
  setGridCols: (c: number) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  productCount: number;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          There {productCount === 1 ? "is" : "are"} {productCount} product
          {productCount === 1 ? "" : "s"}.
        </div>

        <div className="flex items-center gap-2 border rounded px-2 py-1">
          <button
            onClick={() => {
              setViewMode("list");
              setGridCols(1);
            }}
            title="List view"
            className={`p-1 cursor-pointer ${
              viewMode === "list" ? "bg-gray-200" : ""
            }`}
          >
            <FiList />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            title="Grid view"
            className={`p-1 cursor-pointer ${
              viewMode === "grid" ? "bg-gray-200" : ""
            }`}
          >
            <FiGrid />
          </button>

          {viewMode === "grid" && (
            <div className="flex items-center ml-2 gap-1">
              {[2, 3, 4].map((c) => (
                <button
                  key={c}
                  onClick={() => setGridCols(c)}
                  className={`w-6 h-6 border rounded text-xs cursor-pointer ${
                    gridCols === c ? "bg-gray-200" : ""
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-600">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-3 py-2 text-sm cursor-pointer"
        >
          <option value="relevance">Relevance</option>
          <option value="price_low_high">Price, low to high</option>
          <option value="price_high_low">Price, high to low</option>
          <option value="name_az">Name, A to Z</option>
          <option value="name_za">Name, Z to A</option>
        </select>
      </div>
    </div>
  );
}
