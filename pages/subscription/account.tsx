import { useRouter } from "next/router";
import { useState, ReactNode, useEffect } from "react";
import { withPageAuth, getUser } from "@supabase/supabase-auth-helpers/nextjs";
import Iframe from "react-iframe";
import MuiContainer from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useUser } from "../../utils/useUser";
import { postData } from "../../utils/helpers";
import { supabase } from "../../utils/supabase-client";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import Container from "../../components/container";
import Link from "../../components/Link";
import LoadingDots from "../../components/ui/LoadingDots";
import Button from "../../components/ui/Button";
import Info from "../../components/subscription/info";

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
        <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
          {footer}
        </div>
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
  const [value, setValue] = useState(0);
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
  const subscriptionPrice = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: subscription?.prices?.currency || "JPY",
    minimumFractionDigits: 0,
  }).format(subscription?.prices?.unit_amount || 0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!subscription && !isLoading) {
      router.push("/subscription");
    }
  }, [subscription, isLoading]);
  return (
    <section>
      <Container>
        <Box className="system laptop:pt-[18vh] pt-[14vh] section">
          <MuiContainer>
            {!isLoading ? (
              <>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor={userDetails?.color || "primary"}
                    indicatorColor={userDetails?.color || "primary"}
                    aria-label="basic tabs example"
                  >
                    <Tab label="ご登録情報" {...a11yProps(0)} />
                    {/* <Tab label="サブスクリプションの管理へ" {...a11yProps(1)} /> */}
                    <Tab label="お客様情報の確認・変更" {...a11yProps(1)} />
                    <Tab label="ヘルプ・お問い合わせ" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div className="p-4">
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
                      <div className="text-sm mt-8 mb-4 font-semibold">
                        {isLoading ? (
                          <div className="h-12 mb-6">
                            <LoadingDots />
                          </div>
                        ) : subscription ? (
                          `${subscriptionPrice}/${subscription?.prices?.interval}`
                        ) : (
                          <Link href="/">
                            <a>Choose your plan</a>
                          </Link>
                        )}
                      </div>
                    </Card>
                    <Card
                      title="ご登録のメール"
                      // description={user?.email}
                      // footer={
                      //   <Button
                      //     variant="slim"
                      //     loading={loading}
                      //     disabled={loading || !subscription}
                      //     onClick={redirectToCustomerPortal}
                      //   >
                      //     お客様情報の確認・変更
                      //   </Button>
                      // }
                    >
                      <p className="text-sm mt-8 mb-4 font-semibold">
                        {user ? user.email : undefined}
                      </p>
                    </Card>
                  </div>
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
              <Iframe src={url} />
            </TabPanel> */}
                <TabPanel value={value} index={1}>
                  <Info
                    user={user}
                    userDetails={userDetails}
                    customer={customer}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Info
                    user={user}
                    userDetails={userDetails}
                    customer={customer}
                  />
                </TabPanel>
              </>
            ) : (
              <LoadingDots />
            )}
          </MuiContainer>
        </Box>
      </Container>
    </section>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/subscription/signin",
  async getServerSideProps(ctx) {
    // Access the user object
    try {
      const { user } = await getUser(ctx);
      console.log(user);
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
