"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

import AddForm from "./AddForm";
import { saveLinks } from "@/app/action";
import { createClient } from "../../../utils/supabase/client";

export type LinkType = {
  id: number;
  platform: string;
  link: string;
  uuid: string;
};

export default function LinkFormSection({ user_id }: { user_id: string }) {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  useEffect(() => {
    const fetchLinks = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("links").select();
      setLinks(data);
    };
  }, []);

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

          {links.length === 0 && showForm === false && <></>}
        </div>
      </div>
      <div className="flex flex-row">
        <Button className="ml-auto" disabled={!data.length}>
          Save
        </Button>
      </div>
    </>
  );
}
