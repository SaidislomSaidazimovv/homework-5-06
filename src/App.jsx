import AppBar from "./components/AppBar";
import React, { useEffect, useState } from "react";
import "./App.css";
import { useAxios } from "./hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "./redux/actions";
import Cards from "./components/ProductCards";

const App = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    useAxios()
      .get("/products")
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: res.data });
      });
  }, [refresh]);

  console.log(products);

  return (
    <div className="flex flex-wrap justify-center gap-10">
      <AppBar setRefresh={setRefresh} refresh={refresh} />
      {products.map(item => <Cards item={item} />)}
    </div>
  );
};

export default App;
