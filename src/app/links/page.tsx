import Header from "@/components/header/Header";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
//import { useState } from "react";
import AddForm, { LinkType } from "@/components/linkformsection/AddForm";

export default async function Page() {
  //const [visible, setVisible] = useState(false);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { data } = await supabase.from("links").select();

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
          <div className="w-full space-y-6">
            <Button variant="outline" className="w-full">
              + Add new link
            </Button>
            {!data.length && (
              <div className="flex flex-col w-full justify-center items-center bg-[#fafafa] p-10 gap-10 rounded-lg">
                <Image
                  src="/images/bg-add.svg"
                  width={250}
                  height={161}
                  alt="image"
                />
                <div className="flex flex-col w-full space-y-6 xl:w-[30.5rem]">
                  <h3 className="text-[2rem] text-[#333333] text-center font-bold">
                    Let’s get you started
                  </h3>
                  <p className="text-base text-center font-normal text-[#737373]">
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
                  </p>
                </div>
              </div>
            )}
            {data &&
              data.map((link: LinkType) => (
                <AddForm link={link} key={link.id} />
              ))}
          </div>
          <div className="flex flex-row">
            <Button className="ml-auto" disabled={!data.length}>
              Save
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
