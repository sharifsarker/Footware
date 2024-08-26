import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const CheckoutForm = ({ clientSecret, username, total, setShowModal, shippingAddress }) => {
  const { loggedUser, cart, setCart } = useAppContext();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      return;
    }

    setIsProcessing(true);

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setIsProcessing(false);
      return;
    } else {
      setError(null);
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: username
        }
      }
    });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      setSuccess("Payment Successful!");
      toast.success("Payment Successful!");
      console.log(paymentIntent);
      setError(null);
      handleOrderSubmit();
      setCart([]);
      setShowModal(false);
    }

    setIsProcessing(false);
  };

  async function handleOrderSubmit() {
    try {
      const res = await axios.post("/orders/place-order", {
        userId: loggedUser._id,
        products: cart,
        totalAmount: total,
        shippingAddress
      });
      console.log(res.data);

      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4"
        },
        iconColor: "#666EE8",
        "::selection": {
          backgroundColor: "#f7f7f7"
        },
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased"
      },
      invalid: {
        color: "#9e2146",
        iconColor: "#fa755a"
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-6 rounded-lg">
        {/* <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4"
                },
                iconColor: "#666EE8",
                "::selection": {
                  backgroundColor: "#f7f7f7"
                },
                fontSmoothing: "antialiased",
                border: "1px solid red", // Base border
                borderRadius: "4px" // Optional: add border radius
              },
              invalid: {
                color: "#9e2146",
                iconColor: "#fa755a",
                borderColor: "#e3342f" // Invalid border color
              },
              focus: {
                borderColor: "#80bdff" // Focus border color
              },
              hover: {
                borderColor: "#5c6ac4" // Hover border color
              }
            }
          }}
        /> */}

        <div
          style={{
            border: "1px solid #ced4da",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "10px"
          }}
        >
          <label>Card Number</label>
          <CardNumberElement options={cardElementOptions} />
        </div>
        <div
          style={{
            border: "1px solid #ced4da",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "10px"
          }}
        >
          <label>Expiry Date</label>
          <CardExpiryElement options={cardElementOptions} />
        </div>
        <div
          style={{
            border: "1px solid #ced4da",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "10px"
          }}
        >
          <label>CVC</label>
          <CardCvcElement options={cardElementOptions} />
        </div>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="mt-4 bg-primaryColor text-white py-2 px-4 rounded"
        >
          {isProcessing ? "Processing…" : "Pay"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </form>
  );
};
const stripePromise = loadStripe(import.meta.env.VITE_PK);
const Payment = ({ price, username = "Elegant Footwear", setShowModal, shippingAddress }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post("/payment/create-payment-intent", {
        price: price
      })
      .then(res => res.data)
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe"
  };
  const options = {
    clientSecret,
    appearance
  };

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            username={username}
            total={price}
            clientSecret={clientSecret}
            setShowModal={setShowModal}
            shippingAddress={shippingAddress}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
