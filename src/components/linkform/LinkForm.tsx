"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

import AddForm from "./AddForm";
import { saveLinks } from "@/app/action";

export type LinkType = {
  platform: string;
  url: string;
  user: string;
};

export default function LinkForm({ user_id }: { user_id: string }) {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  const addNewLink = () => {
    setLinks((prev) => {
      return [...prev, { platform: "", url: "", user: user_id }];
    });
    setShowForm(true);
  };
  const handleSaveLink = async () => {
    saveLinks(links);
  };

  return (
    <>
      <div className="w-full space-y-6">
        <Button variant="outline" className="w-full" onClick={addNewLink}>
          + Add new link
        </Button>
        <div className="flex flex-col w-full justify-center items-center bg-[#fafafa] p-10 gap-10 rounded-lg">
          <>
            {links.length > 0 &&
              links.map((link, index) => <AddForm link={link} key={index} />)}
            {showForm && <AddForm />}
          </>

          {links.length === 0 && showForm === false && (
            <>
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
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row">
        <Button className="ml-auto" onClick={handleSaveLink}>
          Save
        </Button>
      </div>
    </>
  );
}
