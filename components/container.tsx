import React from "react"
type Props = React.ComponentProps<"div">

export default React.forwardRef<HTMLDivElement, Props>(function Container(
  { children, ...other },
  ref
) {
  return (
    <div ref={ref} id="container" {...other}>
      {children}
    </div>
  )
})
