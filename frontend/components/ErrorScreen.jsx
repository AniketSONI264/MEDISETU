import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ErrorScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
    <p className="text-gray-600 mb-4">Unable to load appointment or doctor details</p>
    <Link href="/">
      <Button className="bg-teal-600 hover:bg-teal-700">Return to Home</Button>
    </Link>
  </div>
);