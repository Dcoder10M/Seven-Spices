import React, { createContext, useContext, useReducer } from 'react'
//har dish ka apna alag state hai aut jab add to cart button dabayega client toh uska state save hona chahiye cart mein toh eese toh bohot states ho jayenge isliye useReducer Hook ka use karte hai .... for advanced state management

//3 steps for using context
//create
//provide
//useContext

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state,action)=>{
switch(action.type){
    case "ADD":
        return [...state,{
            id:action.id, name:action.name, qty: action.qty,
             size: action.size, price: action.price, img: action.img
            }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr; 
        case "UPDATE":
            let arr = [...state]
            // console.log(arr)
            for (let i = 0; i < arr.length; i++) {
                if(arr[i].id === action.id){
                    arr[i] = { ...arr[i], qty: parseInt(action.qty) + arr[i].qty, price: action.price + arr[i].price }
                }
                
            }
            // arr.find((food,index)=>{
            //     console.log(food)
            //     if(food.id === action.id){
            //         console.log(food.qty, parseInt(action.qty), action.price + food.price)
            //         arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
            //     }
            //     return arr
            // })
            // console.log(arr)
            return arr
        case "DROP":
            let empArray = []
            return empArray
        default:
            // console.log("Error in reducer");
}
}
//children matlb sab kuch.... saare childrens
export const CartProvider = ({children})=>{
// usereducer Hook
// const [count,dispatch]=useReducer(reducer,initialState)
// dispatch mein bohot options rhete hai aur vo phit reducer ko call karta hai particular action ke liye
const[state,dispatch] = useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
            {/* apply for every children */}
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

//3rd step for ContextAPI
//for state
export const useCart = () => useContext(CartStateContext);
//for dispatch function
export const useDispatchCart = () => useContext(CartDispatchContext);