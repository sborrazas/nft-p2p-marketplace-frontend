import { PropsWithChildren } from "react"

import "./Button.css"

export type Props = PropsWithChildren & {
  cta?: boolean
  onClick: () => void
}

export default function Button({ onClick, children, cta }: Props) {
  const additionalClasses = cta ? "Button--cta" : ""

  return (<span className={`Button ${additionalClasses}`} onClick={onClick}>{children}</span>)
}
