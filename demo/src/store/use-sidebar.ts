import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

const sidebarState = atomWithStorage("sidebarState", true);

export function useSidebar() {
  const [isOpen, setIsOpen] = useAtom(sidebarState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    mounted,
    open,
    close,
    toggle,
  };
}
