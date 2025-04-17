type TProps = {
  title: string
  description: string
  children?: React.ReactNode
}

export default function MainContentHeader({
  title,
  description,
  children,
}: TProps) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
      <div className="flex flex-col">
        <h2 className="text-xl text-gray-600">{title}</h2>
        <p className="text-sm font-light text-gray-400">{description}</p>
      </div>
      {children}
    </div>
  )
}
