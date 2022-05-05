import { useState } from "react";
import { useRouter } from "next/router";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useUser } from "../../utils/useUser";
import { postData } from "../../utils/helpers";
import { getActiveProductsWithPrices } from "../../utils/supabase-client";
import LoadingDots from "../../components/ui/LoadingDots";
import Link from "../../components/Link";

export const getServerSideProps = withAuthRequired({
  getServerSideProps: async () => {
    const products = await getActiveProductsWithPrices();
    return {
      props: {
        products,
      },
    };
  },
  redirectTo: "/siginin",
});

export default function comfirmPlan({ user, products }) {
  const { isLoading, subscription, userDetails } = useUser();
  const [update, setUpdate] = useState();
  const router = useRouter();
  const plan = router.query.plan;
  const product = products.find((product) => product.name === plan);
  const updateSubscription = async () => {
    const { updateSubscription } = await postData({
      url: "/api/update-subscription",
      data: { subscriptionId: subscription.id, price: product.prices[0].id },
    });
    if (updateSubscription) router.push("/subscription/account");
  };
  useEffect(() => {
    if (!subscription && !isLoading) router.push("/subscription");
  }, [subscription]);
  if (subscription) {
    const date = subscription?.current_period_end.split("-");
    const month =
      date[1].substr(0, 1) === "0"
        ? date[1].substr(1, 2)
        : date[1].substr(0, 2);
    const day =
      date[2].substr(0, 1) === "0"
        ? date[2].substr(1, 1)
        : date[2].substr(0, 2);
    const nextPaymentDate = date[0] + "年" + month + "月" + day + "日";
    return (
      <>
        <Typography>新規プランの確認</Typography>
        <Typography>新規プラン</Typography>
        <Divider />
        <Typography>{product.name}</Typography>
        <Typography>1 カ月ごとに{product.prices.unit_amount}円</Typography>
        <Typography>次回の支払い</Typography>
        <Typography>{nextPaymentDate}</Typography>
        <Button onClick={updateSubscription}>変更する</Button>
        <Link href="/subscription/change">
          <Button>キャンセル</Button>
        </Link>
      </>
    );
  }
  return (
    <div className="h-12 mb-6">
      <LoadingDots />
    </div>
  );
}
