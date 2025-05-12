import React, {Children, createContext,useContext,useState} from "react";
import { UserProfile } from "../components";


const StateContext=createContext();

export const initialState = {
    chat:false,
    cart:false,
    userProfile:false,
    notification:false
}

export const ContextProvider = ({children}) =>{
    const [cartMenu, setCartMenu] = useState(false);
    const [activeMenu,setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor,setCurrentColor]=useState("#03D9D7")
    const [currentMode,setCurrentMode] =useState("Light")
    const [themeSettings, setThemeSettings] = useState(false)
    const setCart =(e)=>{
        if(initialState.cart===e.target.value)
            setCartMenu(true);
    }
    const setMode = (e)=>{
        setCurrentMode(e.target.value)
        localStorage.setItem('themeMode',e.target.value)
        setThemeSettings(false)
        console.log(currentMode)
    }
    const setColor= (color)=>{
        setCurrentColor(color)
        
        localStorage.setItem('colorMode',color)
        setThemeSettings(false)
    }

    const handleClick = (clicked)=>{
        setIsClicked({ ...initialState,[clicked]:true})
        if(clicked===initialState.cart) setCartMenu(true);
    }
    return(
        <StateContext.Provider value={{
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            handleClick,
            screenSize,
            setScreenSize,
            currentColor,
            currentMode,
            themeSettings,
            setThemeSettings,
            setColor,
            setMode,
            cartMenu,
            setCartMenu,
            setCart
        }}>
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);