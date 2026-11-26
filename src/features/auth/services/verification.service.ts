import "server-only";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function getAppUrl() {
  const url = process.env.APP_URL;

  if (!url) {
    throw new Error("APP_URL is not configured.");
  }

  return url.replace(/\/$/, "");
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
) {
  const resetUrl = new URL(
    "/reset-password",
    getAppUrl()
  );

  resetUrl.searchParams.set("token", token);

  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  const { data, error } = await resend.emails.send({
    from,
    to: [email],
    subject: "Reset your Wikendia password",

    html: `
      <div style="
        max-width: 560px;
        margin: 0 auto;
        padding: 32px 24px;
        font-family: Arial, sans-serif;
        color: #1a1a1a;
      ">
        <h1 style="color: #124734;">
          Reset your Wikendia password
        </h1>

        <p>
          We received a request to reset your Wikendia account password.
        </p>

        <p>
          Click below to choose a new password.
        </p>

        <a
          href="${resetUrl.toString()}"
          style="
            display: inline-block;
            padding: 14px 24px;
            background: #124734;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          "
        >
          Reset password
        </a>

        <p style="margin-top: 24px;">
          This link expires in 30 minutes and can only be used once.
        </p>

        <p>
          If you did not request this reset, you can ignore this email.
        </p>

        <p style="margin-top: 32px;">
          The Wikendia Team
        </p>
      </div>
    `,

    text: `
Reset your Wikendia password

We received a request to reset your password.

Use this link:
${resetUrl.toString()}

This link expires in 30 minutes and can only be used once.

If you did not request this, ignore this email.
    `,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error("Unable to send password reset email.");
  }

  return data;
}