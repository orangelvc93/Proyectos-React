import { useState } from "react";
import { MenuItem, OrderItem } from "../types";


const useOrder = () => {
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    const addItem = (item : MenuItem) =>{

    const itemExists = order.find(itemOrder => itemOrder.id === item.id)
    if (itemExists) {
        const updateOrder = order.map(itemOrder => itemOrder.id === item.id ? { ...itemOrder, quantity: itemOrder.quantity + 1} : itemOrder)
         setOrder(updateOrder)
    } else {
        const newItem = {...item, quantity: 1};
        setOrder([...order, newItem]);
    }
    }

    const removeItem = (id : MenuItem['id']) => {
      setOrder(order.filter(itemOrder => itemOrder.id!== id))
    }

    const saveOrder = () =>{
      setOrder([])
      setTip(0)
    }


  return {
    order,
    tip,
    setTip,
    addItem,
    removeItem,
    saveOrder
  }
}

export default useOrder;
