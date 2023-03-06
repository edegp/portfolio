import Image from "next/image"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { useForm, ValidationError } from "@formspree/react"
import { useState, useEffect } from "react"
import Footer from "../footer"

export default function FAQ() {
  const lists = [
    {
      name: "cost",
      open: false,
      question: "利用料金の仕組みは？",
      answer: (
        <>
          アンフルは月額定額でホームページのオーナーになれるサブスクリプションサービスです。
          <br />
          料金は月額500円~1980円まで。追加料金、長期契約はありません。
        </>
      ),
    },
    {
      name: "feature",
      open: false,
      question: "アンフルのホームページ作成の特徴はなんですか？",
      answer: (
        <>
          アンフルでは、簡単に最新の技術を使用したウェブサイトが作成可能です。
          <br />
          さらに、スタンダードプランからは小規模な飲食店に特化した予約・自動投稿システム（今後実装予定）を利用できます。
          <br />
          アンフルでホームページを作成することで、これまで逃してきた潜在的な顧客にアプローチ可能です。
        </>
      ),
    },
    {
      name: "cancel",
      open: false,
      question: "どうやって解約するの？",
      answer: (
        <>
          登録完了画面からstripeのサイトに移動していただき、
          解約ボタンを押した後に、確認ボタンを押すだけで解約可能です。
          <br />
          いつ解約しても、違約金はかかりません。
        </>
      ),
    },
    {
      name: "design",
      open: false,
      question: "デザインに不満があった場合、改善等は対応はありますか？",
      answer: (
        <>
          デザインに不満がある場合は、始めの1か月は何回でも改善対応いたします。
          <br />
          その後はプランごとにデザイン更新ができる期間が異なります。
        </>
      ),
    },
    {
      name: "payment",
      open: false,
      question: "どのような決済方法が使えますか？",
      answer: (
        <>
          当社では、stripeを用いた,クレジット決済のみがご利用可能です。
          <br />
          振込、キャリア決済には対応しておりません
          <br />
          ※stripeはお客様情報を暗号化し決済を行うサービスです。
        </>
      ),
    },
  ]

  const [state, setState] = useState(lists)
  const handleClick = (targetID) =>
    setState(
      state.map((list, id) =>
        id === targetID ? { ...list, open: !list.open } : list
      )
    )
  return (
    <Box className="system laptop:pt-[15vh] pt-[9vh] section">
      <Typography className="font-semibold text-primary text-xl text-center">
        FAQ
      </Typography>
      <Typography className="font-semibold text-primary text-2xl text-center laptop:mb-vw-5 mb-vw-2 underline decoration-secondary underline-offset-4 decoration-8">
        よくある質問
      </Typography>
      <Container>
        <List>
          {lists.map((list, index) => (
            <Accordion className="mb-5 rounded-lg before:hidden border-[0.5px] border-solid boder-gray-800">
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography className="text-sm text-center font-semibold">
                  {list.question}
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Typography className="text-xs font-medium p-10">
                  {list.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Container>
      <Footer />
    </Box>
  )
}
