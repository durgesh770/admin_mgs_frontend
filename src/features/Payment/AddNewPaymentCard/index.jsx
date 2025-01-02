import React, { useState, useMemo } from 'react';
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getSingleCustomer } from '@/hooks/Customer';
import { validationCheck } from '@/utils/tools';
import { useSnackbar } from '@/context/GlobalContext';
import { PaymentService } from '@/services';
import { CircularProgress } from '@mui/material';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentAddress = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async ({ email, name, country, line1 }) => {
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        return stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { email, name, address: { country, line1 } },
        })
    };

    return handleSubmit;
};

const AddNewPaymentCard = ({ customerId, refresh }) => {
    //alert
    let alert = useSnackbar()

    const findCustomer = getSingleCustomer(customerId);
    const customer = findCustomer.data?.customer;

    const [form, setForm] = useState({ number: '', exp_month: '', exp_year: '', cvc: '' });
    const [address, setAddress] = useState("");
    const isFormFill = useMemo(() => validationCheck(form).status, [form]);
    const payment = PaymentAddress();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!address) return alert.SnackbarHandler(true, "error", "Address is required!");

        setLoading(true);

        const { error, paymentMethod } = await payment({ email: customer?.email, name: customer?.name, country: "CA", line1: address });
        if (error?.message) {
            setLoading(false);
            return alert.SnackbarHandler(true, "error", error.message);
        };
        
        const res = await PaymentService.addNewPaymentCard({
            customerId: customerId,
            paymentMethodId: paymentMethod.id
        }).finally(() => {
            setLoading(false);
        });
        if (!res?.success) return;

        alert.SnackbarHandler(true, "success", res.message);

        refresh && refresh();
    };

    return (
        <div className="w-full">
            <div className="p-6 bg-white rounded-lg">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="w-full">
                        <label htmlFor="card-number" className="block mb-2 text-sm font-medium text-gray-700">Card Number</label>
                        <CardElement className="w-full px-3 py-2 mb-1 transition-colors border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500" placeholder="John Smith" type="text" />
                    </div>

                    <div className="w-full mt-2 mb-5">
                        <input
                            placeholder='Address'
                            style={{ "width": "100%", "padding": "0.75rem", "backgroundColor": "#fff", "borderRadius": "5px", "transition": "background 0.15s ease, border 0.15s ease, box-shadow 0.15s ease, color 0.15s ease", "border": "1px solid #e6e6e6", "boxShadow": "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)" }}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="mt-8 text-center">
                        {
                            loading
                                ?
                                <CircularProgress size={20} />
                                :
                                <button type="submit" onClick={handleSubmit} className={`w-full bg-green-500 text-white font-medium py-3 rounded-lg focus:outline-none`}>Submit</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

const AddNewPaymentCardDefault = ({ customerId, refresh }) => (
    <Elements options={{ appearance: { theme: 'stripe' } }} stripe={stripePromise}>
        <AddNewPaymentCard customerId={customerId} refresh={refresh} />
    </Elements>
);

export default AddNewPaymentCardDefault;
