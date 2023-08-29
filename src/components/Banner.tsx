import { PropsWithChildren } from "react";

import "./Banner.css"

export type Props = PropsWithChildren

export default function Banner({ children }: Props) {
  return (<section className="Banner">{children}</section>)
}

export function Paragraph({ children }: PropsWithChildren) {
  return (<p className="Banner-paragraph">{children}</p>)
}
