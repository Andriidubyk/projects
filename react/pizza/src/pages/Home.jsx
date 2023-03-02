import React from "react";
import qs from "qs";
import Categories from "../components/Categories";
import PizzasBlock from "../components/PizzasBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzasBlock/Skeleton";

import { useSelector, useDispatch } from "react-redux";

import "../scss/app.scss";
import Pagination from "../components/Pagination";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizza, selectPizzaData } from "../redux/slices/pizzaSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const { items, status } = useSelector(selectPizzaData);
  // const [items, setItems] = React.useState([]);
  // const [categoryId, setCategoryId] = React.useState(0);

  const dispatch = useDispatch();
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const order = sortType.includes("-") ? "asc" : "desc";
  const sortBy = sortType.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";
  React.useEffect(() => {
    dispatch(
      fetchPizza({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );

    // setIsLoading(true);
    // fetch(
    //   `https://63a4a60f821953d4f2ba37f7.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  console.log(555);

  // React.useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sort.sortProperty,
  //     searchValue,
  //   });
  // }, [categoryId, sortType, searchValue, currentPage]);
  const pizzas = items.map((obj) => (
    <PizzasBlock
      id={obj.id}
      key={obj.id}
      title={obj.title}
      price={obj.price}
      imageUrl={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Усі піци</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Помилка 😕</h2>
          <p>На жаль, не вдалось отримати піци. Спробуйте пізніше</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
// import React from "react";
// import qs from "qs";
// import Categories from "../components/Categories";
// import PizzasBlock from "../components/PizzasBlock";
// import Sort from "../components/Sort";
// import Skeleton from "../components/PizzasBlock/Skeleton";

// import { useSelector, useDispatch } from "react-redux";

// import { SearchContext } from "../App";
// import "../scss/app.scss";
// import Pagination from "../components/Pagination";
// import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
// import { setItems, fetchPizza } from "../redux/slices/pizzaSlice";
// import axios from "axios";

// const Home = () => {
//   const categoryId = useSelector((state) => state.filter.categoryId);
//   const sortType = useSelector((state) => state.filter.sort.sortProperty);
//   const currentPage = useSelector((state) => state.filter.currentPage);
//   const items = useSelector((state) => state.pizza.items);

//   const { searchValue } = React.useContext(SearchContext);

//   const [isLoading, setIsLoading] = React.useState(true);
//   // const [categoryId, setCategoryId] = React.useState(0);

//   const dispatch = useDispatch();
//   const onClickCategory = (id) => {
//     dispatch(setCategoryId(id));
//   };
//   const onChangePage = (number) => {
//     dispatch(setCurrentPage(number));
//   };
//   React.useEffect(() => {
//     const getPizzas = async () => {
//       setIsLoading(false);
//     };
//     const order = sortType.includes("-") ? "asc" : "desc";
//     const sortBy = sortType.replace("-", "");
//     const category = categoryId > 0 ? `category=${categoryId}` : "";
//     const search = searchValue ? `&search=${searchValue}` : "";
//     try {
//       dispatch(
//         fetchPizza({
//           order,
//           sortBy,
//           category,
//           search,
//           currentPage,
//         })
//       );
//       setIsLoading(false);

//       console.log(666);
//     } catch (error) {
//       setIsLoading(false);
//       alert("Помилка при отриманні піц");
//       console.log("ERROR", error);
//     } finally {
//       setIsLoading(false);
//     }

//     // setIsLoading(true);
//     // fetch(
//     //   `https://63a4a60f821953d4f2ba37f7.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//     // )
//     //   .then((res) => {
//     //     return res.json();
//     //   })
//     //   .then((arr) => {
//     //     setItems(arr);
//     //     setIsLoading(false);
//     //   });

//     window.scrollTo(0, 0);
//   }, [categoryId, sortType, searchValue, currentPage]);
//   console.log(555);

//   // React.useEffect(() => {
//   //   const queryString = qs.stringify({
//   //     sortProperty: sort.sortProperty,
//   //     searchValue,
//   //   });
//   // }, [categoryId, sortType, searchValue, currentPage]);
//   const pizzas = items.map((obj) => (
//     <PizzasBlock
//       key={obj.id}
//       title={obj.title}
//       price={obj.price}
//       imageUrl={obj.imageUrl}
//       sizes={obj.sizes}
//       types={obj.types}
//     />
//   ));
//   return (
//     <div className="container">
//       <div className="content__top">
//         <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
//         <Sort />
//       </div>
//       <h2 className="content__title">Усі піци</h2>
//       <div className="content__items">
//         {isLoading
//           ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
//           : pizzas}
//       </div>
//       <Pagination currentPage={currentPage} onChangePage={onChangePage} />
//     </div>
//   );
// };
// export default Home;
