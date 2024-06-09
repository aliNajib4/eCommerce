import { Category, GridList, Loading } from "@components/.";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { loading, error, records } = useCategories();

  return (
    <>
      <Loading status={loading} error={error} type="category">
        <GridList
          records={records}
          recordItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
