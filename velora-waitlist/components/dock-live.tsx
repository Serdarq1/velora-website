import { Dock, DockIcon } from "@/components/magicui/dock";
import { Instagram, Linkedin } from "lucide-react";
import React from "react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function DockLive() {
  return (
    <div className="  h-[500px] w-full max-w-[32rem] flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
      <Dock>
        <DockIcon>
          <Linkedin />
        </DockIcon>
        <DockIcon>
          <Instagram />
        </DockIcon>
      </Dock>
    </div>
  );
}