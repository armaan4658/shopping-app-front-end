import './App.css';
import {NavBar} from './components/logo.js';
import {Home} from './components/home.js';
import {Shoe} from './components/shoe.js';
import {Wallet} from './components/wallet.js';
import {Product} from './components/product.js';
import {PlaceOrder} from './components/placeOrder.js'
import {MyOrders} from './components/myOrder.js'
import {MyProfile} from './components/myProfile.js';
import {ForgotPassword} from './components/forgotPassword.js';
import {ResetPassword} from './components/resetPassword.js';
import {Switch , Route, Redirect} from 'react-router-dom';
import React , {useEffect, useState} from 'react';
import axios from "axios";

export const IsLoginContext = React.createContext(null);
export const CheckLogin = React.createContext(null);
export const Res = React.createContext(null);
export const SetRes = React.createContext(null);
export const CartBadge = React.createContext(null);
export const GetCartSize = React.createContext(null);
function App() {
  const [isLogin,setIsLogin] = useState(false);
  const [cartBadge,setCartBadge] = useState(0);
  const [res,setRes] = useState([]);
  const checkLogin = () => {
    axios.get('https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/checklogin',{withCredentials:true})
    .then(res=>{
      if(res.status===200){
          if(res.data.login==="true"){
              setIsLogin(true);
          }
        }
    })
    .catch(res=>console.log(res))
  }
  const getCartSize = () => {
    if(isLogin){axios.get(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/get/${localStorage.getItem('id')}`,{withCredentials:true})
    .then(res=>{
        if(res.data.cart.length > 0){
          setCartBadge(res.data.cart.length);
        }else{
          setCartBadge(0);
        }
    })}
  }
  const useEf = () => {
    checkLogin();
    getCartSize();
  }

  try{
    useEffect(useEf,[]);
  }catch(e){
    console.log(e);
  }



  return (
    <>
    <IsLoginContext.Provider value={isLogin}>
      <CheckLogin.Provider value={checkLogin}>
        <Res.Provider value={res}>
          <SetRes.Provider value={setRes}>
            <CartBadge.Provider value={cartBadge}>
              <GetCartSize.Provider value={getCartSize}>
                  <div className="App">
                    <NavBar />
                  </div>
                  <Switch>
                    <Route exact path='/'>
                      <Home />
                    </Route>
                    <Route path='/shoes'>
                      <Shoe/>
                    </Route>
                    <Route path='/wallets'>
                      <Wallet/>
                    </Route>
                    <Route path='/product/:id'>
                      <Product />
                    </Route>
                    <Route path='/placeorder'>
                      {isLogin ? <PlaceOrder /> : <Redirect to="/"/>}
                    </Route>
                    <Route path='/myorders'>
                      {isLogin ? <MyOrders /> : <Redirect to="/"/>}
                    </Route>
                    <Route path='/myprofile'>
                      {isLogin ? <MyProfile /> : <Redirect to="/"/>}
                    </Route>
                    <Route path='/forgotpassword'>
                      <ForgotPassword />
                    </Route>
                    {/* /passwordreset/${users._id} */}
                    <Route path='/passwordreset/:id'>
                      <ResetPassword />
                    </Route>
                  </Switch>
                </GetCartSize.Provider>
              </CartBadge.Provider>
            </SetRes.Provider>
          </Res.Provider>
        </CheckLogin.Provider>
      </IsLoginContext.Provider>
    </>
  );
}

export default App;
