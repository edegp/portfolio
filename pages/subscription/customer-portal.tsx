import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  withAuthRequired,
  User,
  getUser,
} from "@supabase/supabase-auth-helpers/nextjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
import Link from "../../components/Link";
import { useUser } from "../../utils/useUser";
import { stripe } from "../../utils/stripe";
import { postData } from "../../utils/helpers";
import { createOrRetrieveCustomer } from "../../utils/supabase-admin";

export const getServerSideProps = withAuthRequired({
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
  const handleClickOpen = () => {
    setDialog(true);
  };
  const handleDialogClose = () => {
    setDialog(false);
  };
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoadingPayment(true);
    const value = anchorEl.attributes.value.value;
    try {
      const { del } = await postData({
        url: "/api/delete-payment",
        data: value,
      });
      setPayments(del);
      setAnchorEl(null);
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
  return (
    <>
      <Box>
        <Box className="w-2/5"></Box>
        <Box className="w-3/5">
          <Box>
            <Typography className="">現在のプラン</Typography>
            <Divider />
            <Typography className="">
              {subscription?.prices?.products?.name}
            </Typography>
            <Typography className="">
              1 カ月ごとに{subscriptionPrice}
            </Typography>
            <Link href="/subscription/change">
              <Button>プラン変更</Button>
            </Link>
            <Link href="/subscription/cancel">
              <Button>プランをキャンセル</Button>
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
                    <Typography className="">
                      {payment.card.brand}●●●●{payment.card.last4}
                    </Typography>
                    {def === payment.id && <Typography>デフォルト</Typography>}
                    <Typography className="">
                      有効期限:
                      {payment.card.exp_month.length !== 2 && "0"}
                      {payment.card.exp_month}/{payment.card.exp_year}
                    </Typography>
                    <Box>
                      {def === payment.id &&
                      !isLoading &&
                      subscription &&
                      subscription.status === ("active" || "trial") ? (
                        <Tooltip
                          title="アクティブなプランがあるため、デフォルトの支払方法を削除できません"
                          key={payment.id}
                        >
                          <CloseIcon />
                        </Tooltip>
                      ) : (
                        <Button
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
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
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
              <Button>
                <AddIcon />
                支払い方法を追加
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
