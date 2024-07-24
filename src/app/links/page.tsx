import Image from "next/image";
import Header from "@/components/header/Header";
import { createClient } from "../../../utils/supabase/server";

import { redirect } from "next/navigation";

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <section className="flex flex-row w-full h-full gap-x-6">
        <div className="hidden w-1/3 h-full justify-center items-center bg-white rounded-lg xl:flex">
          <div className="w-[307px] h-[631px] bg-center bg-contain bg-no-repeat bg-[url('/images/preview-section.png')]"></div>
        </div>
        <div className="w-2/3 bg-white flex rounded-lg">
          <div>
            <h1 className="font-bold text-[2rem]">Customize your links</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
