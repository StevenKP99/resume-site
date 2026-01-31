import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Tab, TabStopType, convertInchesToTwip } from 'docx';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load resume data
const resume = JSON.parse(readFileSync(join(__dirname, '../data/resume.json'), 'utf-8'));

// Helper to format date
function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const date = new Date(dateStr + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Helper to create a section heading
function sectionHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 24, // 12pt
        font: 'Calibri',
      }),
    ],
    spacing: { before: 240, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000' },
    },
  });
}

// Build document sections
const children = [];

// Header - Name
children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: resume.basics.name,
        bold: true,
        size: 48, // 24pt
        font: 'Calibri',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  })
);

// Header - Title
children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: resume.basics.label,
        size: 28, // 14pt
        font: 'Calibri',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  })
);

// Contact info - Line 1: Email | Phone
const contactLine1 = [];
if (resume.basics.email) contactLine1.push(resume.basics.email);
if (resume.basics.phone) contactLine1.push(resume.basics.phone);

children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: contactLine1.join('  |  '),
        size: 20, // 10pt
        font: 'Calibri',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  })
);

// Contact info - Line 2: Location
if (resume.basics.location) {
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${resume.basics.location.city}, ${resume.basics.location.region}`,
          size: 20,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
    })
  );
}

// Contact info - Line 3: LinkedIn | GitHub
const linkedIn = resume.basics.profiles?.find(p => p.network === 'LinkedIn');
const gitHub = resume.basics.profiles?.find(p => p.network === 'GitHub');
const profileLinks = [];
if (linkedIn) profileLinks.push(linkedIn.url);
if (gitHub) profileLinks.push(gitHub.url);

if (profileLinks.length > 0) {
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: profileLinks.join('  |  '),
          size: 20,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );
}

// Summary
if (resume.basics.summary) {
  children.push(sectionHeading('Professional Summary'));
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resume.basics.summary,
          size: 22, // 11pt
          font: 'Calibri',
        }),
      ],
      spacing: { after: 120 },
    })
  );
}

// Work Experience
if (resume.work?.length > 0) {
  children.push(sectionHeading('Professional Experience'));

  for (const job of resume.work) {
    // Company and dates on same line
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: job.name,
            bold: true,
            size: 24, // 12pt
            font: 'Calibri',
          }),
          new TextRun({
            text: '\t',
          }),
          new TextRun({
            text: `${formatDate(job.startDate)} – ${formatDate(job.endDate)}`,
            size: 22,
            font: 'Calibri',
          }),
        ],
        tabStops: [{ type: TabStopType.RIGHT, position: convertInchesToTwip(6.5) }],
        spacing: { before: 160, after: 40 },
      })
    );

    // Position
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: job.position,
            italics: true,
            size: 22,
            font: 'Calibri',
          }),
        ],
        spacing: { after: 80 },
      })
    );

    // Highlights as bullet points
    if (job.highlights?.length > 0) {
      for (const highlight of job.highlights) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: highlight,
                size: 22,
                font: 'Calibri',
              }),
            ],
            bullet: { level: 0 },
            spacing: { after: 40 },
          })
        );
      }
    }
  }
}

// Skills
if (resume.skills?.length > 0) {
  children.push(sectionHeading('Skills'));

  for (const skillGroup of resume.skills) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${skillGroup.name}: `,
            bold: true,
            size: 22,
            font: 'Calibri',
          }),
          new TextRun({
            text: skillGroup.keywords.join(', '),
            size: 22,
            font: 'Calibri',
          }),
        ],
        spacing: { after: 60 },
      })
    );
  }
}

// Education
if (resume.education?.length > 0) {
  children.push(sectionHeading('Education'));

  for (const edu of resume.education) {
    const dateRange = edu.startDate && edu.endDate
      ? `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`
      : edu.endDate
        ? formatDate(edu.endDate)
        : '';

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: edu.institution,
            bold: true,
            size: 22,
            font: 'Calibri',
          }),
          ...(dateRange ? [
            new TextRun({ text: '\t' }),
            new TextRun({
              text: dateRange,
              size: 22,
              font: 'Calibri',
            }),
          ] : []),
        ],
        tabStops: [{ type: TabStopType.RIGHT, position: convertInchesToTwip(6.5) }],
        spacing: { before: 120, after: 40 },
      })
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${edu.studyType} in ${edu.area}`,
            italics: true,
            size: 22,
            font: 'Calibri',
          }),
        ],
        spacing: { after: 60 },
      })
    );
  }
}

// Create document
const doc = new Document({
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(0.75),
          bottom: convertInchesToTwip(0.75),
          left: convertInchesToTwip(0.75),
          right: convertInchesToTwip(0.75),
        },
      },
    },
    children,
  }],
});

// Generate and save
const buffer = await Packer.toBuffer(doc);
const outputPath = join(__dirname, '../public/StevenPuckettSoftwareEngineer.docx');
writeFileSync(outputPath, buffer);

console.log(`DOCX generated: ${outputPath}`);
