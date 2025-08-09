import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function SocialLoginButtons() {
  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full flex items-center gap-2 justify-center"
        onClick={() => console.log("Google login")}
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center gap-2 justify-center"
        onClick={() => console.log("GitHub login")}
      >
        <FaGithub size={20} />
        Continue with GitHub
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center gap-2 justify-center"
        onClick={() => console.log("Facebook login")}
      >
        <FaFacebook size={20} className="text-blue-600" />
        Continue with Facebook
      </Button>
    </div>
  );
}
