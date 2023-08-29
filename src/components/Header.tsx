import { PropsWithChildren } from "react";

import "./Header.css"

export type Props = PropsWithChildren

export default function Header({ children }: Props) {
  return (<h1 className="Header">{children}</h1>)
}
