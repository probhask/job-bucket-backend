import config from '@/config/config';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(config.sendGrid.apiKey!);

export const sendEmail = async ({
  subject,
  text,
  html,
  attachments,
  template_id,
  personalizations,
  to,
}: {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: any[];
  template_id?: string;
  personalizations?: any[];
}): Promise<void> => {
  const msg = {
    from: config.sendGrid.from,
    to,
    subject,
    ...(text && { text }),
    ...(html && { html }),
    ...(attachments && { attachments }),
  };
  try {
    await sgMail.send(msg as sgMail.MailDataRequired);
  } catch (error: any) {
    console.error('Failed to send email', error?.response?.body?.errors);
  }
};

/**
 * Send email verification with OTP
 * @param {string} email - Recipient's email address
 * @param {string} otp - OTP to send
 */

export const sendEmailVerification = async (
  email: string,
  otp: string,
): Promise<void> => {
  await sendEmail({
    subject: 'Verify your email',
    text: `Your OTP is ${otp}`,
    // html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    to: email,
    personalizations: [
      {
        to: [{ email }],
        dynamic_template_data: {
          otp,
        },
      },
    ],
  });
};
