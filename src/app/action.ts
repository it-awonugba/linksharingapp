"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import { LoginFormType } from "@/components/loginform/LoginForm";
import { SignUpType } from "@/components/signup/SignUpForm";
import { LinkType } from "@/components/linkformsection/LinkFormSection";

export const handleLogin = async (values: LoginFormType) => {
  const { username, password } = values;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: username,
    password,
  });

  if (error) {
    return redirect("/?message=Could not authenticate user");
  }

  return redirect("/links");
};

export const handleSignUp = async (values: SignUpType) => {
  const origin = headers().get("origin");
  const { username, password } = values;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: username,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/?message=Could not authenticate user");
  }

  return redirect("/?message=Check email to continue sign in process");
};

export const verifyAuth = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }
};

export const saveLinks = async (data: LinkType[]) => {
  const supabase = createClient();

  const { error } = await supabase.from("links").insert(data);

  if (error) {
    throw new Error(`Error inserting link: ${error.message}`);
  }
};
