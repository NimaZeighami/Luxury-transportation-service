import { TruckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function DignityLimousine() {
  return (
    <div className={` flex flex-row items-center leading-none text-white`}>
      <TruckIcon className="h-12 w-12 " />
      <p className="text-3xl md:text-4xl">
        <a href="https://dignitylimo.com/">DPL</a>
      </p>
    </div>
  );
}
