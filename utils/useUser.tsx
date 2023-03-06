/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  useEffect,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react"
import {
  useUser as useSupaUser,
  User,
} from "@supabase/supabase-auth-helpers/react"
import { SupabaseClient } from "@supabase/supabase-auth-helpers/nextjs"
import { UserDetails, Subscription } from "../types"

type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
  canceled: Subscription
  info: { [key: string]: string }
  setInfo: Dispatch<
    SetStateAction<{
      email: string
      password: string
      purpose: string
      color: string
      site_name: string
      favorite: string
      google: string
      other: string
    }>
  >
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
  supabaseClient: SupabaseClient
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  const { supabaseClient: supabase } = props
  const { user, accessToken, isLoading: isLoadingUser } = useSupaUser()
  const [isLoadingData, setIsLoadingData] = useState<boolean | false>(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [canceled, setCanceled] = useState<Subscription | null>(null)
  const [info, setInfo] = useState({
    email: "",
    purpose: "",
    color: "#333",
    site_name: "",
    favorite: "",
    google: "",
    other: "",
  })
  const getUserDetails = () =>
    supabase.from<UserDetails>("users").select("*").single()
  const getSubscription = () =>
    supabase
      .from<Subscription>("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single()
  const getCancelSubscription = () =>
    supabase
      .from<Subscription>("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["canceled"])
      .limit(1)
      .single()
  const updateSubscription = async (payload) => {
    const { data, error } = await supabase
      .from("prices")
      .select("*,products(*)")
      .eq("id", `${payload.price_id}`)
    const prices = data[0]
    const result = { ...payload, prices }
    return result
  }
  const setData = (payload) => {
    setIsLoadingData(true)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.allSettled([getUserDetails(), updateSubscription(payload)]).then(
      (results) => {
        const userDetailsPromise = results[0]
        const updateSubscriptionPromise = results[1]
        if (userDetailsPromise.status === "fulfilled")
          setUserDetails(userDetailsPromise.value.data)
        if (!updateSubscriptionPromise) {
          if (
            (updateSubscriptionPromise as PromiseFulfilledResult<Subscription>)
              .value.status === "canceled"
          ) {
            setCanceled(
              (
                updateSubscriptionPromise as PromiseFulfilledResult<Subscription>
              ).value
            )
            setSubscription(null)
          } else {
            setSubscription(
              (
                updateSubscriptionPromise as PromiseFulfilledResult<Subscription>
              ).value
            )
            setCanceled(null)
          }
          setIsLoadingData(false)
        }
      }
    )
  }
  useEffect(() => {
    if (user && !isLoadingData && !subscription && !canceled) {
      setIsLoadingData(true)
      const updateSub = supabase
        .from<Subscription>("subscriptions")
        .on("*", (payload) => setData(payload.new))
        .subscribe()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Promise.allSettled([
        getUserDetails(),
        getSubscription(),
        getCancelSubscription(),
      ]).then((results) => {
        const userDetailsPromise = results[0]
        const subscriptionPromise = results[1]
        const canceledPromise = results[2]
        if (userDetailsPromise.status === "fulfilled")
          setUserDetails(userDetailsPromise.value.data)
        if (
          subscriptionPromise.status === "fulfilled" &&
          !subscriptionPromise.value.error
        ) {
          setSubscription(subscriptionPromise.value.data)
          setCanceled(null)
        } else if (
          canceledPromise.status === "fulfilled" &&
          !canceledPromise.value.error
        ) {
          setCanceled(canceledPromise.value.data)
          setSubscription(null)
        }
        setIsLoadingData(false)
        return () => {
          supabase.removeSubscription(updateSub)
        }
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
      setCanceled(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser])
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
    canceled,
    info,
    setInfo,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`)
  }
  return context
}
