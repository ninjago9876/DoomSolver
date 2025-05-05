import { useCallback, useState } from "react";

export function useAnimationTrigger(duration = 500) {
    const [active, setActive] = useState(false);
  
    const trigger = useCallback(() => {
      setActive(true);
      const timeout = setTimeout(() => setActive(false), duration);
      return () => clearTimeout(timeout);
    }, [duration]);
  
    return { active, trigger };
  }
  