'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '../lib/supabase/client'

interface UseFetchOptions {
  table: string
  select?: string
  filters?: Record<string, string | boolean | number>
  orderBy?: { column: string; ascending?: boolean }
  limit?: number
  enabled?: boolean
}

export function useSupabaseFetch<T>({
  table,
  select = '*',
  filters = {},
  orderBy,
  limit,
  enabled = true,
}: UseFetchOptions) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!enabled) return
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      let query = supabase.from(table).select(select)
      Object.entries(filters).forEach(([k, v]) => {
        query = query.eq(k, v) as any
      })
      if (orderBy) query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false }) as any
      if (limit) query = query.limit(limit) as any
      const { data: result, error: err } = await query
      if (err) throw err
      setData((result as T[]) ?? [])
    } catch (e: any) {
      setError(e.message ?? 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }, [table, select, JSON.stringify(filters), orderBy?.column, limit, enabled])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}
