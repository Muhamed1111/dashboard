import React from 'react'
import Header from './Header'
import { MdOutlineCancel } from 'react-icons/md'
import { useStateContext ,initialState} from '../contexts/ContextProvider'
import { Orders } from '../pages'
import {cartData, ordersData, ordersGrid } from '../data/dummy'

const Cart = () => {
  const {setCart,setIsClicked ,currentColor,cartMenu,setCartMenu } = useStateContext();
  const cartSelection = ordersData.filter((item) =>
    item.CustomerName === "Michael"
  
)
  return (
    <div className='bg-half-transparent w-screen fixed nav-item
     top-0 right-0'>
      <div className='dark:bg-secondary-dark-bg dark:text-white float-right p-2 bg-white border h-screen 
      dark:text-gray-200 dark:[#484B52] w-400'>
        <div className='flex justify-between items-center p-4 ml-4'>

          <Header title="Cart" />

          <button type='button'
            onClick={() => setIsClicked(prev => ({ ...prev, cart: false }))}
            style={{ color: currentColor, borderRadius: "50%" }}
            className='text-2xl p-3 hover:bg-gray-100 
          hover:drop-shadow-xl'
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className=' flex-col border-t-1 p-4 ml-4'>
          <div className='overflow-x-auto'>
            <table className='min-w-full text-sm
              text-left text-gray-500 dark:text-gray-400'>
              <thead className=' dark:bg-secondary-dark-bg cursor-pointer uppercase text-xs
                 bg-gray-100'>
                <th className='px-4 py-3'>Image</th>
                <th className='px-4 py-3'>Item</th>
                <th className='px-4 py-3'>Total Amount</th>
                <th className='px-4 py-3'> Status</th>
                <th className='px-4 py-3'> Order ID</th>
              </thead>


              <tbody>
                {cartSelection.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='text-center py-10 text-gray-500' >
                      No items in cart
                    </td>
                  </tr>) : (
                  cartSelection.map((item) => (
                    <tr key={item.OrderID}
                      className='border-b dark:text-white'>
                      <td className='px-4 py-3'>
                        <img src={item.ProductImage} />
                      </td>
                      <td className='px-4 py-3'>{item.OrderItems}</td>
                      <td className='px-4 py-3'>${item.TotalAmount.toFixed(2)}</td>
                      <td className='px-4 py-3'>
                        <span className='text-white text-xs font-medium px-3 py-1 rounded-full'
                          style={{ backgroundColor: item.StatusBg }}>

                          {item.Status}
                        </span>

                      </td>
                      <th className='px-4 py-3'>{item.OrderID}</th>
                    </tr>

                  )))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart