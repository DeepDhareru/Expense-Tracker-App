export default function FilterSection({

  search,
  setSearch,

  filterType,
  setFilterType,

}) {

  return (

    <div className="flex flex-col md:flex-row gap-4 mt-8">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded-xl w-full"
      />

      {/* FILTER */}
      <select
        value={filterType}
        onChange={(e) =>
          setFilterType(e.target.value)
        }
        className="border p-3 rounded-xl md:w-[220px]"
      >

        <option value="all">
          All
        </option>

        <option value="income">
          Income
        </option>

        <option value="expense">
          Expense
        </option>

      </select>

    </div>
  );
}