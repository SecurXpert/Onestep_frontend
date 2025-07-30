import React from 'react';

const RazorpayPayment = ({ appointmentId, amount, onSuccess, doctorName, patientEmail }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Create order from backend
      const res = await fetch('http://192.168.0.123:8000/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointment_id: appointmentId, amount: amount }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to create order');

      const options = {
        key: data.key,
        amount: data.amount * 100,
        currency: data.currency,
        name: 'DoctorHub',
        description: 'Appointment Payment',
        order_id: data.order_id,
        handler: async function (response) {
          try {
            // Step 2: Verify payment
            const verifyRes = await fetch('http://192.168.0.123:8000/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                appointment_id: appointmentId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              if (onSuccess) onSuccess();
            } else {
              alert(verifyData.detail || 'Payment verification failed');
            }
          } catch (verifyError) {
            alert('Payment verification failed: ' + verifyError.message);
          }
        },
        prefill: {
          name: doctorName || 'Your Name',
          email: patientEmail || 'your@email.com',
        },
        theme: {
          color: '#6366F1',
        },
      };

      const razor = new window.Razorpay(options);
      razor.on('payment.error', (error) => {
        alert('Payment failed: ' + error.description);
      });
      razor.open();
    } catch (err) {
      alert(err.message || 'Something went wrong with payment');
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-150"
    >
      Proceed to Pay
    </button>
  );
};

export default RazorpayPayment;