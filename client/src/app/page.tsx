"use client";

// Components
import Navbar from "@/components/Navbar/Navbar";
import Main from "@/components/Main";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Main />
    </>
  );
}
