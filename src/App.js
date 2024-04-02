import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Auth/AuthOperations/Login";
import Register from "./Pages/Auth/AuthOperations/Register";
import Users from "./Pages/Dashboard/Users/Users";
import GoogleCallback from "./Pages/Auth/AuthOperations/GoogleCallback";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import EditUser from "./Pages/Dashboard/Users/EditUser";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import Writter from "./Pages/Dashboard/Writter";
import Err404 from "./Pages/Auth/Errors/404";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";
import Categories from "./Pages/Dashboard/Category/Categories";
import AddCategory from "./Pages/Dashboard/Category/AddCategory";
import EditCategory from "./Pages/Dashboard/Category/Edit Category";
import Test from "./Pages/Website/Test";
import Products from "./Pages/Dashboard/Products/Products";
import AddProduct from "./Pages/Dashboard/Products/AddProduct";
import EditProduct from "./Pages/Dashboard/Products/EditProduct";
import WebsiteCategories from "./Pages/Website/Categories/Categories";
import Website from "./Pages/Website/Website";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<WebsiteCategories />}></Route>
        </Route>

        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/users" element={<Users />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/*" element={<Err404 />}></Route>
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="users/:id" element={<EditUser />}></Route>
              <Route path="user/add" element={<AddUser />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Categories />}></Route>
              <Route path="category/add" element={<AddCategory />}></Route>
              <Route path="categories/:id" element={<EditCategory />}></Route>
              <Route path="products" element={<Products />}></Route>
              <Route path="product/add" element={<AddProduct />}></Route>
              <Route path="products/:id" element={<EditProduct />}></Route>
            </Route>

            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writter" element={<Writter />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
