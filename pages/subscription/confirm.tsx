import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "../../components/Link";
import { supabase } from "../../utils/supabase-client";
// import { useUser } from "../utils/useUser";
import SubscriptionLayout from "../../components/SubscriptionLayout";

export default function confirm() {
  return (
    <>
      <SubscriptionLayout>
        <Typography className="text-2xl text-center">
          Succeed in comfirming your account
        </Typography>
        <Link href="/api/auth/logout">
          <Button className="mt-1" variant="slim">
            Sign in
          </Button>
        </Link>
      </SubscriptionLayout>
    </>
  );
}
