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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export default function Component() {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 flex items-start pt-[15vh] justify-center p-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Card className="w-full max-w-2xl p-2 md:p-8 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Thank You for Applying!
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Your response has been submitted successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-gray-300">
          <p className="mb-4">
            We appreciate your interest in joining dBug Labs. Our team will
            review your application, and we&apos;ll get back to you shortly.
          </p>
          <p>
            In the meantime, feel free to connect with us on our social media
            platforms to stay updated on our latest news and events.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/company/dbug-labs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:text-white"
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
                className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:text-white"
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
                className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:text-white"
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
