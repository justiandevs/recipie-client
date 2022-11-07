import Link from "next/link";

export default function SignIn() {
  return (
    <section className="bg-white shadow-sm p-8 rounded-lg">
      <h2 className="text-2xl font-semibold">Sign in</h2>
      <form className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col gap-2 text-lg">
          <label>Username</label>
          <input type="text" className="bg-gray-100 text-lg px-4 py-3 rounded-lg" placeholder="Your username..." />
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <label>Password</label>
          <input type="password" className="bg-gray-100 text-lg px-4 py-3 rounded-lg" placeholder="Your password..." />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>No account? No problem, just <Link href={'/sign-up'} className="text-indigo-700">create an account.</Link></p>
          <input type="submit" className="bg-indigo-600 text-white transition duration-200 hover:bg-indigo-700 px-4 py-3 font-semibold rounded-lg" />
        </div>
      </form>
    </section>
  )
}