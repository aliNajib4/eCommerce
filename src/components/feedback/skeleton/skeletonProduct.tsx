import ContentLoader from "react-content-loader";

const skeletonProduct = () => (
  <ContentLoader
    speed={2}
    width={330}
    height={330}
    viewBox="0 0 320 330"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="32" ry="32" width="330" height="330" />
  </ContentLoader>
);

export default skeletonProduct;
