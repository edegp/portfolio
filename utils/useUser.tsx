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
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [newsubscription, setNewSubscription] = useState<Subscription | null>(
    null
  );
  const getUserDetails = () =>
    supabase.from<UserDetails>("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from<Subscription>("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
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

  const setData = async (payload) => {
    if (
      !payload ||
      (payload.status !== "trialing" && payload.status !== "active")
    )
      return setSubscription(null);
    if (payload) {
      Promise.allSettled([getUserDetails(), updateSubscription(payload)]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const updateSubscriptionPromise = results[1];
          console.log(updateSubscriptionPromise);
          if (userDetailsPromise.status === "fulfilled")
            setUserDetails(userDetailsPromise.value.data);
          if (!updateSubscriptionPromise.error) {
            setSubscription(updateSubscriptionPromise.value);
          }
          setIsloadingData(false);
        }
      );
    }
  };

  useEffect(() => {
    if (user && !isLoadingData && (!userDetails || !subscription)) {
      setIsloadingData(true);
      const update = supabase
        .from<Subscription>("subscriptions")
        .on("*", (payload) => setData(payload.new))
        .subscribe();
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];
          console.log(subscriptionPromise);
          if (userDetailsPromise.status === "fulfilled")
            setUserDetails(userDetailsPromise.value.data);
          if (!subscriptionPromise.error) {
            setSubscription(subscriptionPromise.value.data);
          }
          setIsloadingData(false);
          return () => {
            supabase.removeSubscription(update);
          };
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser, subscription]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
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
