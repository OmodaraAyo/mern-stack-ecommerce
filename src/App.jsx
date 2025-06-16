import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Slide, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import SummaryApi from "./service";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [countCartItems, setCountCartItems] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchNumberOfProductInUserCart = async () =>{
    const dataResponse = await fetch(SummaryApi.countNumberOfProductInCart.url, {
      method : SummaryApi.countNumberOfProductInCart.method,
      credentials : "include",
      headers : SummaryApi.countNumberOfProductInCart.headers
    });

    const dataApi = await dataResponse.json();
    setCountCartItems(dataApi?.data?.count)
  }

  useEffect(() => {
    // **user Details
    fetchUserDetails();

    //** number of cart items */
    fetchNumberOfProductInUserCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          countCartItems, //cart items
          fetchNumberOfProductInUserCart,
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Slide}
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] py-16 px-4">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
