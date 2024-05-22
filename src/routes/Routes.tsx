import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes as RoutesReactRouterDom, useNavigate } from 'react-router-dom';
import { GenericNotFound } from './paths';
import MiComponente from 'src/components/login/login';
import Footer from 'src/components/footer/footer';
import TextExampleClass from 'src/components/home/TextExample';
import UserProfile from 'src/pages/userProfile/userProfile';
import MyProducts from 'src/pages/myProducts/myProducts';
import Register from 'src/components/register/register';
import EditProfile from 'src/components/editUser/editProfile';
import CreateProducto from 'src/components/CreateProducto/CreateProducto';
import ProductDetailPage from 'src/components/productDetail/productDetail';
import MyFavorites from 'src/pages/myFavorites/myFavorites';
import AdminPanel from 'src/pages/adminPanel/adminPanel';
import AddCategoryForm from 'src/pages/categoriFrom/CategoryForm';

export const Routes = () => {
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname === 'admin.rupop.net' && !redirected) {
      navigate('/admin-panel');
      setRedirected(true);
    }
  }, [redirected, navigate]);

  return (
    <Suspense fallback={<p>cargando</p>}>
      <RoutesReactRouterDom>
        <Route path="/" element={<TextExampleClass />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<GenericNotFound />} />
        <Route path="/login" element={<MiComponente />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-edit" element={<EditProfile />} />
        <Route path="/create-product" element={<CreateProducto />} />
        <Route path="/detail-product/:id" element={<ProductDetailPage />} />
        <Route path="/MyProducts" element={<MyProducts />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/category/create" element={<AddCategoryForm />} />
      </RoutesReactRouterDom>
    </Suspense>
  );
};
