"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export default function Component() {
  const router = useRouter();
  if (process.env.RECRUITMENT_CLOSED !== "true") {
    router.push("/");
  }
  return (
    <motion.div
      className="min-h-screen bg-foreground flex items-start pt-[15vh] justify-center p-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Card className="w-full max-w-2xl p-2 md:p-8 bg-background border-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Recruitments are closed
          </CardTitle>
          <CardDescription className="text-center text-white" />
        </CardHeader>
        <CardContent className="text-center text-white">
          <p className="mb-4">
            Recruitments are currently closed We appreciate your interest in
            joining dBug Labs.
          </p>
          <p>
            In the meantime, feel free to connect with us on our social media
            platforms to stay updated on our latest news and events.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/company/dbuglabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-secondary text-white border-secondary hover:bg-primary hover:text-white"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link
              href="https://www.instagram.com/dbuglabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-secondary text-white border-secondary hover:bg-primary hover:text-white"
              >
                <InstagramLogoIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link
              href="https://twitter.com/dbuglabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-secondary text-white border-secondary hover:bg-primary hover:text-white"
              >
                <TwitterLogoIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
          </div>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
