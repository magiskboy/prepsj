import { LoaderFunctionArgs } from "react-router";

export function Component() {
  return (
    <main className="flex-1">
    </main>
  )
}

Component.displayName = "About";

export async function loader({ request }: LoaderFunctionArgs) {
  return {}
}