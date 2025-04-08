export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-goodycosmetics-secondary-600 flex h-10 w-full items-center justify-center border-t px-5 text-[12px] font-light text-gray-500 lg:justify-start">
      <span>{`Feito de ❤️ por Matheus Farias © ${currentYear}`}</span>
    </footer>
  )
}
