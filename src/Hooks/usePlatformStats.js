import { useQuery } from "@tanstack/react-query";
import { getPlatformStats } from "@/Helpers/api";

/**
 * Fetches platform-wide stats (tenant counts, MRR, tickets, etc.).
 * Falls back to safe zeroes while loading so components never crash.
 */
export function usePlatformStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["platform_stats"],
    queryFn: getPlatformStats,
    staleTime: 30_000,
    retry: 1,
  });

  const safe = {
    total_tenants:    0,
    active_tenants:   0,
    trial_tenants:    0,
    suspended_tenants:0,
    total_users:      0,
    new_users_30d:    0,
    mrr:              0,
    arr:              0,
    pending_invoices: 0,
    open_tickets:     0,
    expiring_soon:    0,
    ...data,
  };

  return { stats: safe, isLoading, error };
}
