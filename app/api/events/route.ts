import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ApiResponse, CreateEventPayload } from '@/types'

export async function GET(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const from = searchParams.get('from') ?? new Date().toISOString()

  let query = supabase
    .from('events')
    .select('*, organizer:users(full_name)')
    .gte('start_date', from)
    .order('start_date', { ascending: true })

  if (category) query = query.eq('category', category)

  const { data, error } = await query

  if (error) return NextResponse.json<ApiResponse>({ success: false, error: error.message }, { status: 500 })
  return NextResponse.json<ApiResponse>({ success: true, data })
}

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json<ApiResponse>({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (!profile || !['admin', 'ketua_rw'].includes(profile.role)) {
    return NextResponse.json<ApiResponse>({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const body: CreateEventPayload = await request.json()
  const { data, error } = await supabase
    .from('events')
    .insert({ ...body, organizer_id: user.id })
    .select()
    .single()

  if (error) return NextResponse.json<ApiResponse>({ success: false, error: error.message }, { status: 500 })
  return NextResponse.json<ApiResponse>({ success: true, data, message: 'Kegiatan berhasil ditambahkan' }, { status: 201 })
}
