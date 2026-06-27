/** Pinned scroll lag — desktop Lenis */
export const PORTFOLIO_SCRUB_SMOOTH = 1.35;
/** Lighter lag for native touch scroll on phones */
export const PORTFOLIO_SCRUB_NATIVE = 0.72;

export const PORTFOLIO_SNAP_EASE = "power3.out";
export const PORTFOLIO_SNAP_DURATION = { min: 0.48, max: 0.72 } as const;
/** Slightly quicker snap on touch devices */
export const PORTFOLIO_SNAP_DURATION_TOUCH = { min: 0.4, max: 0.58 } as const;
export const PORTFOLIO_SNAP_DELAY = 0.06;

export const PORTFOLIO_SETTLE_EASE = "power3.out";
export const PORTFOLIO_SETTLE_DURATION = 0.55;

export const PORTFOLIO_NAV_DURATION = 0.52;
export const PORTFOLIO_EMBLA_DURATION = 42;

export const PORTFOLIO_CARD_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
