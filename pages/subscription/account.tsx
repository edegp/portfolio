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

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
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
  const updateInfo = (e) =>
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const resetInfo = (userDetails) => setInfo(userDetails);
  const updateColor = (color) =>
    setInfo((prev) => ({ ...prev, ["color"]: color.hex }));
  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.open(url, "_blank");
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };
  const subscriptionPrice = new Intl.NumberFormat("ja-JP").format(
    subscription?.prices?.unit_amount || 0
  );
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  useEffect(() => {
    setInfo(userDetails);
  }, [userDetails, isLoading]);
  useEffect(() => {
    if (!subscription && !isLoading) {
      router.push("/subscription");
    }
  }, [subscription]);
  const primaryColor = getRGBColor(info?.color || "#333", "primary");
  return (
    <>
      <Head>
        <Meta/>
        <title>ANful</title>
        <style>:root {`{${primaryColor}}`}</style>
      </Head>
      <section>
        <Container>
          <Box className="system laptop:pt-[18vh] pt-[14vh] section">
            <MuiContainer>
              {!isLoading ? (
                <>
                  <CenteredTabs
                    color={info?.color}
                    className="mx-24 font-light"
                    labels={[
                      "ご登録情報",
                      "お客様情報の確認・変更",
                      "ヘルプ・お問い合わせ",
                    ]}
                  >
                    <div>
                      <Card
                        title="ご登録のプラン"
                        description={
                          subscription?.status === "active" ||
                          subscription?.status === "trialing"
                            ? `${subscription?.prices?.products?.name} plan.`
                            : ""
                        }
                        footer={
                          <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                            {/* <Link href="/subscription/customer-portal"> */}
                            <Button
                              className="bg-black text-white"
                              variant="slim"
                              loading={loading}
                              disabled={loading || !subscription}
                              onClick={redirectToCustomerPortal}
                            >
                              サブスクリプションの管理へ
                            </Button>
                            {/* </Link> */}
                          </div>
                        }
                      >
                        <div className="text-xl mt-8 mb-4 font-semibold">
                          {isLoading ? (
                            <div className="h-12 mb-6">
                              <LoadingDots />
                            </div>
                          ) : subscription ? (
                            <Typography>
                              {subscriptionPrice}
                              <span className="text-xs">
                                円/
                                {subscription?.prices?.interval === "month" &&
                                  "月"}
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
                        <p className="text-sm mt-8 mb-4 font-semibold">
                          {user ? user.email : undefined}
                        </p>
                      </Card>
                    </div>
                    <Info
                      user={user}
                      updateInfo={updateInfo}
                      resetInfo={resetInfo}
                      updateColor={updateColor}
                      info={info}
                      customer={customer}
                    />
                    <ContactForm user={user} info={info} />
                  </CenteredTabs>
                </>
              ) : (
                <LoadingDots className="text-black" />
              )}
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
