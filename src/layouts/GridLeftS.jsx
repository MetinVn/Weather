import React from "react";
import { LocationIcon } from "./LocationIcon";
import { motion } from "framer-motion";
const GridLeftS = ({ locName, locCountry, conditionIcon, conditionText }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="grid grid-cols-1 font-Montserrat items-center text-white">
      <motion.h1
        className="mb-2 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}>
        <div className="flex flex-row items-center text-3xl">
          <LocationIcon />
          <div className="sm:ml-2">
            <span className="text-xs md:text-lg xl:text-xl">
              Place: {locName}
            </span>
            <span className="block text-xs md:text-lg xl:text-xl">
              {locCountry}
            </span>
          </div>
        </div>
      </motion.h1>
      <div className="flex flex-row items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}>
          <img src={conditionIcon} alt="icon" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}>
          <h1 className="text-xs md:text-lg xl:text-xl">{conditionText}</h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GridLeftS;
