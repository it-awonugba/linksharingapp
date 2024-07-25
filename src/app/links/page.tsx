import Header from "@/components/header/Header";
import LinkFormSection from "@/components/linkformsection/LinkFormSection";
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
        <div className="w-full bg-white flex flex-col p-10 gap-10 rounded-lg xl:w-2/3">
          <div className="">
            <h1 className="font-bold text-[2rem]">Customize your links</h1>
            <p className="text-[#888888]">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>

          <LinkFormSection user_id={user.id} />
        </div>
      </section>
    </div>
  );
}
