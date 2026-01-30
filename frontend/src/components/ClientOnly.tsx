import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function ClientOnly({ children, fallback = null }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <>{fallback}</>;
  return <>{children}</>;
}

