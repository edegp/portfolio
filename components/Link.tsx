import * as React from "react"
import clsx from "clsx"
import { useRouter } from "next/router"
import NextLink, { LinkProps } from "next/link"
import MuiLink from "@mui/material/Link"

const Link: React.ForwardRefExoticComponent<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps & {
      children?: React.ReactNode
    } & React.RefAttributes<HTMLAnchorElement> & {
      activeClassName?: string
      linkAs?: any
    }
> = React.forwardRef((props, ref) => {
  const {
    activeClassName = "active",
    as,
    className: classNameProps,
    href,
    locale,
    prefetch,
    replace,
    scroll,
    shallow,
    children,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === "string" ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0)

  if (isExternal) {
    return <MuiLink className={className} href={href} ref={ref} {...other} />
  }

  const nextjsProps = {
    to: href,
    as,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
  }

  return (
    <MuiLink className={className} ref={ref} {...other}>
      <NextLink href={href} {...nextjsProps}>
        {children}
      </NextLink>
    </MuiLink>
  )
})

export default Link
