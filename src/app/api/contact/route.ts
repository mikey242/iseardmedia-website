import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { headers } from 'next/headers'

// Handles POST requests to /api
export async function POST(request: NextRequest) {
  // return NextResponse.json({ message: process.env.NEXT_PUBLIC_EMAIL_USERNAME })

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Set to true for port 465, otherwise false
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email') as string
    const company = formData.get('company')
    const message = formData.get('message')
    const token = formData.get('cf-turnstile-response') as string
    const ip = headers().get('CF-Connecting-IP')

    // Create form data for Turnstile verification
    const verifyFormData = new FormData()
    verifyFormData.append('secret', String(process.env.TURNSTILE_SECRET_KEY))
    verifyFormData.append('response', String(token))
    verifyFormData.append('remoteip', String(ip))

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

    // Verify Turnstile using Cloudflare endpoint
    const verify = await fetch(url, {
      body: verifyFormData,
      method: 'POST',
    })

    const outcome = await verify.json()

    if (!outcome.success) {
      return NextResponse.json({ message: 'Invalid CAPTCHA' }, { status: 500 })
    }

    const result = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${email}`,
      html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Company: ${company} </p>
            <p>Message: ${message} </p>
            `,
    })

    // Respond with success message
    return NextResponse.json(
      { message: 'Email sent successfully', result },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 },
    )
  }
}
