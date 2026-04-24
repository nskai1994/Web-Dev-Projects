import { jsPDF } from "jspdf";
import { generateTailoredResume } from './openRouterApi';

export const generateResumePDF = async (resumeData, profile, jobTitle) => {
  const doc = new jsPDF();

  // Add content to PDF
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 102);
  doc.text(profile.personalInfo.name, 20, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`${profile.personalInfo.email} | ${profile.personalInfo.phone} | ${profile.personalInfo.location}`, 20, 30);

  // Professional Summary
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('PROFESSIONAL SUMMARY', 20, 45);
  doc.setFontSize(10);
  doc.text(resumeData.summary || `Experienced professional seeking ${jobTitle} position.`, 20, 52, { maxWidth: 170 });

  // Skills
  let yPos = 65;
  doc.setFontSize(12);
  doc.text('KEY SKILLS', 20, yPos);
  yPos += 7;
  doc.setFontSize(10);
  const skills = [...profile.skills.technical, ...profile.skills.soft].join(' • ');
  doc.text(skills, 20, yPos, { maxWidth: 170 });

  // Experience
  yPos += 15;
  doc.setFontSize(12);
  doc.text('PROFESSIONAL EXPERIENCE', 20, yPos);

  profile.experience.forEach((exp) => {
    yPos += 10;
    doc.setFontSize(11);
    doc.text(`${exp.title} at ${exp.company}`, 20, yPos);
    yPos += 5;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`${exp.startDate} - ${exp.endDate}`, 20, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(exp.description, 20, yPos, { maxWidth: 170 });
    yPos += 5;
  });

  // Education
  yPos += 10;
  doc.setFontSize(12);
  doc.text('EDUCATION', 20, yPos);

  profile.education.forEach((edu) => {
    yPos += 10;
    doc.setFontSize(11);
    doc.text(`${edu.degree} in ${edu.field}`, 20, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`${edu.institution} | ${edu.graduationYear}`, 20, yPos);
    yPos += 5;
  });

  // Save PDF
  const filename = `Tailored_Resume_${jobTitle.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);

  return filename;
};

export const generateBulkResumes = async (topJobs, profile, apiKey) => {
  const generatedResumes = [];

  for (let i = 0; i < Math.min(topJobs.length, 10); i++) {
    const job = topJobs[i];
    try {
      const resumeData = await generateTailoredResume(job, profile, apiKey);
      const filename = await generateResumePDF(resumeData, profile, job.title);
      generatedResumes.push({
        jobTitle: job.title,
        company: job.company,
        filename,
        data: resumeData,
      });
    } catch (error) {
      console.error(`Failed to generate resume for ${job.title}:`, error);
    }
  }

  return generatedResumes;
};
