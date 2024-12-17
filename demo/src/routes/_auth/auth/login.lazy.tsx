import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/login"!</div>
}
