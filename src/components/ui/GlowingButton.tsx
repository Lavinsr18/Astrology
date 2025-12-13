import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, children, variant = "primary", size = "md", icon, ...props }, ref) => {
    const baseStyles = "relative overflow-hidden font-display font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 z-10";
    
    const variants = {
      primary: "bg-primary text-white shadow-[0_0_20px_-5px_hsl(var(--primary))] hover:shadow-[0_0_30px_0px_hsl(var(--primary))] border border-primary/50",
      secondary: "bg-secondary text-white shadow-[0_0_20px_-5px_hsl(var(--secondary))] hover:shadow-[0_0_30px_0px_hsl(var(--secondary))] border border-secondary/50",
      outline: "bg-transparent text-primary border border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_20px_-5px_hsl(var(--primary))]"
    };

    const sizes = {
      sm: "text-xs px-4 py-2 rounded-lg",
      md: "text-sm px-6 py-3 rounded-xl",
      lg: "text-base px-8 py-4 rounded-xl"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...(props as any)} // Cast to any to satisfy TS constraints with framer-motion props
      >
        {/* Glow effect overlay */}
        <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </motion.button>
    );
  }
);

GlowingButton.displayName = "GlowingButton";

export default GlowingButton;
