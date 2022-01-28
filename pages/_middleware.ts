import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { NextApiRequest } from 'next'

export const middleware = async (
  req: NextRequest & NextApiRequest
  //   res: NextApiResponse
) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET! })
  const { pathname } = req.nextUrl

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname != '/login') {
    return NextResponse.redirect('/login')
  }
}
