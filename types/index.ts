import Stripe from "stripe"

export interface PageMeta {
  title: string
  description: string
  cardImage: string
}

export interface Customer {
  id: string /* primary key */
  stripe_customer_id?: string
}

export interface Product {
  id: string /* primary key */
  active?: boolean
  name?: string
  description?: string
  image?: string
  metadata?: Stripe.Metadata
}

export interface ProductWithPrice extends Product {
  prices?: Price[]
}

export interface UserDetails {
  id: string /* primary key */
  purpose: string
  site_name: string
  favorite: string
  google: string
  other: string
  email: string
  color: string
  billing_address?: Stripe.Address
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
  full_name?: string
}

export interface Price {
  id: string /* primary key */
  product_id?: string /* foreign key to products.id */
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: string
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  trial_period_days?: number | null
  metadata?: Stripe.Metadata
  products?: Product
}

export type PriceWithProduct = Price

export interface Subscription {
  id: string /* primary key */
  user_id: string
  status?: Stripe.Subscription.Status
  metadata?: Stripe.Metadata
  price_id?: string /* foreign key to prices.id */
  quantity?: number
  cancel_at_period_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  prices?: Price
}
