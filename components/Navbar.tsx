import Link from "next/link"
import { CheckSquare } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2 ">
          <CheckSquare className="h-6 w-6" />
          <span className="font-bold text-xl">TodoApp</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Home
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60 mr-5">
              About
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  )
}
