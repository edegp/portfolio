import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "../../components/Link";
import SubscriptionLayout from "../../components/SubscriptionLayout";

export default function CancelComplete() {
  return (
    <SubscriptionLayout>
      <Typography>自動更新を停止しました。</Typography>
      <Link href="/subscription/account">
        <Button className="text-color rounded-md">登録情報管理画面へ</Button>
      </Link>
    </SubscriptionLayout>
  );
}
