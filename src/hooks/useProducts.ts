import { Price } from "@components/index";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProducts, cleanUp } from "@store/products/productsSlice";
import { type TProduct, TFilter } from "@types/.";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const handleProducts = (
  products: TProduct[] | undefined,
  filter: TFilter,
  sort: string,
  page: number,
): { productsFullInfo: TProduct[]; count: number } => {
  if (!products) return { productsFullInfo: [], count: 0 };

  // filter data
  let productsFullInfo = products.filter((el) => {
    if (Object.keys(filter).length === 0) return true;
    if ((filter.price || filter.price === 0) && el.price <= filter?.price) {
      return true;
    } else if (filter.type && filter?.type?.includes(el.type)) {
      return true;
    } else if (filter.colors) {
      for (const color of filter.colors || []) {
        if (el.color?.includes(color)) {
          return true;
        }
      }
    } else if (filter.size) {
      for (const size of filter.size || []) {
        if (el.size?.includes(size)) {
          return true;
        }
      }
    }
    return false;
  });

  // count real products after filter
  const count = productsFullInfo.length;

  //sort products
  if (sort !== "none") {
    productsFullInfo = productsFullInfo.sort((a, b) => {
      switch (sort) {
        case "maxPrice":
          return b.price - a.price;
        case "minPrice":
          return a.price - b.price;
        case "topRating":
          return b.rating - a.rating;
        case "lowRating":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  }

  // limit products based in page
  productsFullInfo = productsFullInfo.slice((page - 1) * 9, page * 9);

  return { productsFullInfo, count };
};

const useProducts = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const [products, setProducts] = useState<TProduct[]>([]);
  const count = useRef(records.length);
  const ENDPAGE = Math.ceil(count.current / 9);

  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("none");
  const [dataFilter, setDataFilter] = useState<TFilter>({});
  const [showFilter, setShowFilter] = useState(false);

  const navigatePage = (dir: -1 | 1) => {
    setPage((prev) => prev + dir);
  };

  const handleSort = (value: string) => {
    setSortValue(value);
    setPage(1);
  };

  const handleFilter = useCallback((data: TFilter) => {
    setDataFilter(data);
  }, []);

  const handleToggleShowFilter = useCallback(() => {
    setShowFilter((prev) => !prev);
  }, []);

  useEffect(() => {
    const { productsFullInfo, count: c } = handleProducts(
      records,
      dataFilter,
      sortValue,
      page,
    );
    setProducts(productsFullInfo);
    count.current = c;
    // setProducts(handleProducts(records, dataFilter, sortValue, page));
  }, [records, dataFilter, sortValue, page]);

  useEffect(() => {
    const promise = dispatch(
      actGetProducts({
        type: params.id ? params.id : "all",
      }),
    );

    return () => {
      promise.abort();
    };
  }, [dispatch, params.id]);
  useEffect(() => {
    return () => {
      dispatch(cleanUp());
      setShowFilter(false);
      setSortValue("none");
      setPage(1);
      setDataFilter({});
      // setProducts([]);
    };
  }, [dispatch]);

  return {
    loading,
    error,
    productsFullInfo: products,
    count: count.current,
    handleFilter,
    categoryName: params.id ? params.id : "all",
    page,
    ENDPAGE,
    navigatePage,
    sortValue,
    handleSort,
    showFilter,
    handleToggleShowFilter,
  };
};

export default useProducts;
