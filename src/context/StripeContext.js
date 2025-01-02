import React, { useState, useMemo, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { config } from '../assets/config/config'
import ThemedSuspense from '../components/ThemedSuspense'

import { stripeService } from "services"

const apiUrl = config.api.url

// create context
export const StripeContext = React.createContext()

export const StripeProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false)
  const [products, setProducts] = useState([])
  const [subscription, setsubscription] = useState({})
  const [stripePromise, setStripePromise] = useState(null);
  const [data, setData] = useState({
    selectProduct: {
      fetch: false,
      data: {}
    }
  });


  useEffect(() => {
    setStripePromise(loadStripe(config.stripe.publicKey))
  }, [])

  const loadProducts = useCallback(
    () => {
      axios.post(`${apiUrl}/v1/stripe/get-products`, {})
        .then(response => {
          setLoaded(true)
          setProducts(response.data.products)
        })
        .catch(err => {
          setLoaded(true)
        })
    }, []
  )

  const loadSubscriptions = useCallback(
    () => {
      stripeService.getSubscriptions().then((res) => {
        res.status && setsubscription(res.data);
      })
    }, []
  )

  useEffect(() => {
    loadSubscriptions()
    loadProducts()
  }, [loadSubscriptions, loadProducts])

  const value = useMemo(
    () => {
      return ({
        products,
        subscription,

        data,
        setData
      })
    },
    [data, products, subscription]
  )

  if (!isLoaded) {
    return <ThemedSuspense />
  }

  return (
    <StripeContext.Provider value={value}>
      {/* <Elements stripe={stripePromise} options={{ clientSecret: "pi_3MRD5eLRKIzb29w20GG3EZ6Z_secret_gxJplgI1BfuEswnj77xcWe2LQ" }} > */}
      <Elements stripe={stripePromise} >
        {children}
      </Elements>
    </StripeContext.Provider>
  )
}
