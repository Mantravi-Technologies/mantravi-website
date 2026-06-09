"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, servicesMenu } from "@/lib/content/site-data";
import { Button } from "@/components/ui/Button";
import { MantraviLogo } from "@/components/ui/Logo";
import { MegaMenu, NavItemWithMega } from "@/components/layout/MegaMenu";
import { useContact } from "@/components/providers/ContactProvider";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";
import { serviceLink } from "@/lib/utils/service-link";

type MegaType = "services";

const SCROLL_THRESHOLD = 40;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaType | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrolledRef = useRef(false);
  const { openContact } = useContact();
  const lenis = useLenis();
  const useFixedHeader = Boolean(lenis);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    document.documentElement.classList.add("mobile-nav-open");
    lenis?.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.classList.remove("mobile-nav-open");
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, lenis]);

  useEffect(() => {
    const updateScrolled = (scrollY: number) => {
      const next = scrollY > SCROLL_THRESHOLD;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };

    if (lenis) {
      updateScrolled(lenis.scroll);
      const unsubscribe = lenis.on("scroll", () => {
        updateScrolled(lenis.scroll);
      });
      return unsubscribe;
    }

    const onScroll = () => updateScrolled(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  const darkHeader = isHome;
  const showSolidDark = darkHeader && scrolled;

  const mobileMenu =
    mounted &&
    createPortal(
      <>
        <button
          type="button"
          className={cn(
            "fixed inset-0 z-[110] bg-black/50 transition-opacity duration-300 lg:hidden",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-label="Close menu"
          aria-hidden={!mobileOpen}
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
        />

        <div
          id="mobile-nav"
          data-lenis-prevent
          aria-hidden={!mobileOpen}
          className={cn(
            "fixed top-0 right-0 z-[120] flex h-[100dvh] w-full max-w-[min(100vw,20rem)] flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden",
            isHome ? "bg-black text-white" : "bg-white text-foreground",
            mobileOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between border-b px-4 py-3",
              isHome ? "border-white/10" : "border-slate-200",
            )}
          >
            <span className="text-sm font-semibold">Menu</span>
            <button
              type="button"
              className={cn(
                "rounded-lg p-2",
                isHome ? "text-white" : "text-foreground",
              )}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-4">
            {navLinks.main.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-lg font-medium",
                  isHome
                    ? "hover:bg-white/10 hover:text-primary"
                    : "text-foreground hover:bg-slate-50 hover:text-primary",
                )}
                onClick={() => setMobileOpen(false)}
                tabIndex={mobileOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            ))}

            <div
              className={cn(
                "mt-4 border-t pt-4",
                isHome ? "border-white/10" : "border-slate-100",
              )}
            >
              <p
                className={cn(
                  "px-4 text-xs font-bold uppercase",
                  isHome ? "text-slate-400" : "text-muted",
                )}
              >
                Services
              </p>
              {servicesMenu.map((group) => (
                <div key={group.title} className="mt-2 px-4">
                  <Link
                    href={group.href}
                    className="text-sm font-semibold hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                    tabIndex={mobileOpen ? 0 : -1}
                  >
                    {group.title}
                  </Link>
                  {group.items.slice(0, 4).map((item) => (
                    <Link
                      key={item.label}
                      href={serviceLink(group.href, item.anchor)}
                      className={cn(
                        "block py-1 text-sm",
                        isHome ? "text-slate-400" : "text-muted",
                      )}
                      onClick={() => setMobileOpen(false)}
                      tabIndex={mobileOpen ? 0 : -1}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <Button
              className="mx-4 mt-6 w-[calc(100%-2rem)]"
              onClick={() => {
                openContact();
                setMobileOpen(false);
              }}
              tabIndex={mobileOpen ? 0 : -1}
            >
              Consult Our Experts
            </Button>
          </nav>
        </div>
      </>,
      document.body,
    );

  return (
    <>
      <header
        className={cn(
          "top-0 z-[100] border-b transition-all duration-300",
          useFixedHeader ? "fixed inset-x-0" : "sticky",
          isHome
            ? showSolidDark
              ? "border-white/10 bg-black/90 backdrop-blur-md shadow-lg shadow-black/20"
              : "border-transparent bg-gradient-to-b from-black/55 via-black/15 to-transparent backdrop-blur-[2px]"
            : scrolled
              ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
              : "border-transparent bg-white/95 backdrop-blur-md",
        )}
        onMouseLeave={() => setActiveMega(null)}
      >
        <div
          className={cn(
            "relative mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8",
            scrolled ? "py-3" : "py-4",
          )}
        >
          <MantraviLogo
            variant={isHome ? "light" : "dark"}
            className={cn(scrolled && "text-lg")}
          />

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.main.map((link) => (
              <NavItemWithMega
                key={link.label}
                label={link.label}
                href={link.href}
                mega={"mega" in link ? link.mega : undefined}
                activeMega={activeMega}
                setActiveMega={setActiveMega}
                dark={darkHeader}
              />
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              size="sm"
              onClick={openContact}
              className={isHome ? "shadow-lg shadow-primary/25" : undefined}
            >
              Consult Our Experts
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "relative z-[130] -mr-1 rounded-lg p-2 lg:hidden",
              isHome ? "text-white" : "text-foreground",
            )}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {activeMega && (
          <MegaMenu
            open={!!activeMega}
            onClose={() => setActiveMega(null)}
            dark={darkHeader}
          />
        )}
      </header>
      {useFixedHeader ? (
        <div
          className="h-[var(--header-height)] shrink-0"
          aria-hidden
        />
      ) : null}
      {mobileMenu}
    </>
  );
}
