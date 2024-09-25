import { Loading, Product, Filter } from "@components/.";
import useProducts from "@hooks/useProducts";
import FilterSvg from "@assets/svgs/setting.svg?react";

const Products = () => {
  const {
    loading,
    error,
    productsFullInfo,
    count,
    handleFilter,
    categoryName,
    page,
    ENDPAGE,
    navigatePage,
    sortValue,
    handleSort,
    showFilter,
    handleToggleShowFilter,
  } = useProducts();

  return (
    <div className="productsPage">
      <Filter
        onChange={handleFilter}
        closeFilter={handleToggleShowFilter}
        isShow={showFilter}
      />
      <div className="products">
        <div className="head">
          <h2 className="title">{categoryName}</h2>
          <div className="right">
            <div className="info">
              <span className="count">
                showing{" "}
                {9 * (page - 1) +
                  1 +
                  "-" +
                  (ENDPAGE === page ? count : 9 * page)}{" "}
                of {count ? count : "?"} products
              </span>
              <div className="sort">
                <span className="text">sort by: </span>
                <select
                  onChange={(e) => handleSort(e.target.value)}
                  value={sortValue}
                >
                  <option value="none">none</option>
                  <option value="maxPrice">max price</option>
                  <option value="minPrice">min price</option>
                  <option value="topRating">topRating</option>
                  <option value="lowRating">lowRating</option>
                </select>
              </div>
            </div>
            <div className="svg" onClick={handleToggleShowFilter}>
              <FilterSvg />
            </div>
          </div>
        </div>
        <Loading status={loading} error={error} type="product">
          <div className="body">
            {productsFullInfo.map((item) => (
              <div className="product" key={item.id}>
                <Product {...item} />
              </div>
            ))}
          </div>
        </Loading>
        <hr />
        <div className="foot">
          <button
            className="prev"
            disabled={page <= 1}
            onClick={() => navigatePage(-1)}
          >
            prev
          </button>
          <span className="numberPage">{page}</span>
          <button
            className="next"
            disabled={page >= ENDPAGE}
            onClick={() => navigatePage(1)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
