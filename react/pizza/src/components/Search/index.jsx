import React from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";
import debounce from "lodash.debounce";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const inputRef = React.useRef();
  const onClickClean = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        className={styles.input}
        type="text"
        placeholder="Пошук товарів..."
      />
      {value && (
        <svg
          onClick={onClickClean}
          className={styles.close}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
export default Search;
