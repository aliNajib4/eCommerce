import { Category, Loading } from "@components/.";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { loading, error, records } = useCategories();

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
