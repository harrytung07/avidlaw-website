import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface FormSectionRow {
  label: string;
  value: string;
}

interface FormSection {
  sectionTitle: string;
  rows: FormSectionRow[];
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 1. Honeypot check for spam prevention
    const gotcha = formData.get("_gotcha") as string | null;
    if (gotcha && gotcha.trim() !== "") {
      return NextResponse.json(
        { success: false, error: "Spam detected." },
        { status: 400 }
      );
    }

    const formType = (formData.get("formType") as string) || "consultation";
    const formTitle =
      (formData.get("formTitle") as string) || "Client Intake Form";
    const clientName = (formData.get("clientName") as string) || "Prospective Client";
    const clientEmail = (formData.get("clientEmail") as string) || "";
    const clientPhone = (formData.get("clientPhone") as string) || "";
    const locale = (formData.get("locale") as string) || "en";
    const signatureDataUrl = formData.get("signatureDataUrl") as string | null;

    let sections: FormSection[] = [];
    const sectionsJson = formData.get("sections") as string | null;
    if (sectionsJson) {
      try {
        sections = JSON.parse(sectionsJson);
      } catch (err) {
        console.error("Failed to parse form sections JSON:", err);
      }
    }

    // 2. Extract uploaded files
    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType?: string;
      cid?: string;
    }> = [];

    // Signature attachment via CID for inline email rendering
    if (signatureDataUrl && signatureDataUrl.startsWith("data:image/png;base64,")) {
      const base64Data = signatureDataUrl.replace(/^data:image\/png;base64,/, "");
      const signatureBuffer = Buffer.from(base64Data, "base64");
      attachments.push({
        filename: "client-signature.png",
        content: signatureBuffer,
        contentType: "image/png",
        cid: "client-signature",
      });
    }

    // Process file attachments
    const fileEntries = formData.getAll("files");
    for (const entry of fileEntries) {
      if (entry instanceof File && entry.size > 0) {
        const arrayBuffer = await entry.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        attachments.push({
          filename: entry.name,
          content: buffer,
          contentType: entry.type || "application/octet-stream",
        });
      }
    }

    // 3. Construct Executive Email HTML
    const submissionTime = new Date().toLocaleString("en-CA", {
      timeZone: "America/Vancouver",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const sectionsHtml = sections
      .map((sec) => {
        const rowsHtml = sec.rows
          .map(
            (r) => `
          <tr>
            <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; width: 42%; vertical-align: top; color: #64748B; font-size: 13px; font-weight: 500; background-color: #F8FAFC;">
              ${escapeHtml(r.label)}
            </td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; width: 58%; vertical-align: top; color: #0F172A; font-size: 13px; font-weight: 500; white-space: pre-wrap; word-break: break-word;">
              ${escapeHtml(r.value || "—")}
            </td>
          </tr>`
          )
          .join("");

        return `
        <div style="margin-bottom: 24px;">
          <div style="background-color: #0B1B48; color: #FFFFFF; padding: 10px 16px; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; border-radius: 6px 6px 0 0; border-left: 4px solid #FFC107;">
            ${escapeHtml(sec.sectionTitle)}
          </div>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #E2E8F0; border-top: none; background-color: #FFFFFF;">
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>`;
      })
      .join("");

    const signatureRowHtml = signatureDataUrl
      ? `
      <div style="margin-bottom: 24px;">
        <div style="background-color: #0B1B48; color: #FFFFFF; padding: 10px 16px; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; border-radius: 6px 6px 0 0; border-left: 4px solid #FFC107;">
          Client Signature & Law Society Disclaimer / 客户电子签名与免责声明
        </div>
        <div style="padding: 16px; border: 1px solid #E2E8F0; border-top: none; background-color: #FFFFFF; border-radius: 0 0 6px 6px;">
          <p style="font-size: 12px; color: #64748B; margin-top: 0; margin-bottom: 12px; line-height: 1.5;">
            Submitted electronically under the British Columbia <em>Electronic Transactions Act</em>. Submitting this intake questionnaire does not create a solicitor-client relationship until formally confirmed in writing by Avid Law Corporation.
          </p>
          <div style="background-color: #F8FAFC; border: 1px dashed #CBD5E1; padding: 12px; border-radius: 6px; display: inline-block;">
            <img src="cid:client-signature" alt="Client Signature" style="max-height: 90px; max-width: 320px; display: block;" />
          </div>
        </div>
      </div>`
      : "";

    const fullEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(formTitle)}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F1F5F9; color: #0F172A;">
  <div style="max-width: 720px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
    <!-- Top Accent Bar -->
    <div style="height: 6px; background: linear-gradient(90deg, #FF6B00 0%, #FFC107 100%);"></div>

    <!-- Header -->
    <div style="background-color: #0B1B48; padding: 24px 32px; color: #FFFFFF;">
      <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #FFC107; margin-bottom: 6px;">
        Avid Law Corporation | 安胜 · 弘人律师行
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #FFFFFF;">
        ${escapeHtml(formTitle)}
      </h1>
      <div style="margin-top: 8px; font-size: 13px; color: #94A3B8;">
        Submitted on: <span style="color: #E2E8F0; font-weight: 600;">${submissionTime}</span> (Pacific Time)
      </div>
    </div>

    <!-- Quick Executive Summary Banner -->
    <div style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0; padding: 16px 32px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
      <div>
        <span style="font-size: 12px; color: #64748B; text-transform: uppercase; font-weight: 600;">Client Name:</span>
        <div style="font-size: 15px; font-weight: 700; color: #0F172A;">${escapeHtml(clientName)}</div>
      </div>
      <div>
        <span style="font-size: 12px; color: #64748B; text-transform: uppercase; font-weight: 600;">Client Email:</span>
        <div style="font-size: 14px; font-weight: 600; color: #0B1B48;">
          <a href="mailto:${escapeHtml(clientEmail)}" style="color: #0B1B48; text-decoration: underline;">${escapeHtml(clientEmail || "Not Provided")}</a>
        </div>
      </div>
      <div>
        <span style="font-size: 12px; color: #64748B; text-transform: uppercase; font-weight: 600;">Client Phone:</span>
        <div style="font-size: 14px; font-weight: 600; color: #0F172A;">
          ${escapeHtml(clientPhone || "Not Provided")}
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div style="padding: 32px;">
      ${sectionsHtml}
      ${signatureRowHtml}
      ${
        attachments.length > 1
          ? `
      <div style="margin-top: 16px; padding: 12px 16px; background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; font-size: 13px; color: #166534;">
        📎 <strong>${attachments.length - (signatureDataUrl ? 1 : 0)} supporting document(s) attached</strong> to this email.
      </div>`
          : ""
      }
    </div>

    <!-- Footer -->
    <div style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 32px; font-size: 12px; color: #64748B; text-align: center;">
      CONFIDENTIAL ATTORNEY-CLIENT PRIVILEGED TRANSMISSION<br/>
      Avid Law Corporation • 5811 Cooney Road, Suite 602 North Tower, Richmond, BC V6X 3M1 • (604) 273-7565
    </div>
  </div>
</body>
</html>`;

    // 4. Send via Nodemailer or Simulate if SMTP not configured
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiverEmail =
      process.env.INTAKE_RECEIVER_EMAIL || "info@avid-law.com";

    const subject = `[New Client Intake] ${formTitle} - ${clientName}`;

    if (!host || !user || !pass) {
      console.warn(
        `[Nodemailer Simulation] SMTP credentials not set. Form submission received for ${clientName} (${clientEmail}). Subject: "${subject}". Email would be delivered to: ${receiverEmail}`
      );
      return NextResponse.json({
        success: true,
        message: "Form submission received successfully (simulated environment).",
        simulated: true,
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: `"${clientName} via Avid Law Intake" <${user}>`,
      to: receiverEmail,
      replyTo: clientEmail || undefined,
      subject,
      html: fullEmailHtml,
      attachments,
    });

    console.log("Nodemailer email successfully sent:", info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error submitting form.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
