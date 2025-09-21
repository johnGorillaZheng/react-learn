import Image from "next/image";
import Blog from "./blog/Blog";

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Blog />
    </div>
  );
}
