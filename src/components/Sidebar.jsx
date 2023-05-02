import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBlogs } from "../RTK/features/filter/filterSlice";
import { sortBlogs } from "../RTK/features/sort/sortSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("all");

  switch (sort) {
    case "newest":
      dispatch(sortBlogs("newest"));
      break;

    case "most_liked":
      dispatch(sortBlogs("most_liked"));
      break;

    default:
      dispatch(sortBlogs(""));
      break;
  }

  switch (filter) {
    case "saved":
      dispatch(filterBlogs("saved"));
      break;

    default:
      dispatch(filterBlogs("all"));
      break;
  }

  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            {/* <!-- handle filter on button click --> */}
            <div>
              <input
                type="radio"
                name="filter"
                value="all"
                id="lws-all"
                checked={filter === "all"}
                className="radio"
                onChange={(e) => setFilter(e.target.value)}
              />
              <label htmlFor="lws-all">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                value="saved"
                checked={filter === "saved"}
                id="lws-saved"
                className="radio"
                onChange={(e) => setFilter(e.target.value)}
              />
              <label htmlFor="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
