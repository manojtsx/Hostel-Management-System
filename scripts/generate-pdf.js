const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

async function generatePDF() {
  // Read the markdown file
  const markdownPath = path.join(__dirname, '../docs/project-documentation.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');

  // Convert markdown to HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Hostel Management System Documentation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
          }
          h1 {
            color: #2c3e50;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
          }
          h2 {
            color: #34495e;
            margin-top: 30px;
          }
          h3 {
            color: #7f8c8d;
          }
          code {
            background: #f8f9fa;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: monospace;
          }
          pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          ul, ol {
            padding-left: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Hostel Management System Documentation</h1>
          <p>Version 1.0.0</p>
        </div>
        ${marked(markdownContent)}
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <p>© 2024 Hostel Management System. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;

  // Launch browser and generate PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({
    path: path.join(__dirname, '../docs/hostel-management-system-documentation.pdf'),
    format: 'A4',
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    }
  });

  await browser.close();
  console.log('PDF generated successfully!');
}

generatePDF().catch(console.error); 