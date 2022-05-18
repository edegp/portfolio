// import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "../../components/Link";
import SubscriptionLayout from "../../components/SubscriptionLayout";

export default function Complete() {
  const router = useRouter();
  const plan = router.query.plan;
  return (
    <SubscriptionLayout>
      <Typography>{plan}プランの変更が完了しました。</Typography>
      <Link href="/subscription/account">
        <Button className="text-color rounded-md">登録情報管理画面へ</Button>
      </Link>
    </SubscriptionLayout>
  );
}
