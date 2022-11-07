import {getSpecificKeyValueResult} from "../utils/localStorage";

export default function Dashboard() {
  return (
    <section className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-4xl">Dashboard</h1>
      {/* TODO: implement user name */}
      <p className={"text-lg pt-2"}>Hey, welcome {getSpecificKeyValueResult('userName')}. You are authenticated.</p>
    </section>
  )
}