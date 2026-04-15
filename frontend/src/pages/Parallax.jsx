import { motion, useScroll, useTransform } from "framer-motion";

export default function Parallax() {
  const { scrollY } = useScroll();

  // different speeds
  const ySlow = useTransform(scrollY, [0, 500], [0, 100]);
  const yMedium = useTransform(scrollY, [0, 500], [0, 200]);
  const yFast = useTransform(scrollY, [0, 500], [0, 300]);

  return (
    <div style={{ height: "200vh", position: "relative" }}>
      
      {/* Background (slow) */}
      <motion.div
        style={{
          y: ySlow,
          position: "fixed",
          top: "20%",
          width: "100%",
          textAlign: "center",
          fontSize: "30px",
          color: "gray"
        }}
      >
        Background (Slow)
      </motion.div>

      {/* Middle */}
      <motion.div
        style={{
          y: yMedium,
          position: "fixed",
          top: "40%",
          width: "100%",
          textAlign: "center",
          fontSize: "40px",
          color: "blue"
        }}
      >
        Hello Parallax
      </motion.div>

      {/* Foreground (fast) */}
      <motion.div
        style={{
          y: yFast,
          position: "fixed",
          top: "60%",
          width: "100%",
          textAlign: "center",
          fontSize: "50px",
          color: "black"
        }}
      >
        Foreground (Fast)
      </motion.div>

    </div>
  );
}