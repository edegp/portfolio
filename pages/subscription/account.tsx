import { useRouter } from "next/router";
import Head from "next/head";
import { useState, ReactNode, useEffect } from "react";
import { withPageAuth, getUser } from "@supabase/supabase-auth-helpers/nextjs";
import MuiContainer from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { useUser } from "../../utils/useUser";
import { postData } from "../../utils/helpers";
import { supabase } from "../../utils/supabase-client";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import Container from "../../components/container";
import Link from "../../components/Link";
import CenteredTabs from "../../components/centeredTabs";
import LoadingDots from "../../components/ui/LoadingDots";
import ContactForm from "../../components/contactForm";
import Info from "../../components/subscription/info";
import { getRGBColor } from "../../utils/color";
import ToggleButton from "../../components/subscription/toggleButton";

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-md mb-1 font-medium">{title}</h3>
        <p className="text-sm text-zinc-600">{description}</p>
        {children}
      </div>
      {footer ? (
        <div className="p-4 text-zinc-500 rounded-b-md">{footer}</div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default function Account({ user, customer }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isLoading, subscription, userDetails } = useUser();
  const [info, setInfo] = useState(userDetails);
  const [fade, setFade] = useState(Boolean(subscription));
  const updateLoading = (e) => setLoading(e);
  const updateInfo = (key, value) =>
    setInfo((prev) => ({ ...prev, [key]: value }));
  const resetInfo = (userDetails) => setInfo(userDetails);
  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      if (!window.open(url)) {
        location.href = url;
      } else {
        window.open(url, "_blank");
      }
      
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };
  const subscriptionPrice = new Intl.NumberFormat("ja-JP").format(
    subscription?.prices?.unit_amount || 0
  );
  useEffect(() => {
    setInfo(userDetails);
  }, [userDetails, isLoading]);
  useEffect(() => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, [5000]);
    if (!subscription && !isLoading) {
      router.push("/subscription");
    }
  }, [subscription]);
  const primaryColor = getRGBColor(info?.color || "#333", "primary");
  const plan = subscription?.prices?.products?.name;
  return (
    <>
      <Head>
        <title>ANful</title>
        <style>:root {`{${primaryColor}}`}</style>
      </Head>
      <section>
        <ToggleButton />
        <Container>
          <Box className="system laptop:pt-[18vh] pt-[14vh] section">
            <MuiContainer>
              {subscription && (
                <Fade in={fade} unmountOnExit={true}>
                  <Typography className="text-color text-lg font-bold text-center mb-8">
                    ご登録ありがとうございます。
                    <br />
                    デザイン作成まで今しばらくお待ちください。
                  </Typography>
                </Fade>
              )}
              <CenteredTabs
                color={info?.color}
                className="tablet:mx-24 mx-0 font-light"
                labels={["ご登録情報", "情報の確認・変更", "ヘルプ"]}
              >
                <div>
                  <Card
                    title="ご登録のプラン"
                    description={
                      subscription?.status === "active" ||
                      subscription?.status === "trialing" ? (
                        <Typography className="text-sm font-light mt-3">
                          {plan === "basic"
                            ? "ベーシック"
                            : plan === "standard"
                            ? "スタンダード"
                            : plan === "Premium"
                            ? "プレミアム"
                            : "特別"}
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                    footer={
                      <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                        {/* <Link href="/subscription/customer-portal"> */}
                        <Button
                          className="bg-black text-white"
                          variant="slim"
                          onClick={redirectToCustomerPortal}
                        >
                          サブスクリプションの管理へ
                        </Button>
                        {/* </Link> */}
                      </div>
                    }
                  >
                    <div className="text-lg mt-6 mb-2 font-semibold">
                      {isLoading ? (
                        <div className="h-12 mb-6">
                          <LoadingDots className="bg-black" />
                        </div>
                      ) : subscription?.status === "trialing" ? (
                        <Typography>
                          無料体験　
                          <span className="text-xs">
                            {subscription?.trial_end
                              .split(/-|T/, 3)
                              .slice(1, 3)
                              .join("/")}
                            に終了
                          </span>
                        </Typography>
                      ) : subscription ? (
                        <Typography>
                          {subscriptionPrice}
                          <span className="text-xs">
                            円/
                            {subscription?.prices?.interval === "month" && "月"}
                          </span>
                        </Typography>
                      ) : (
                        <Link href="/">
                          <a>Choose your plan</a>
                        </Link>
                      )}
                    </div>
                  </Card>
                  <Card title="ご登録のメール">
                    <p className="text-sm mt-6 mb-2 font-semibold">
                      {user ? user.email : "登録されていません"}
                    </p>
                  </Card>
                </div>
                <Info
                  user={user}
                  updateInfo={updateInfo}
                  resetInfo={resetInfo}
                  info={info}
                  customer={customer}
                />
                <ContactForm user={user} info={info} />
              </CenteredTabs>
            </MuiContainer>
          </Box>
        </Container>
      </section>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/subscription/signin",
  async getServerSideProps(ctx) {
    // Access the user object
    try {
      const { user } = await getUser(ctx);
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.email || "",
      });
      return { props: { customer } };
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  },
});
