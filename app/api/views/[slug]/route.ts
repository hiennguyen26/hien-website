import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    // Get view counts
    const counts = await prisma.postViewCount.findUnique({
      where: { postSlug: slug },
    })

    // Get detailed analytics
    const analytics = await prisma.$queryRaw`
      SELECT 
        COUNT(*) as total_views,
        COUNT(DISTINCT ip_address) as unique_visitors,
        COUNT(DISTINCT date_trunc('day', viewed_at)) as days_with_views,
        MAX(viewed_at) as last_viewed,
        MODE() WITHIN GROUP (ORDER BY country_code) as top_country,
        MODE() WITHIN GROUP (ORDER BY browser) as top_browser,
        MODE() WITHIN GROUP (ORDER BY os) as top_os
      FROM post_views
      WHERE post_slug = ${slug}
      GROUP BY post_slug
    `

    // Get recent views
    const recentViews = await prisma.postView.findMany({
      where: { postSlug: slug },
      orderBy: { viewedAt: 'desc' },
      take: 10,
      select: {
        ipAddress: true,
        viewedAt: true,
        browser: true,
        os: true,
        device: true,
        countryCode: true,
        city: true,
      },
    })

    return NextResponse.json({
      counts,
      analytics: analytics[0] || null,
      recentViews,
    })
  } catch (error) {
    console.error('Error fetching post stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post statistics' },
      { status: 500 }
    )
  }
} 