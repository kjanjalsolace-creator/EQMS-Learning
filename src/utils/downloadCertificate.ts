export interface CertificateData {
  userName: string;
  courseTitle: string;
  certificateId: string;
  issueDate?: string;
  expiryDate?: string;
  score?: number;
  cpdHours?: string;
}

export function downloadDemoCertificate(data: CertificateData) {
  const issueDateFormatted = data.issueDate
    ? new Date(data.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const expiryDateFormatted = data.expiryDate
    ? new Date(data.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const scoreFormatted = data.score || 95;
  const cpdHoursFormatted = data.cpdHours || '2.0 CPD Hours';

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EQMS Certificate of Completion - ${data.certificateId}</title>
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      background: #f1f5f9;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      color: #0f172a;
    }
    .action-bar {
      margin-bottom: 20px;
      display: flex;
      gap: 12px;
    }
    .btn {
      background: #e63031;
      color: white;
      border: none;
      padding: 10px 22px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-secondary {
      background: #334155;
    }
    .btn:hover {
      opacity: 0.9;
    }
    .cert-frame {
      width: 1000px;
      height: 700px;
      background: #ffffff;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      position: relative;
      border-radius: 8px;
    }
    .cert-border {
      width: 100%;
      height: 100%;
      border: 6px double #c5a059;
      padding: 30px;
      position: relative;
      background: radial-gradient(circle at center, #ffffff 60%, #faf8f5 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
    }
    .cert-corner {
      position: absolute;
      width: 40px;
      height: 40px;
      border: 3px solid #c5a059;
    }
    .tl { top: 6px; left: 6px; border-right: none; border-bottom: none; }
    .tr { top: 6px; right: 6px; border-left: none; border-bottom: none; }
    .bl { bottom: 6px; left: 6px; border-right: none; border-top: none; }
    .br { bottom: 6px; right: 6px; border-left: none; border-top: none; }

    .header-logos {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 20px;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #e63031;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
    }
    .brand-subtitle {
      font-size: 11px;
      letter-spacing: 3px;
      color: #64748b;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
    }
    .accreditation-badge {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    .seal {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px dashed #c5a059;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fdfbf7;
      font-family: Arial, sans-serif;
      font-size: 9px;
      font-weight: bold;
      color: #936f2b;
      text-transform: uppercase;
    }
    .cert-heading {
      margin-top: 10px;
    }
    .cert-heading h1 {
      font-size: 38px;
      letter-spacing: 4px;
      color: #1e293b;
      text-transform: uppercase;
      font-weight: 700;
    }
    .cert-heading p {
      font-size: 14px;
      letter-spacing: 2px;
      color: #94a3b8;
      text-transform: uppercase;
      margin-top: 4px;
      font-family: Arial, sans-serif;
    }
    .recipient-area {
      margin: 15px 0;
    }
    .recipient-text {
      font-size: 15px;
      font-style: italic;
      color: #64748b;
    }
    .recipient-name {
      font-size: 36px;
      color: #0f172a;
      font-weight: bold;
      letter-spacing: 1px;
      border-bottom: 2px solid #c5a059;
      display: inline-block;
      padding: 6px 40px;
      margin: 8px 0;
    }
    .course-details {
      max-width: 700px;
    }
    .course-completion-text {
      font-size: 14px;
      color: #475569;
      margin-bottom: 6px;
    }
    .course-name {
      font-size: 24px;
      font-weight: 700;
      color: #e63031;
      margin-bottom: 8px;
    }
    .course-meta {
      font-size: 13px;
      color: #64748b;
      font-family: Arial, sans-serif;
    }
    .footer-signatures {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 0 40px 10px 40px;
      font-family: Arial, sans-serif;
    }
    .signature-block {
      text-align: center;
      width: 220px;
    }
    .signature-line {
      border-top: 1px solid #94a3b8;
      padding-top: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #334155;
    }
    .signature-title {
      font-size: 11px;
      color: #64748b;
    }
    .cert-id-tag {
      font-size: 11px;
      color: #94a3b8;
      letter-spacing: 1px;
    }
    @media print {
      body {
        background: none;
        padding: 0;
      }
      .action-bar {
        display: none;
      }
      .cert-frame {
        box-shadow: none;
        width: 100vw;
        height: 100vh;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <div class="action-bar">
    <button class="btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    <button class="btn btn-secondary" onclick="window.close()">✕ Close Preview</button>
  </div>

  <div class="cert-frame">
    <div class="cert-border">
      <div class="cert-corner tl"></div>
      <div class="cert-corner tr"></div>
      <div class="cert-corner bl"></div>
      <div class="cert-corner br"></div>

      <div class="header-logos">
        <div>
          <div class="brand-title">EQMS TRAINING</div>
          <div class="brand-subtitle">Compliance & Vocational Academy</div>
        </div>
        <div class="accreditation-badge">
          <div class="seal">
            <span>CPD</span>
            <span style="font-size:7px; color:#c5a059;">★ ★ ★</span>
            <span>VERIFIED</span>
          </div>
          <div class="seal">
            <span>ROSPA</span>
            <span style="font-size:7px; color:#c5a059;">ASSURED</span>
            <span>ACCREDITED</span>
          </div>
        </div>
      </div>

      <div class="cert-heading">
        <h1>Certificate of Completion</h1>
        <p>Official Continuing Professional Development Award</p>
      </div>

      <div class="recipient-area">
        <p class="recipient-text">This is proudly presented and certified to</p>
        <div class="recipient-name">${data.userName}</div>
      </div>

      <div class="course-details">
        <p class="course-completion-text">for successfully completing the approved online compliance training curriculum:</p>
        <div class="course-name">${data.courseTitle}</div>
        <div class="course-meta">
          Assessment Score: <strong>${scoreFormatted}% (Distinction)</strong> &bull; Accreditation: <strong>${cpdHoursFormatted}</strong> &bull; Issue Date: <strong>${issueDateFormatted}</strong>
        </div>
      </div>

      <div class="footer-signatures">
        <div class="signature-block">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 26px; color: #1e3a8a; margin-bottom: 2px;">Alistair Vance</div>
          <div class="signature-line">Dr. Alistair Vance</div>
          <div class="signature-title">Head of Academic Compliance</div>
        </div>

        <div style="text-align: center;">
          <div style="font-size: 24px; color: #c5a059; margin-bottom: 4px;">🏆</div>
          <div class="cert-id-tag">CERTIFICATE ID: <strong>${data.certificateId}</strong></div>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Valid until: ${expiryDateFormatted}</div>
        </div>

        <div class="signature-block">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 26px; color: #1e3a8a; margin-bottom: 2px;">Eleanor Hughes</div>
          <div class="signature-line">Eleanor Hughes, MBE</div>
          <div class="signature-title">Registrar & Verifier</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `EQMS-Certificate-${data.certificateId}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
