import { InputLabel } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { FilledInput } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {Link, useHistory} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import {IsLoginContext,CheckLogin,SetRes,CartBadge} from '../App.js'
import {LoginComponent} from './login.js';
import {SignUpComponent} from './signup.js';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import {CartComponent} from './cart.js';
export const NavBar = () => {
    const src = "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg"

    const ulStyle = {
        display:'flex',
        listStyleType:'none',
        alignItems:'center',
        marginLeft:window.innerWidth > 500 ? '33%' : '-34%'
    }
    const gridStyle = {
        display:window.innerWidth<500?'grid':'flex',
        placeItems:'center'
    }
    const [loginOpen, setLoginOpen] = useState(false);
    const [signOutOpen, setSignOutOpen] = useState(false);
    const [cartOpen, cartSetOpen] = useState(false);

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    const handleSignOutOpen = () => {
        setSignOutOpen(true);
    };
    const handleSignOutClose = () => {
        setSignOutOpen(false);
    };

    const [cartData,setCartData] = useState([]);
    const [cartLoading,setCartLoading] = useState(false);

    const getCartData = () => {
      if(isLogin){
          axios.get(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/get/${localStorage.getItem("id")}`,{withCredentials:true})
          .then(res=>{
              if(res.status===200){
                  setCartData(res.data.cart);
                  setCartLoading(true);
              }
          })
      }
    }

    const handleCartOpen = () => {
        cartSetOpen(true);
        getCartData();
    };
    const handleCartClose = () => {
        cartSetOpen(false);
    };


    const isLogin = useContext(IsLoginContext);
    const checkLogin = useContext(CheckLogin);
    const setRes = useContext(SetRes);
    const cartBadge = useContext(CartBadge);
    const logout = () => {
        axios.get('https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/logout',{withCredentials:true})
        .then(res=>{
            if(res.data.message==="green"){
                checkLogin();
                localStorage.removeItem("id");
            }else{
                console.log(res);
            }
        })
        .catch(res=>console.log(res))

    }
    try{
        useEffect(checkLogin,[]);
    }catch(e){
        console.log(e);
    }
    const [ser,setSer] = useState("");
    const searchProduct = () => {
        axios.get(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/product/search?ser=${ser}`)
        .then(res=>{
            if(res.status===200){
                setRes(res.data);
            }
        })
        .catch(res=>console.log(res))
      }
    
    const history = useHistory();
    return(
        <Grid style={gridStyle}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{marginLeft:window.innerWidth < 500 ? '-25%' : '0'}}>
                <Link to='/'>
                        <img src={src} alt="" width="250px"/>
                </Link>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{display:'grid',placeItems:'center'}}>
                <FormControl variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Search items</InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      onChange={(event)=>{
                          setSer(event.target.value);
                          if(event.target.value.length === 0){
                              setRes([]);
                          }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={searchProduct}
                          >
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <ul style={ulStyle}>
                    <li>
                        <div className="dropdown">
                          <button className="dropbtn">Categories</button>
                          <div className="dropdown-content">
                          <Link to="shoes">Shoes</Link>
                          <Link to="wallets">Wallets</Link>
                          </div>
                        </div>
                    </li>
                    <li >
                            <IconButton onClick={handleCartOpen}>
                                <Badge badgeContent={cartBadge} color="primary">
                                <ShoppingCartIcon color="action" fontSize="large"/>
                                </Badge>
                            </IconButton>
                            <CartComponent 
                            open={cartOpen} 
                            handleClose={handleCartClose}  
                            loading={cartLoading}
                            cartData={cartData}
                            cartSetOpen={cartSetOpen}
                            />
                    </li>
                    <li >
                        <div className="dropdown">
                            <IconButton className="dropbtn">
                                <AccountCircleOutlinedIcon fontSize="large"/>
                            </IconButton>
                            {isLogin?(
                                <div className="dropdown-content">
                                    <button 
                                    className="user-btn"
                                    onClick={()=>history.push('/myprofile')}
                                    >
                                        Profile
                                    </button>
                                    <button 
                                    className="user-btn"
                                    onClick={()=>history.push('/myorders')}
                                    >
                                        Orders
                                    </button>
                                    <button className="user-btn" onClick={logout}>Log out</button>
                                </div>
                            ):(
                                <div className="dropdown-content">
                                    <button className="user-btn" onClick={handleLoginOpen}>Login</button>
                                    <LoginComponent open={loginOpen} handleClose={handleLoginClose}/>
                                    <button className="user-btn" onClick={handleSignOutOpen}>Sign Up</button>
                                    <SignUpComponent open={signOutOpen} handleClose={handleSignOutClose} />
                                </div>
                            )}
                            
                        </div>
                    </li>
                </ul>
            </Grid>
        </Grid>
    )
}