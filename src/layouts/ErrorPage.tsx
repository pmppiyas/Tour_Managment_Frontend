import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Oops! Something went wrong !!!</p>
      <Link to="/">
        <Button variant={"link"} size={"lg"}>
          Go to Home
        </Button>
      </Link>
    </div>
  );
}
