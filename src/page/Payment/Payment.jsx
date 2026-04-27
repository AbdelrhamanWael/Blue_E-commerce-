import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../../components/context/cartContext';
import { FaCreditCard, FaPaypal, FaApplePay } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Payment.css';
import PageTransation from '../../components/PageTransation';

const Payment = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = (e) => {
    e.preventDefault();
    toast.success('Payment successful! Your order has been placed.');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <PageTransation>
        <div className="payment-container empty">
          <h2>Your cart is empty</h2>
          <button className="payment-btn" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </PageTransation>
    );
  }

  return (
    <PageTransation>
      <div className="payment-container">
        <div className="payment-card glassmorphism">
          <div className="payment-left">
            <h2>Payment Details</h2>
            <p className="payment-subtitle">Complete your purchase securely</p>

            <div className="payment-methods">
              <label className={`method-card ${paymentMethod === 'card' ? 'active' : ''}`}>
                <input type="radio" name="method" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <FaCreditCard className="method-icon" />
                <span>Credit Card</span>
              </label>
              <label className={`method-card ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                <input type="radio" name="method" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                <FaPaypal className="method-icon" />
                <span>PayPal</span>
              </label>
              <label className={`method-card ${paymentMethod === 'apple' ? 'active' : ''}`}>
                <input type="radio" name="method" value="apple" checked={paymentMethod === 'apple'} onChange={() => setPaymentMethod('apple')} />
                <FaApplePay className="method-icon" />
                <span>Apple Pay</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <form onSubmit={handlePayment} className="payment-form">
                <div className="input-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className="input-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                </div>
                <div className="row">
                  <div className="input-group half">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" maxLength="5" required />
                  </div>
                  <div className="input-group half">
                    <label>CVC</label>
                    <input type="password" placeholder="123" maxLength="3" required />
                  </div>
                </div>
                <button type="submit" className="payment-btn submit-btn">
                  Pay ${total.toFixed(2)}
                </button>
              </form>
            )}

            {paymentMethod !== 'card' && (
              <div className="other-payment-form">
                <p>You will be redirected to complete your purchase securely.</p>
                <button onClick={handlePayment} className="payment-btn submit-btn" style={{width: '100%'}}>
                  Continue with {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
                </button>
              </div>
            )}

          </div>
          
          <div className="payment-right">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item, idx) => (
                <div className="summary-item" key={idx}>
                  <img src={item.images[0]} alt={item.title} />
                  <div className="summary-details">
                    <h4>{item.title}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="summary-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransation>
  );
};

export default Payment;
