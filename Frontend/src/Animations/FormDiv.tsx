import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedInputProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ children, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="grid gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children} {/* Render any child elements passed to the component */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedInput;
