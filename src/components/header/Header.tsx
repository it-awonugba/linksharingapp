import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";

export default function Header() {
  return (
    <header className="flex gap-2 p-6 w-full">
      <section className="flex justify-between items-center w-full p-4 rounded-md bg-white">
        <div>
          <Link href="/links" className="flex space-x-2 items-center">
            <Image
              src="/images/dashboard_logo.svg"
              alt="logo"
              width={28}
              height={28}
            />
            <h3 className="font-bold text-[2rem] text-[#333333] hidden sm:block">
              devlink
            </h3>
          </Link>
        </div>
        <nav>
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link
                href="/links"
                className={`flex rounded-lg gap-2 ${buttonVariants({
                  variant: "secondary",
                })}`}
              >
                <Image
                  src="/images/link-bold.svg"
                  width={21}
                  height={20}
                  alt="links icon"
                />
                <span className="hidden text-base sm:block">Links</span>
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex gap-2">
                <Image
                  src="/images/user-circle-bold.svg"
                  width={21}
                  height={20}
                  alt="links icon"
                />
                <span className="hidden text-base text-[#737373] sm:block">
                  Profile Details
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="justify-end">
          <Button variant="outline" className="text-base">
            Preview
          </Button>
        </div>
      </section>
    </header>
  );
}
