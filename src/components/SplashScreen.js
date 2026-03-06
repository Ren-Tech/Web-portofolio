import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const CoffeeSplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setLoadingPhase(0);
    else if (progress < 50) setLoadingPhase(1);
    else if (progress < 75) setLoadingPhase(2);
    else setLoadingPhase(3);
  }, [progress]);

  const loadingMessages = [
    { emoji: "☕", text: "Brewing fresh code...", color: "text-amber-400" },
    { emoji: "💻", text: "Compiling creativity...", color: "text-blue-400" },
    { emoji: "🚀", text: "Launching excellence...", color: "text-purple-400" },
    { emoji: "✨", text: "Almost ready!", color: "text-green-400" }
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-[#111827] via-[#1e293b] to-[#0f172a] flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [20, -20, 20],
            y: [20, -20, 20]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating code particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { symbol: '{', delay: 0, x: '10%', y: '15%' },
          { symbol: '}', delay: 0.2, x: '85%', y: '20%' },
          { symbol: '</>', delay: 0.4, x: '15%', y: '70%' },
          { symbol: '/>', delay: 0.6, x: '80%', y: '65%' },
          { symbol: '=>', delay: 0.8, x: '50%', y: '10%' },
          { symbol: '()', delay: 1, x: '90%', y: '80%' },
          { symbol: '[]', delay: 1.2, x: '20%', y: '85%' },
          { symbol: 'fn', delay: 1.4, x: '70%', y: '30%' },
          { symbol: 'const', delay: 1.6, x: '25%', y: '40%' },
          { symbol: 'let', delay: 1.8, x: '75%', y: '50%' }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-400/30 text-lg font-mono font-bold"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.5, 0.5],
              y: [-30, 30, -30],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Main coffee cup container */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 12,
            duration: 1
          }}
        >
          {/* Glow effect behind cup */}
          <motion.div
            className="absolute inset-0 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-amber-500 rounded-full" />
          </motion.div>

          {/* Enhanced Steam Animation - Closer to cup */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{ left: `${-10 + i * 5}px` }}
                animate={{
                  y: [0, -50],
                  opacity: [0, 0.9, 0],
                  scale: [0.8, 1.2],
                  x: [0, (i % 2 === 0 ? 6 : -6)]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              >
                <div className="w-2 h-8 bg-gradient-to-t from-blue-200 via-purple-200 to-transparent rounded-full blur-sm" />
              </motion.div>
            ))}
          </div>

          {/* Coffee Cup SVG with enhanced details */}
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            <defs>
              <linearGradient id="cupGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="coffeeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#92400e" />
                <stop offset="30%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="foamGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5f5f4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d6d3d1" stopOpacity="0.7" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
              </filter>
              <radialGradient id="shine">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Cup shadow */}
            <ellipse cx="80" cy="135" rx="45" ry="8" fill="rgba(0,0,0,0.3)" filter="blur(4px)" />

            {/* Saucer */}
            <motion.ellipse
              cx="80" cy="130" rx="55" ry="8"
              fill="url(#cupGradient)"
              stroke="#60a5fa"
              strokeWidth="2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {/* Cup body */}
            <motion.path
              d="M 40 55 L 38 108 C 38 116 45 122 55 124 L 105 124 C 115 122 122 116 122 108 L 120 55 Z"
              fill="url(#cupGradient)"
              stroke="#60a5fa"
              strokeWidth="2.5"
              filter="url(#shadow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Coffee liquid with animated level */}
            <motion.path
              d="M 42 70 L 41 105 C 41 110 47 115 55 116 L 105 116 C 113 115 119 110 119 105 L 118 70 Z"
              fill="url(#coffeeGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 1, delay: 1 }}
            />

            {/* Coffee foam/crema */}
            <motion.ellipse
              cx="80" cy="68" rx="39" ry="6"
              fill="url(#foamGradient)"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            />

            {/* Foam bubbles */}
            {[
              { cx: 70, cy: 68, r: 2 },
              { cx: 85, cy: 66, r: 1.5 },
              { cx: 95, cy: 69, r: 2.5 },
              { cx: 60, cy: 67, r: 1.8 }
            ].map((bubble, i) => (
              <motion.circle
                key={i}
                {...bubble}
                fill="rgba(255,255,255,0.6)"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0.9] }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
              />
            ))}

            {/* Cup rim highlight */}
            <motion.ellipse
              cx="80" cy="55" rx="41" ry="7"
              fill="#1e293b"
              stroke="#60a5fa"
              strokeWidth="2.5"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />

            {/* Shine effect on cup */}
            <motion.ellipse
              cx="55" cy="75" rx="15" ry="30"
              fill="url(#shine)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.4] }}
              transition={{ duration: 1, delay: 1.8 }}
            />

            {/* Handle with gradient */}
            <motion.path
              d="M 122 65 Q 145 65 148 85 Q 148 105 122 105"
              stroke="url(#cupGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
            />
            <motion.path
              d="M 122 65 Q 145 65 148 85 Q 148 105 122 105"
              stroke="#60a5fa"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            />

            {/* Code symbol on cup with glow */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, type: "spring" }}
            >
              <text 
                x="80" y="95" 
                fontSize="20" 
                fill="#60a5fa" 
                fontFamily="monospace" 
                fontWeight="bold"
                textAnchor="middle"
                filter="url(#glow)"
              >
                {'</>'}
              </text>
            </motion.g>

            {/* Additional decorative elements */}
            <motion.circle
              cx="75" cy="60" r="1.5"
              fill="#a855f7"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.5, delay: 2.2 }}
            />
            <motion.circle
              cx="100" cy="62" r="1"
              fill="#3b82f6"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.5, delay: 2.3 }}
            />
          </svg>

          {/* Orbiting particles around cup */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute top-1/2 left-1/2 w-2 h-2"
              style={{
                marginLeft: '-4px',
                marginTop: '-4px'
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                style={{
                  transform: `translateX(${70 + i * 10}px)`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Loading Text with AnimatePresence */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={loadingPhase}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-3"
            >
              <motion.span
                className="text-4xl"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              >
                {loadingMessages[loadingPhase].emoji}
              </motion.span>
              <h2 className={`text-3xl font-bold ${loadingMessages[loadingPhase].color} drop-shadow-lg`}>
                {loadingMessages[loadingPhase].text}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Subtitle with facts */}
          <motion.p
            className="text-gray-400 text-sm italic max-w-md"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {progress < 25 && "Did you know? Developers drink an average of 4 cups of coffee per day"}
            {progress >= 25 && progress < 50 && "Fun fact: The first computer bug was an actual moth!"}
            {progress >= 50 && progress < 75 && "Pro tip: Good code is like a good joke - it needs no explanation"}
            {progress >= 75 && "Remember: It works on my machine! ☕"}
          </motion.p>
        </motion.div>

        {/* Enhanced Progress Bar Container */}
        <div className="w-80 mb-4">
          <div className="relative h-4 bg-gray-800/50 rounded-full overflow-hidden border-2 border-gray-700/50 backdrop-blur-sm shadow-inner">
            {/* Background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: [-200, 400] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Progress fill - solid blue */}
            <motion.div
              className="absolute inset-0 bg-blue-500 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Animated shine on progress bar */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            {/* Progress glow */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-400 rounded-full blur-xl"
              style={{ right: `${100 - progress}%` }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Loading dots */}
        <motion.div
          className="flex gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Developer quote */}
        <motion.div
          className="mt-8 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-gray-500 text-xs italic leading-relaxed">
            "Code is like humor. When you have to explain it, it's bad." <br/>
            <span className="text-blue-400">- Cory House</span>
          </p>
        </motion.div>
      </div>

      {/* Corner decorations */}
      {[
        { corner: 'top-left', rotation: 0 },
        { corner: 'top-right', rotation: 90 },
        { corner: 'bottom-left', rotation: 270 },
        { corner: 'bottom-right', rotation: 180 }
      ].map(({ corner, rotation }) => (
        <motion.div
          key={corner}
          className={`absolute ${corner.includes('top') ? 'top-4' : 'bottom-4'} ${corner.includes('left') ? 'left-4' : 'right-4'}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1, rotate: rotation }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M 0 0 L 30 0 L 0 30 Z"
              fill="none"
              stroke="url(#cornerGradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="cornerGradient">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CoffeeSplashScreen;