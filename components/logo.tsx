import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="">
      <Image
        height={100}
        width={100}
        alt="logo"
        src="/logo.png"
        className="w-[120px] object-contain"
      />
    </Link>
  );
};
