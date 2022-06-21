import Head from "next/head";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Policy() {
  const lists = {
    販売業者の正式名称: "Anful",
    所在地: "〒950-2102　新潟県新潟市西区五十嵐2の町8050五十嵐寮",
    電話番号: "080-6594-3500",
    メールアドレス: "anfulled4@gmail.com",
    運営統括責任者: "青木悠飛",
    商品代金以外の必要料金: (
      <>
        基本的には0円 プレミアムプランの場合はSquareの手数料
        <br />{" "}
        独自ドメインやその他サービスを利用する場合は、サービス利用に関わるその他費用(ドメイン・その他自社サービス以外の月額費用)
      </>
    ),
    "返品・交換の方法":
      "初月は30日以内,その後は自由に解約可能であるため返金不可",
    引渡し時期: "通常2週間以内に納品・その後サービスを継続",
    支払い方法: "クレジットカード",
    支払い時期:
      "クレジットカード：各カード会社引き落とし日、銀行振込：注文後7日以内",
  };
  return (
    <>
      <Head>
        <title>特定商取引法に基づく表示</title>
      </Head>
      <Box className="system laptop:pt-[15vh] pt-[9vh] section">
        <Container>
          <Typography variant="h2" className="text-lg ml-10 mb-10">
            特定商取引法に基づく表示
          </Typography>
          <Table className="tablet:max-w-[90vw]">
            <TableBody>
              {Object.entries(lists).map(([key, value]) => (
                <>
                  <TableRow
                    // key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell key={key} component="th">
                      {key}
                    </TableCell>
                    <TableCell key={value} component="th">
                      {value}
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </Container>
      </Box>
    </>
  );
}
