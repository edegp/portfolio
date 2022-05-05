import { useState, useEffect } from "react";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useStripe } from "@stripe/react-stripe-js";
import { getActiveProductsWithPrices } from "../../utils/supabase-client";
import { postData } from "../../utils/helpers";
import { useUser } from "../../utils/useUser";
import Link from "../../components/Link";

interface Props {
  products: Product[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}
export default function Cancel({ products }) {
  const router = useRouter();
  const { user, isLoading, subscription, userDetails } = useUser();
  const Cancelhandle = async () => {
    const { cancelSubscription } = await await postData({
      url: "/api/cancel-subscription",
      data: { subscriptionId: subscription.id },
    });
    if (cancelSubscription)
      router.push({ pahtname: "/subscription", query: "cancel" });
  };
  useEffect(() => {
    if (!subscription && !isLoading) router.push("/subscription");
  }, [subscription]);
  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: subscription?.prices?.currency,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 1);
  return (
    <>
      <Typography>プランをキャンセル</Typography>
      <Typography>現在のプラン</Typography>
      <Divider />
      <Typography className="">
        {subscription?.prices?.products?.name}
      </Typography>
      <Typography className="">1 カ月ごとに{subscriptionPrice}</Typography>
      <Typography className="">
        キャンセルするとこのプランは利用できなくなります
      </Typography>
      <Button onClick={Cancelhandle}>キャンセル</Button>
      <Link href="/subscription/customer-portal">
        <Button>プランを継続する</Button>
      </Link>
    </>
  );
}
