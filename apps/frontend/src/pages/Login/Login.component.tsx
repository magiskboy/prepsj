import { LoaderFunctionArgs } from "react-router-dom";

export function Component() {
  return (
    <>
            Login
    </>
  )
}

Component.displayName = "Login";

export async function loader({ request }: LoaderFunctionArgs) {
  return {};
}