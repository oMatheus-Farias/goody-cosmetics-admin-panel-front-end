import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col">
      <div className="px-2">header mobile</div>
      <div className="flex h-full">
        sidebar
        <div className="flex h-full w-full flex-col px-2 lg:ml-48">
          header desktop
          <main className="flex-1">
            <Outlet />
          </main>
          <div className="mt-8">footer</div>
        </div>
      </div>
    </div>
  )
}
