import Head from "next/head";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Policy() {
  return (
    <>
      <Head>
        <title>個人情報の取り扱いについて</title>
      </Head>
      <Box className="system laptop:pt-[15vh] pt-[9vh] section font-[Yu Mincho]">
        <Container>
          <Typography variant="h2" className="text-lg ml-10 mb-10">
            個人情報の取り扱いについて
          </Typography>
          <Typography variant="body1" className="text-sm mb-10">
            ANful（以下、「当社」といいます）は、お客様・お取引先様・株主の皆様・従業員の方々の個人情報について、「個人情報保護方針（プライバシー・ポリシー）」に従い適正な管理を行うとともに、個人情報の保護に努めます。
            具体的には、以下の内容に従って個人情報の取り扱いを行います。
          </Typography>
          <Box className="my-10">
            <Typography variant="h3" className="text-md mb-10">
              1. 個人情報の取得および利用について
            </Typography>
            <Typography variant="body1" className="text-xs">
              当社は、皆様から個人情報のご提供をお願いする際は、あらかじめ皆様の個人情報の利用目的・第三者への提供の有無等についてお知らせいたします。
              <br />
              また、皆様からご提供いただいた個人情報については、以下の利用目的以外の目的では利用いたしません。万一、当該目的以外の目的で利用する場合や、利用目的そのものを変更する場合は、事前に皆様にお知らせいたします。なお、利用目的に照らして不要となった個人情報については、速やかに且つ適正に削除・廃棄いたします。
            </Typography>
            <Box className="my-3">
              <Typography variant="h6" className="text-sm mb-2">
                ・利用目的
              </Typography>
              <Typography variant="body1" className="text-xs mb-10">
                ご注文いただいた商品の発送・決済業務のため
                登録いただいた方への情報提供のため
                商品・サービスの開発およびご案内のため
                その他、個別にご同意いただいた利用目的のため
              </Typography>
            </Box>
          </Box>
          <Box className="my-10">
            <Typography variant="h3" className="text-md mb-10">
              2. 個人情報の第三者への開示・提供について
            </Typography>
            <Typography className="text-xs">
              当社は、以下のいずれかに該当する場合を除き、個人情報を第三者（外国にある第三者を含む）に開示または提供いたしません。
            </Typography>

            <List className="list-decimal">
              <ListItem>
                <ListItemText className="text-xs ">
                  ・ご本人の同意がある場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・個人情報の取り扱いに関する業務の全部または一部を委託する場合
                  （但しこの場合、当社は委託先との間で個人情報保護に関する契約を締結する等、委託先の適切な監督に努めます。）
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・統計的なデータなどご本人を識別することができない状態で開示・提供する場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・法令に基づき開示・提供を求められた場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・人の生命、身体または財産の保護のために必要な場合であって、ご本人の同意を得ることが困難である場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・国または地方公共団体等が公的な事務を実施するうえで、協力する必要がある場合であって、ご本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合
                </ListItemText>
              </ListItem>
            </List>
          </Box>
          <Box className="my-10">
            <Typography variant="h3" className="text-md mb-10">
              3. 匿名加工情報の作成・提供について
            </Typography>
            <List className="list-decimal">
              <ListItem>
                <ListItemText className="text-xs ">
                  当社は、匿名加工情報を作成する場合は、以下の対応を行います。
                </ListItemText>
              </ListItem>
              <List>
                <ListItem>
                  <ListItemText className="text-xs ">
                    ① 特定の個人を識別することができない等の適切な加工を施す
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText className="text-xs ">
                    ② 情報漏えいを防止するための安全管理措置を講じる
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText className="text-xs ">
                    ③ 匿名加工情報に含まれる情報の項目を公表する
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText className="text-xs ">
                    ④
                    本人を識別するために、作成した匿名加工情報を他の情報と照合しない
                  </ListItemText>
                </ListItem>
              </List>
              <ListItem>
                <ListItemText className="text-xs ">
                  当社は、匿名加工情報を第三者に提供する場合は、当該情報に含まれる個人に関する情報の項目およびその提供方法について公表するとともに、当該第三者に対して、当該情報が匿名加工情報である旨を明示いたします。
                </ListItemText>
              </ListItem>
            </List>
          </Box>
          <Box className="my-10">
            <Typography variant="h3" className="text-md mb-10">
              4. 個人情報の管理について
            </Typography>
            <Typography variant="body1" className="text-xs">
              当社は、個人情報に関する法令、規範および社内諸規程に則り、皆様からご提供いただいた個人情報を適正に管理いたします。また、当社は、個人情報への不正アクセス、紛失、破壊、改ざん、漏洩等について適切かつ合理的な安全対策を講じるとともに、万一の発生時には速やかな是正措置を実施いたします。
            </Typography>
          </Box>
          <Box className="my-10">
            <Typography variant="h3" className="text-md mb-10">
              5. 個人データの開示等の請求について
            </Typography>
            <Typography className="text-xs">
              当社は、皆様からご提供いただいた個人データに関して、ご本人またはその代理人から、開示・訂正・削除・利用停止等（以下「開示等」といいます）の請求があった場合には、お申し出いただいた方がご本人であることを確認したうえで、合理的な期間および範囲で回答いたします。
              <br />
              但し、以下に記載する場合は非開示とさせていただきます。非開示を決定した場合は、その旨理由を付して通知させていただきます。
            </Typography>
            <List className="list-decimal">
              <ListItem>
                <ListItemText className="text-xs ">
                  ・保有個人データのご本人であることが確認できない場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・申込書面に不備があった場合や、当社の受付方法に従ったご請求でない場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・開示等の求めの対象が保有個人データに該当しない場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・他の法令に違反することとなる場合
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className="text-xs">
                  ・その他、個人情報保護法に基づき開示等の義務を負わない場合
                </ListItemText>
              </ListItem>
            </List>
          </Box>
          <Box className="my-10">
            <Typography variant="h3" className="text-md mb-10">
              6. 開示等の受付方法・窓口
            </Typography>
            <Typography variant="body1" className="text-xs">
              個人情報に関するお問い合わせは、以下の窓口にて受け付けいたします。なお、開示等の求めには応じられない場合がありますので、あらかじめご了承ください。
            </Typography>
            <Box className="text-xs my-14">Emeil: anfulled4@gmail.com</Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}
