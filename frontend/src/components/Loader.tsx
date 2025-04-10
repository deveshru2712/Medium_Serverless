import { Leapfrog } from "ldrs/react";
import "ldrs/react/Leapfrog.css";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Leapfrog size="40" speed="2.5" color="black" />
    </div>
  );
};

export default Loader;
