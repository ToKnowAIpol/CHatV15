
import { SplashCursor } from "@/components/ui/splash-cursor";

export function NoiseDemo() {
  return (
    <SplashCursor 
      DENSITY_DISSIPATION={4}
      VELOCITY_DISSIPATION={2.5}
      PRESSURE={0.15}
      CURL={4}
      SPLAT_RADIUS={0.3}
      COLOR_UPDATE_SPEED={15}
    />
  );
}
