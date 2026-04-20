import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'ezhil.1ek@hotmail.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fname, lname, email, company, service, message } = req.body;

  if (!fname || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'E-TecSa-K Website <onboarding@resend.dev>',
      to: TO_EMAIL,
      reply_to: email,
      subject: 'New Enquiry: ' + (service || 'General') + ' — ' + fname + ' ' + lname,
      html:
        '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">' +
        '<div style="background:#D42B1A;padding:24px 32px;">' +
        '<h1 style="color:#fff;margin:0;font-size:20px;">New Message — E-TecSa-K</h1>' +
        '</div>' +
        '<div style="padding:32px;background:#fafafa;border:1px solid #e4e4e4;">' +
        '<table style="width:100%;border-collapse:collapse;">' +
        '<tr><td style="padding:8px 0;color:#7a7a7a;font-size:13px;width:140px;">Name</td>' +
        '<td style="padding:8px 0;color:#0d0d0d;font-size:14px;font-weight:600;">' + fname + ' ' + lname + '</td></tr>' +
        '<tr><td style="padding:8px 0;color:#7a7a7a;font-size:13px;">Email</td>' +
        '<td style="padding:8px 0;"><a href="mailto:' + email + '" style="color:#D42B1A;">' + email + '</a></td></tr>' +
        (company ? '<tr><td style="padding:8px 0;color:#7a7a7a;font-size:13px;">Company</td><td style="padding:8px 0;color:#0d0d0d;font-size:14px;">' + company + '</td></tr>' : '') +
        (service ? '<tr><td style="padding:8px 0;color:#7a7a7a;font-size:13px;">Service</td><td style="padding:8px 0;color:#0d0d0d;font-size:14px;">' + service + '</td></tr>' : '') +
        '</table>' +
        '<hr style="border:none;border-top:1px solid #e4e4e4;margin:20px 0;"/>' +
        '<p style="color:#7a7a7a;font-size:13px;margin:0 0 8px;">Message</p>' +
        '<p style="color:#3a3a3a;font-size:15px;line-height:1.7;margin:0;white-space:pre-wrap;">' + message + '</p>' +
        '</div>' +
        '<div style="padding:16px 32px;background:#fff;border:1px solid #e4e4e4;border-top:none;text-align:center;">' +
        '<p style="color:#aaa;font-size:12px;margin:0;">Sent from E-TecSa-K contact form · Reply to this email to respond to ' + fname + '</p>' +
        '</div></div>',
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
