import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'

export async function POST(req: NextRequest) {
  try {
    const { postSlug } = await req.json()
    
    if (!postSlug) {
      return NextResponse.json(
        { error: 'Post slug is required' },
        { status: 400 }
      )
    }

    // Get IP address
    const forwardedFor = headers().get('x-forwarded-for')
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1'
    
    // Get user agent and parse it
    const userAgent = headers().get('user-agent') || ''
    const parser = new UAParser(userAgent)
    const browser = parser.getBrowser()
    const os = parser.getOS()
    const device = parser.getDevice()

    // Record the view
    const view = await prisma.postView.create({
      data: {
        postSlug,
        ipAddress,
        userAgent,
        browser: browser.name,
        os: os.name,
        device: device.type || 'desktop',
      },
    })

    // Get updated counts
    const counts = await prisma.postViewCount.findUnique({
      where: { postSlug },
    })

    return NextResponse.json({ view, counts })
  } catch (error) {
    console.error('Error recording view:', error)
    return NextResponse.json(
      { error: 'Failed to record view' },
      { status: 500 }
    )
  }
}

// Get total views for all posts
export async function GET() {
  try {
    const counts = await prisma.postViewCount.findMany({
      orderBy: { totalViews: 'desc' },
    })

    return NextResponse.json(counts)
  } catch (error) {
    console.error('Error fetching view counts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch view counts' },
      { status: 500 }
    )
  }
} 