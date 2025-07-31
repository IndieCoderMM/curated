"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Suspense, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInputBase = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="flex items-center rounded-full bg-slate-100 pl-4 ring ring-transparent focus-within:ring-accent">
      <SearchIcon className="h-4 w-4 text-black" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full border-0 bg-transparent outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 md:w-[300px]"
        placeholder="Search courses..."
      />
    </div>
  );
};

export const SearchInput = () => {
  return (
    <Suspense>
      <SearchInputBase />
    </Suspense>
  );
};
