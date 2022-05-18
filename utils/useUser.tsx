import {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  useUser as useSupaUser,
  User,
} from "@supabase/supabase-auth-helpers/react";
import { UserDetails } from "../types";
import { Subscription } from "../types";
import { SupabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  supabaseClient: SupabaseClient;
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { supabaseClient: supabase } = props;
  const { user, accessToken, isLoading: isLoadingUser } = useSupaUser();
  const [isLoadingData, setIsLoadingData] = useState<booleran | false>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [canceled, setCanceled] = useState<Subscription | null>(null);

  const getUserDetails = () =>
    supabase.from<UserDetails>("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from<Subscription>("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();
  const getCancelSubscription = () =>
    supabase
      .from<Subscription>("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["canceled"])
      .limit(1)
      .single();
  const updateSubscription = async (payload) => {
    const { data, error } = await supabase
      .from("prices")
      .select("*,products(*)")
      .eq("id", `${payload.price_id}`);
    const prices = data[0];
    const result = { ...payload, prices };
    return result;
  };

  const setData = (payload) => {
    console.log("start payload");
    // if (payload?.status !== "trialing" || payload?.status !== "active") {
    //   setSubscription(null);
    //   setIsLoadingData(false);
    // }
    if (payload) {
      Promise.allSettled([getUserDetails(), updateSubscription(payload)]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const updateSubscriptionPromise = results[1];
          console.log(updateSubscriptionPromise);
          console.log(updateSubscriptionPromise.value);
          if (userDetailsPromise.status === "fulfilled")
            setUserDetails(userDetailsPromise.value.data);
          if (!updateSubscriptionPromise.error) {
            if (updateSubscriptionPromise.value.status === "canceled") {
              setCanceled(updateSubscriptionPromise.value);
            } else {
              setSubscription(updateSubscriptionPromise.value);
            }
            setIsLoadingData(false);
          }
          console.log(`payload end loading ${isLoadingData}`);
        }
      );
    }
  };
  useEffect(() => {
    if (user && !isLoadingData && !subscription && !canceled) {
      setIsLoadingData(true);
      console.log("start");
      const update = supabase
        .from<Subscription>("subscriptions")
        .on("*", (payload) => setData(payload.new))
        .subscribe();
      Promise.allSettled([
        getUserDetails(),
        getSubscription(),
        getCancelSubscription(),
      ]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];
        const canceledPromise = results[2];
        if (userDetailsPromise.status === "fulfilled")
          setUserDetails(userDetailsPromise.value.data);
        if (!subscriptionPromise.value.error) {
          setSubscription(subscriptionPromise.value.data);
          setIsLoadingData(false);
        } else if (!canceledPromise.value.error) {
          setCanceled(canceledPromise.value.data);
          setIsLoadingData(false);
        }
        setIsLoadingData(false);
        return () => {
          supabase.removeSubscription(update);
        };
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
    canceled,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
