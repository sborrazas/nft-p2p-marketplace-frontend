import { PropsWithChildren } from "react"
import { Link as RouterLink } from "react-router-dom"
import "./Link.css"

export type Props = PropsWithChildren & {
  to: string
}

export default function Link({ to, children }: Props) {
  return (<RouterLink to={to} className="Link">{children}</RouterLink>)
}
