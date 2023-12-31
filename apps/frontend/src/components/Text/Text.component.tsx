import { ElementType, PropsWithChildren } from "react"

export default function Text() {
  return (
    <></>
  )
}

type HeadingProps = {
    as?: ElementType,
    size?: 1 | 2 | 3,
    className?: string,
}

function Heading({
  as = 'h1',
  size = 2,
  className = '',
  children,
}: PropsWithChildren<HeadingProps>) {
  const A = as;
  return (
    <A className={`text-${size === 1 ? '' : size}xl font-semibold ${className}`}>{children}</A>
  )
}

Text.Heading = Heading;