interface IAuthHeaderProps {
  title: string
  description: string
}

export default function AuthHeader({ title, description }: IAuthHeaderProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-goodycosmetics-primary-700 text-center text-xl font-medium">
        {title}
      </h1>
      <p className="text-center text-sm font-light text-gray-700">
        {description}
      </p>
    </div>
  )
}
