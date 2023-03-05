import React from "react"

export default function Container({
  children,
  ...other
}: React.ComponentProps<"div">) {
  return (
    <div id="container" {...other}>
      {children}
    </div>
  )
}
