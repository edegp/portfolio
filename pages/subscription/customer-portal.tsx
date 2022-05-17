import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  withPageAuth,
  User,
  getUser,
} from "@supabase/supabase-auth-helpers/nextjs";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiContainer from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import Link from "../../components/Link";
import Container from "../../components/container";
import { useUser } from "../../utils/useUser";
import { stripe } from "../../utils/stripe";
import { postData } from "../../utils/helpers";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";
import LoadingDots from "../../components/ui/LoadingDots";
import Diners from "../../public/image/diners_logo_white.gif";
import JCB from "../../public/image/jcb.jpg";
import Amex from "../../public/image/amex.jpg";
import Discover from "../../public/image/discover.png";
import Master from "../../public/image/master.png";
import Visa from "../../public/image/visa.png";

export const getServerSideProps = withPageAuth({
  getServerSideProps: async ({ req, res }) => {
    const { user } = await getUser({ req, res });
    if (!user) console.log("Could not get user");
    const customerId = await createOrRetrieveCustomer({
      uuid: user.id || "",
      email: user.email || "",
    });
    const customer = await stripe.customers.retrieve(customerId);
    const { data } = await stripe.customers.listPaymentMethods(customerId, {
      type: "card",
    });
    return {
      props: {
        customerId,
        defaultPay: customer.invoice_settings.default_payment_method,
        data,
      },
    };
  },
  redirectTo: "/subscription/signin",
});

export default function CustomerPortal({ user, customerId, defaultPay, data }) {
  const router = useRouter();
  const { isLoading, subscription, userDetails } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [configuration, setConfiguration] = useState();
  const [def, setDef] = useState(defaultPay);
  const [payments, setPayments] = useState(data);
  const [setupIntent, setSetupIntent] = useState();
  const [LoadingPayment, setLoadingPayment] = useState(false);
  const open = Boolean(anchorEl);
  const [dialog, setDialog] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleDefault = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const default_payment_method = anchorEl.attributes.value.value;
    try {
      const { url, error } = await postData({
        url: "/api/update-customer",
        data: { default_payment_method, customerId },
      });
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setDef(default_payment_method);
    setAnchorEl(null);
  };
  const handleClickOpen = () => setDialog(true);

  const handleDialogClose = () => setDialog(false);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoadingPayment(true);
    const value = anchorEl.attributes.value.value;
    try {
      const { del } = await postData({
        url: "/api/delete-payment",
        data: value,
      });

      await setAnchorEl(null);
      setPayments(del);
      setDialog(false);
      setLoadingPayment(false);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };
  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: subscription?.prices?.currency,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 1);
  useEffect(() => {
    if (!subscription && !isLoading) router.push("/subscription");
  }, [subscription]);
  const logo = (target) =>
    target === "visa" ? (
      <Image src={Visa} objectFit="contain" />
    ) : payment.card.brand === "jcb" ? (
      <Image src={Jcb} width={30} />
    ) : payment.card.brand === "discover" ? (
      <Image src={Discover} width={30} />
    ) : payment.card.brand === "amex" ? (
      <Image src={Amex} width={30} />
    ) : payment.card.brand === "mastercard" ? (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.39 86.9">
          <g opacity="0">
            <rect fill="#fff" width="131.39" height="86.9" />
          </g>
          <rect
            fill="#ff5f00"
            x="48.37"
            y="15.14"
            width="34.66"
            height="56.61"
          />
          <path
            fill="#eb001b"
            d="M51.94,43.45a35.94,35.94,0,0,1,13.75-28.3,36,36,0,1,0,0,56.61A35.94,35.94,0,0,1,51.94,43.45Z"
          />
          <path
            fill="#f79e1b"
            d="M120.5,65.76V64.6H121v-.24h-1.19v.24h.47v1.16Zm2.31,0v-1.4h-.36l-.42,1-.42-1h-.36v1.4h.26V64.7l.39.91h.27l.39-.91v1.06Z"
          />
          <path
            fill="#f79e1b"
            d="M123.94,43.45a36,36,0,0,1-58.25,28.3,36,36,0,0,0,0-56.61,36,36,0,0,1,58.25,28.3Z"
          />
        </svg>
      </>
    ) : payment.card.brand === "diners_club" ? (
      <Image src={Diners} width={30} />
    ) : (
      <Image src={Visa} width={30} />
    );
  return (
    <>
      <Head>
        <title>ANful</title>
      </Head>
      <Container>
        <Box className="system laptop:pt-[18vh] pt-[14vh] section">
          <MuiContainer>
            <Box className="w-3/5">
              <Box>
                <Typography className="text-sm">現在のプラン</Typography>
                <Divider />
                <Typography className="text-xs text-color">
                  {subscription?.prices?.products?.name}
                </Typography>
                <Typography className="text-xs">
                  1 カ月ごとに {subscriptionPrice}
                </Typography>
                <Link href="/subscription/change">
                  <Button className="text-color">プラン変更</Button>
                </Link>
                <Link href="/subscription/cancel">
                  <Button className="text-color">自動更新を停止</Button>
                </Link>
              </Box>
              <Box>
                <Typography className="">支払い方法</Typography>
                <Divider />
                <List>
                  {payments
                    .sort((a, b) => a.created > b.created)
                    .map((payment) => (
                      <ListItem key={payment.id}>
                        <Typography className="text-xs">
                          <Box className="w-[35px] inline-block mr-vw-8">
                            {logo(payment.card.brand)}
                          </Box>
                          ●●●● {payment.card.last4}
                        </Typography>
                        {/* <Card> */}
                        <Typography
                          className={
                            def === payment.id
                              ? "text-color mx-6"
                              : "text-white mx-6"
                          }
                        >
                          デフォルト
                        </Typography>
                        {/* </Card> */}
                        <Typography className="mr-vw-8 text-xs">
                          有効期限:
                          {payment.card.exp_month.length !== 2 && "0"}
                          {payment.card.exp_month}/{payment.card.exp_year}
                        </Typography>
                        <Box>
                          {def === payment.id &&
                          !isLoading &&
                          subscription &&
                          (subscription?.status === "active" ||
                            subscription?.status === "trialing") ? (
                            <Button className="text-color">
                              <Tooltip
                                title="アクティブなプランがあるため、デフォルトの支払方法を削除できません"
                                key={payment.id}
                              >
                                <CloseIcon />
                              </Tooltip>
                            </Button>
                          ) : (
                            <Button
                              className="text-color"
                              key={payment.id}
                              onClick={handleClick}
                              value={payment.id}
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                            >
                              <MoreHorizIcon />
                            </Button>
                          )}
                        </Box>
                      </ListItem>
                    ))}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleDefault}>
                      デフォルトの支払い方法にする
                    </MenuItem>
                    <MenuItem onClick={handleClickOpen}>削除</MenuItem>
                    <Dialog
                      open={dialog}
                      onClose={handleDialogClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        "お支払方法を削除しますか？"
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          お支払方法を削除すると、再度登録が必要になります。
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDelete} autoFocus>
                          削除する
                        </Button>
                        <Button onClick={handleDialogClose}>戻る</Button>
                      </DialogActions>
                    </Dialog>
                  </Menu>
                </List>
                <Link href="/subscription/addPayment">
                  <Button className="text-color">
                    <AddIcon />
                    支払い方法を追加
                  </Button>
                </Link>
              </Box>
            </Box>
          </MuiContainer>
        </Box>
      </Container>
    </>
  );
}
