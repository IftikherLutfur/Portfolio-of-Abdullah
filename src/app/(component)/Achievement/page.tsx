import MagicContainer from "@/components/Achivement/AchivementCard";
import Image from "next/image";

const Achievement = () => {
  return (
    <div className="mt-14 mx-auto text-center">
      <h1 className="text-5xl font-bold">Achievement</h1>

      <div className="flex justify-center mt-8">
        <MagicContainer className="w-full max-w-3xl">
          <div className="py-4 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-[#000000] dark:to-[#0a0d37] border-zinc-300 dark:border-[#1b2c68a0] rounded-xl px-5">
            <Image
              src="https://res.cloudinary.com/dgisrhgoe/image/upload/v1758875815/Screenshot_2025-09-26_143635_vvlpqu.png"
              alt="Certificate"
              width={300}
              height={300}
              className="w-full max-w-auto mx-auto border-2 border-purple-500 rounded-md"
            />
            <p className="text-black font-bold text-center mt-2">
              Complete Web Development Certificate from Programming Hero with Jhankar Mahbub
            </p>
          </div>
        </MagicContainer>
      </div>
    </div>
  );
};

export default Achievement;