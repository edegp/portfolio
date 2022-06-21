# ANful公式サイト（Nextjsとsupabase,stripeで一度の読み込みでサブスクリプションに登録できるアプリケーション）

## Demo

### [https://anful.vercel.app/](https://anful.vercel.app/)

## What
 これまでのウェブ作成サービスは、お客様からのお問い合わせを受けて、資料送信⇒申し込み⇒作成の流れだったが、
 このアプリケーションを使うことで、お客様を待たせることなくサブスクリプションサービスに申し込みが可能。

## Architecture
![architecture](./public/image/subscription%20Diagram.drawio.png)

* フレームワークはNextjs.
* ホスティングにVercel.
* CMSにはcontentful.
* データベースにSupabase.
* 決済にStripeを使用.
 
## Features

- **Next.js** - Minimalistic framework for server-rendered React applications.
- **Typescript** - Superset of JavaScript which primarily provides optional static typing, classes and interfaces.

* **Sass/Scss** - CSS preprocessor, which adds special features such as variables, nested rules and mixins (sometimes referred to as syntactic sugar) into regular CSS.
* **ESLint** - The pluggable linting utility.
* **Axios** - A minimal and flexible Node.js web application framework that handles server-side rendering and integrates with Next.js.
* **TailwindCss**
* **Material-ui**
* **supabase.js**
* **stripe.js**

## How to use

```bash
git clone https://github.com/edegp/anful.git
# and
npm i
```

## Configuration

### Set up environment variables

From your contentful space, go to **Settings > API keys**. There will be an example Content delivery / preview token - you can use these API keys. (You may also create a new key.)

Next, copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `CONTENTFUL_SPACE_ID` should be the **Space ID** field of your API Key
- `CONTENTFUL_ACCESS_TOKEN` should be the **[Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) - access token** field of your API key
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` should be the **[Content Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/) - access token** field of your API key
- `CONTENTFUL_PREVIEW_SECRET` should be any value you want. It must be URL friendly as the dashboard will send it as a query parameter to enable preview mode
- `ACCESS_TOKEN` facebook access token
- `PAGE_ID` instagram pro account pageid

- other enviroment variables
  use [stripe](https://stripe.com/jp) and
  [supabase](https://supabase.com/)

  Your `.env.local` file should look like this:

```bash
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_PREVIEW_ACCESS_TOKEN=...
CONTENTFUL_PREVIEW_SECRET=...
```

### Run Next.js in development mode

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)!

### Deploy on Vercel

```bash
npx vercel
# or
yarn vercel
```
