import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 text-lg flex justify-between flex-row items-center">
        <div>
          <Link href={"/"} className="text-indigo-600 text-xl font-semibold">Recip.ie</Link>
        </div>
        <div className="flex flex-row gap-4">
          <Link href={"/sign-in"} className="px-4 font-semibold py-3 text-white bg-indigo-600 text-md rounded-lg transition duration-200 hover:bg-indigo-700">
            Sign-in
          </Link>
        </div>
      </div>
    </nav>
  )
}