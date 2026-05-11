"use client";

import {
  createContext,
  useContext,
  useOptimistic,
  useTransition,
  useCallback,
  type ReactNode,
} from "react";
import type { Announcement } from "../types";

type OptimisticAction =
  | { type: "add"; item: Announcement }
  | { type: "delete"; id: string };

function optimisticReducer(
  state: Announcement[],
  action: OptimisticAction,
): Announcement[] {
  switch (action.type) {
    case "add":
      return action.item.is_pinned
        ? [action.item, ...state]
        : [
            ...state.filter((a) => a.is_pinned),
            action.item,
            ...state.filter((a) => !a.is_pinned),
          ];
    case "delete":
      return state.filter((a) => a.id !== action.id);
    default:
      return state;
  }
}

interface AnnouncementContextValue {
  items: Announcement[];
  isPending: boolean;
  optimisticAdd: (item: Announcement) => void;
  optimisticDelete: (id: string) => void;
  startTransition: ReturnType<typeof useTransition>[1];
}

const AnnouncementContext = createContext<AnnouncementContextValue | null>(
  null,
);

interface Props {
  initialAnnouncements: Announcement[];
  children: ReactNode;
}

export function AnnouncementProvider({
  initialAnnouncements,
  children,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [items, dispatch] = useOptimistic(
    initialAnnouncements,
    optimisticReducer,
  );

  const optimisticAdd = useCallback(
    (item: Announcement) => dispatch({ type: "add", item }),
    [dispatch],
  );

  const optimisticDelete = useCallback(
    (id: string) => dispatch({ type: "delete", id }),
    [dispatch],
  );

  return (
    <AnnouncementContext.Provider
      value={{
        items,
        isPending,
        optimisticAdd,
        optimisticDelete,
        startTransition,
      }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const ctx = useContext(AnnouncementContext);
  if (!ctx)
    throw new Error(
      "useAnnouncements must be used inside <AnnouncementProvider>",
    );
  return ctx;
}
