import Head from "next/head"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import SubscriptionLayout from "../../components/subscription/SubscriptionLayout"
import Link from 'next/link'

export default function Confirm() {
  return (
    <>
      <Head>
        <title>ANful 本登録完了画面</title>
      </Head>
      <SubscriptionLayout className="text-center">
        <Typography className="text-xl">本登録が完了しました！</Typography>

        <Button className="mt-4 bg-black text-white">
          <Link
            href="/api/auth/logout"
            className="text-center mx-auto justify-self-center self-center"
          >
            無料体験をはじめる
          </Link>
        </Button>
      </SubscriptionLayout>
    </>
  )
}
