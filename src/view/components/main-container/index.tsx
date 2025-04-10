type TProps = {
  children: React.ReactNode
}

export default function MainContainer({ children }: TProps) {
  return <main className="w-full p-5">{children}</main>
}
