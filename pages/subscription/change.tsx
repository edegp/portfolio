import { useState, useEffect } from "react";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { getActiveProductsWithPrices } from "../../utils/supabase-client";
import { GetStaticPropsResult } from "next";
import { useUser } from "../../utils/useUser";
import Plan from "../../components/Plan";
import LoadingDots from "../../components/ui/LoadingDots";
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

export default function Change({ products }) {
  const router = useRouter();
  const { user, isLoading, subscription, userDetails } = useUser();
  const [changePlan, setChangePlan] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setChangePlan(e.target.elements.plan.value);
  };
  useEffect(() => {
    if (changePlan) {
      router.push({
        pathname: "/subscription/confirm-plan",
        query: { plan: changePlan },
      });
    }
  }, [changePlan]);
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
      <Typography>プランを変更</Typography>
      <Typography>現在のプラン</Typography>
      <Divider />
      <Typography className="">
        {subscription?.prices?.products?.name}
      </Typography>
      <Typography className="">1 カ月ごとに{subscriptionPrice}</Typography>
      <form onSubmit={handleSubmit}>
        <Plan products={products} />
        <Button type="submit">続行</Button>
        <Link href="/subscription/customer-portal">
          <Button>戻る</Button>
        </Link>
      </form>
    </>
  );
}
