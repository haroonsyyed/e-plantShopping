import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total cost for all items in cart
  const calculateTotalAmount = () => {
    console.log('Cart items:', cart);
    let sum = 0;
    for (const item of cart) {
      const costNum = parseCost(item.cost);
      const qtyNum = parseInt(item.quantity, 10);
      if (isNaN(costNum) || isNaN(qtyNum)) {
        console.error(`Invalid cost (${item.cost}) or quantity (${item.quantity}) for item ${item.name}`);
        continue;
      }
      sum += costNum * qtyNum;
    }
    return sum.toFixed(2);

  };

  // Navigate back to product listing
  const handleContinueShopping = (e) => {
       e.preventDefault();
    if (onContinueShopping) onContinueShopping();
  };

  // Increase item quantity by 1
  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  // Decrease item quantity, but not below 1
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    }

  };

  // Remove item from cart
  const handleRemove = (item) => {
      dispatch(removeItem(item));
  };

  // Calculate total cost for a single item
  const calculateTotalCost = (item) => {
    const itemCost = parseCost(item.cost);
    const itemQuantity = parseInt(item.quantity);

    if (isNaN(itemCost) || isNaN(itemQuantity)) {
      console.error(`Invalid cost (${item.cost}) or quantity (${item.quantity}) for item ${item.name}`);
      return '0.00';
    }

    return (itemCost * itemQuantity).toFixed(2);

  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


