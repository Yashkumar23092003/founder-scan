import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Extracts text from a PDF file
 * @param {File} file - PDF file object
 * @returns {Promise<string>} - Extracted text from the PDF
 */
export const extractTextFromPDF = async (file) => {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

/**
 * Extracts structured data from LinkedIn profile text
 * @param {string} text - Text extracted from LinkedIn PDF
 * @returns {Object} - Structured data from LinkedIn profile
 */
export const extractLinkedInData = (text) => {
  const data = {
    name: extractName(text),
    headline: extractHeadline(text),
    summary: extractSummary(text),
    experience: extractExperience(text),
    education: extractEducation(text),
    skills: extractSkills(text),
    certifications: extractCertifications(text),
    recommendations: extractRecommendations(text),
  };
  
  return data;
};

/**
 * Extract the person's name from LinkedIn text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {string} - Person's name
 */
const extractName = (text) => {
  // In most LinkedIn PDFs, the name is at the beginning
  const nameRegex = /^([A-Za-z\s]+)/;
  const match = text.match(nameRegex);
  return match ? match[0].trim() : 'Unknown';
};

/**
 * Extract the headline/job title from LinkedIn text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {string} - Headline or job title
 */
const extractHeadline = (text) => {
  // The headline usually follows the name
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length > 1) {
    return lines[1].trim();
  }
  return '';
};

/**
 * Extract summary/about section from LinkedIn text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {string} - Summary text
 */
const extractSummary = (text) => {
  const summaryRegex = /(?:About|Summary)\s*\n([\s\S]+?)(?:\n\s*Experience|\n\s*Education|$)/i;
  const match = text.match(summaryRegex);
  return match ? match[1].trim() : '';
};

/**
 * Extract work experience from LinkedIn text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {Array} - Array of experience objects
 */
const extractExperience = (text) => {
  const experienceRegex = /Experience\s*\n([\s\S]+?)(?:\n\s*Education|\n\s*Skills|$)/i;
  const match = text.match(experienceRegex);
  
  if (!match) return [];
  
  const experienceText = match[1];
  const experiences = [];
  
  // Split by companies (this is a simplified approach)
  const experienceBlocks = experienceText.split(/\n\s*\n/).filter(block => block.trim());
  
  experienceBlocks.forEach(block => {
    const lines = block.split('\n').filter(line => line.trim());
    if (lines.length >= 2) {
      experiences.push({
        title: lines[0].trim(),
        company: lines[1].trim(),
        description: lines.slice(2).join('\n').trim()
      });
    }
  });
  
  return experiences;
};

/**
 * Extract education information from LinkedIn text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {Array} - Array of education objects
 */
const extractEducation = (text) => {
  const educationRegex = /Education\s*\n([\s\S]+?)(?:\n\s*Skills|\n\s*Certifications|$)/i;
  const match = text.match(educationRegex);
  
  if (!match) return [];
  
  const educationText = match[1];
  const educations = [];
  
  // Split by institutions
  const educationBlocks = educationText.split(/\n\s*\n/).filter(block => block.trim());
  
  educationBlocks.forEach(block => {
    const lines = block.split('\n').filter(line => line.trim());
    if (lines.length >= 1) {
      educations.push({
        institution: lines[0].trim(),
        degree: lines.length > 1 ? lines[1].trim() : '',
        description: lines.slice(2).join('\n').trim()
      });
    }
  });
  
  return educations;
};

/**
 * Extract skills from LinkedIn text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {Array} - Array of skills
 */
const extractSkills = (text) => {
  const skillsRegex = /Skills\s*\n([\s\S]+?)(?:\n\s*Certifications|\n\s*Recommendations|$)/i;
  const match = text.match(skillsRegex);
  
  if (!match) return [];
  
  return match[1]
    .split('\n')
    .map(skill => skill.trim())
    .filter(skill => skill);
};

/**
 * Extract certifications from LinkedIn text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {Array} - Array of certification objects
 */
const extractCertifications = (text) => {
  const certificationsRegex = /Certifications\s*\n([\s\S]+?)(?:\n\s*Recommendations|$)/i;
  const match = text.match(certificationsRegex);
  
  if (!match) return [];
  
  const certificationText = match[1];
  const certifications = [];
  
  // Split by certifications
  const certificationBlocks = certificationText.split(/\n\s*\n/).filter(block => block.trim());
  
  certificationBlocks.forEach(block => {
    const lines = block.split('\n').filter(line => line.trim());
    if (lines.length >= 1) {
      certifications.push({
        name: lines[0].trim(),
        issuer: lines.length > 1 ? lines[1].trim() : '',
        date: lines.length > 2 ? lines[2].trim() : ''
      });
    }
  });
  
  return certifications;
};

/**
 * Extract recommendations from LinkedIn text
 * @param {string} text - Text from LinkedIn PDF
 * @returns {Array} - Array of recommendation objects
 */
const extractRecommendations = (text) => {
  const recommendationsRegex = /Recommendations\s*\n([\s\S]+?)(?:\n\s*|$)/i;
  const match = text.match(recommendationsRegex);
  
  if (!match) return [];
  
  const recommendationsText = match[1];
  const recommendations = [];
  
  // Split by recommendations
  const recommendationBlocks = recommendationsText.split(/\n\s*\n/).filter(block => block.trim());
  
  recommendationBlocks.forEach(block => {
    const lines = block.split('\n').filter(line => line.trim());
    if (lines.length >= 2) {
      recommendations.push({
        recommender: lines[0].trim(),
        content: lines.slice(1).join('\n').trim()
      });
    }
  });
  
  return recommendations;
}; 