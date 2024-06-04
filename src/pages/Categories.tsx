import { Category, Loading } from "@components/.";
import { actGetCategories, cleanUp } from "@store/categories/categoriesSlice";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useEffect } from "react";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    dispatch(actGetCategories());
    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch]);

  return (
    <div>
      <Loading status={loading} error={error}>
        <div className="grid grid-cols-1 gap-5 px-10 sm:grid-cols-3">
          {records.map((category) => (
            <Category key={category.id} {...category} />
          ))}
        </div>
      </Loading>
    </div>
  );
};

export default Categories;
