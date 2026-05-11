"use client";

import {
  createContext,
  useContext,
  useOptimistic,
  useTransition,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Aspiration, AspirationStatus } from "../types";

// ─── Optimistic Action Types ──────────────────────────────────────────────────

type OptimisticAction =
  | { type: "add"; item: Aspiration }
  | { type: "remove"; id: string }
  | { type: "delete"; id: string }
  | { type: "upvote"; id: string }
  | { type: "unvote"; id: string }
  | { type: "update_status"; id: string; status: AspirationStatus }
  | { type: "update_response"; id: string; response: string | null };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function optimisticReducer(
  state: Aspiration[],
  action: OptimisticAction,
): Aspiration[] {
  switch (action.type) {
    case "add":
      return [action.item, ...state];

    case "remove":
      return state.filter((a) => a.id !== action.id);

    case "delete":
      return state.filter((a) => a.id !== action.id);

    case "upvote":
      return state.map((a) =>
        a.id === action.id ? { ...a, upvote_count: a.upvote_count + 1 } : a,
      );

    case "unvote":
      return state.map((a) =>
        a.id === action.id
          ? { ...a, upvote_count: Math.max(0, a.upvote_count - 1) }
          : a,
      );

    case "update_status":
      return state.map((a) =>
        a.id === action.id ? { ...a, status: action.status } : a,
      );

    case "update_response":
      return state.map((a) =>
        a.id === action.id
          ? {
              ...a,
              admin_response: action.response ?? undefined,
              admin_response_at: action.response
                ? new Date().toISOString()
                : undefined,
              status:
                action.response && a.status === "baru" ? "diproses" : a.status,
            }
          : a,
      );

    default:
      return state;
  }
}

// ─── Context Interface ────────────────────────────────────────────────────────

interface AspirationContextValue {
  items: Aspiration[];
  isStatusPending: boolean;
  isDeletePending: boolean;
  hasVoted: (id: string) => boolean;
  optimisticAdd: (item: Aspiration) => void;
  optimisticRemove: (id: string) => void;
  optimisticDelete: (id: string) => void;
  optimisticUpvote: (id: string) => void;
  optimisticUnvote: (id: string) => void;
  optimisticUpdateStatus: (id: string, status: AspirationStatus) => void;
  optimisticUpdateResponse: (id: string, response: string | null) => void;
  markVoted: (id: string) => void;
  markUnvoted: (id: string) => void;
  startAddTransition: ReturnType<typeof useTransition>[1];
  startUpvoteTransition: ReturnType<typeof useTransition>[1];
  startStatusTransition: ReturnType<typeof useTransition>[1];
  startDeleteTransition: ReturnType<typeof useTransition>[1];
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AspirationContext = createContext<AspirationContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

interface ProviderProps {
  initialAspirations: Aspiration[];
  initialVotedIds: string[];
  children: ReactNode;
}

export function AspirationProvider({
  initialAspirations,
  initialVotedIds,
  children,
}: ProviderProps) {
  const [, startAddTransition] = useTransition();
  const [, startUpvoteTransition] = useTransition();
  const [isStatusPending, startStatusTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const [items, dispatch] = useOptimistic(
    initialAspirations,
    optimisticReducer,
  );

  const [votedIds, setVotedIds] = useState<Set<string>>(
    () => new Set(initialVotedIds),
  );

  useEffect(() => {
    setVotedIds(new Set(initialVotedIds));
  }, [initialVotedIds]);

  // ── Vote helpers ────────────────────────────────────────────────────────────
  const hasVoted = useCallback((id: string) => votedIds.has(id), [votedIds]);

  const markVoted = useCallback((id: string) => {
    setVotedIds((prev) => new Set(prev).add(id));
  }, []);

  const markUnvoted = useCallback((id: string) => {
    setVotedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // ── Optimistic dispatchers ──────────────────────────────────────────────────
  const optimisticAdd = useCallback(
    (item: Aspiration) => dispatch({ type: "add", item }),
    [dispatch],
  );

  const optimisticRemove = useCallback(
    (id: string) => dispatch({ type: "remove", id }),
    [dispatch],
  );

  const optimisticDelete = useCallback(
    (id: string) => dispatch({ type: "delete", id }),
    [dispatch],
  );

  const optimisticUpvote = useCallback(
    (id: string) => dispatch({ type: "upvote", id }),
    [dispatch],
  );

  const optimisticUnvote = useCallback(
    (id: string) => dispatch({ type: "unvote", id }),
    [dispatch],
  );

  const optimisticUpdateStatus = useCallback(
    (id: string, status: AspirationStatus) =>
      dispatch({ type: "update_status", id, status }),
    [dispatch],
  );

  const optimisticUpdateResponse = useCallback(
    (id: string, response: string | null) =>
      dispatch({ type: "update_response", id, response }),
    [dispatch],
  );

  return (
    <AspirationContext.Provider
      value={{
        items,
        isStatusPending,
        isDeletePending,
        hasVoted,
        optimisticAdd,
        optimisticRemove,
        optimisticDelete,
        optimisticUpvote,
        optimisticUnvote,
        optimisticUpdateStatus,
        optimisticUpdateResponse,
        markVoted,
        markUnvoted,
        startAddTransition,
        startUpvoteTransition,
        startStatusTransition,
        startDeleteTransition,
      }}>
      {children}
    </AspirationContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAspirations() {
  const ctx = useContext(AspirationContext);
  if (!ctx)
    throw new Error("useAspirations must be used inside <AspirationProvider>");
  return ctx;
}
