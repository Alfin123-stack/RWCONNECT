import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ApiResponse, CreateAnnouncementPayload } from '@/types'

// GET /api/announcements
export async function GET(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const priority = searchParams.get('priority')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '10')

  let query = supabase
    .from('announcements')
    .select('*, author:users(full_name, avatar_url)', { count: 'exact' })
    .eq('is_published', true)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (category) query = query.eq('category', category)
  if (priority) query = query.eq('priority', priority)

  const { data, count, error } = await query

  if (error) {
    return NextResponse.json<ApiResponse>({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json<ApiResponse>({
    success: true,
    data: { items: data, total: count },
  })
}

// POST /api/announcements
export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json<ApiResponse>({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  // Check admin role
  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (!profile || !['admin', 'ketua_rw'].includes(profile.role)) {
    return NextResponse.json<ApiResponse>({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const body: CreateAnnouncementPayload = await request.json()
  
  const { data, error } = await supabase
    .from('announcements')
    .insert({ ...body, author_id: user.id, is_published: true, view_count: 0 })
    .select()
    .single()

  if (error) {
    return NextResponse.json<ApiResponse>({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json<ApiResponse>({
    success: true,
    message: 'Pengumuman berhasil dibuat',
    data,
  }, { status: 201 })
}
