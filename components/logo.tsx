import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="">
      <Image
        height={500}
        width={500}
        alt="Curated"
        src="/logo.png"
        className="w-[120px] object-contain"
        priority
      />
    </Link>
  );
};
