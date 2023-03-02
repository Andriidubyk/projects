import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="11" y="258" rx="10" ry="10" width="260" height="30" />
    <rect x="9" y="307" rx="10" ry="10" width="260" height="90" />
    <rect x="10" y="412" rx="10" ry="10" width="40" height="27" />
    <rect x="160" y="408" rx="10" ry="10" width="103" height="33" />
    <circle cx="137" cy="120" r="118" />
  </ContentLoader>
);

export default Skeleton;
