import React, { FC } from "react";
import { useForm } from "@formspree/react";
import { TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";

export const Footer: FC = () => {
  const [state, handleSubmit] = useForm("mzbnzqr");
  if (state.succeeded) {
    return (
      <h1 className="md:text-5xl/tight my-4 max-w-lg text-4xl font-medium text-white">
        Thanks for sending your message!
      </h1>
    );
  }
  const menuOne = [
    "support center",
    "Customer Support",
    "About Us",
    "project",
    "Return Policy",
  ];
  const menuTwo = ["Press Inquires", "Social Media Support", "Image & B-roll"];
  return (
    <footer className="bg-default-950/40 backdrop-blur-3xla">
      <div className="border-t border-white/10 py-6">
        <div className="md:text-start container flex h-full flex-wrap items-center justify-center gap-4 text-center md:justify-between lg:px-20">
          <p className="text-default-400 text-base font-medium">
            @ Sai <a href="#">- Build using solana, deployed on vercel</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
