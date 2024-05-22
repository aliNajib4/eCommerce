import { Category } from "@components/.";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useEffect } from "react";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    if (records.length === 0) dispatch(actGetCategories());
  }, [dispatch, records]);

  return (
    <div>
      {loading === "succeeded" ? (
        <div className="grid grid-cols-1 gap-5 px-10 sm:grid-cols-3">
          {records.map((category) => (
            <Category key={category.id} {...category} />
          ))}
        </div>
      ) : loading === "pending" || loading === "idle" ? (
        <p className="text-center text-3xl font-bold text-emerald-500">
          Loading...
        </p>
      ) : (
        <p className="text-center text-3xl font-bold text-red-500">
          No categories found
        </p>
      )}
    </div>
  );
};

export default Categories;
