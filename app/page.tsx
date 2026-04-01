import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <h1>
          Welcome to DevHire
        </h1>

       <div>
        <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Login
        </Link>
        <Link href="/register" className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Register
        </Link>
        <Link href="/dashboard" className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          DashBoard
        </Link>
      </div>     
    </div>
  );
}
