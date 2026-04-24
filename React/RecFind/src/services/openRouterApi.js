const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const searchJobsWithAI = async (profile, searchConfig, apiKey) => {
  const prompt = constructSearchPrompt(profile, searchConfig);
  
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'RecFind - Job Profile Aggregator',
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5',
        messages: [
          {
            role: 'system',
            content: 'You are a job search expert AI. Your task is to find and evaluate job opportunities based on candidate profiles. Return structured JSON data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return parseJobResults(data.choices[0].message.content);
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    throw error;
  }
};

const constructSearchPrompt = (profile, searchConfig) => {
  return `Search for 100 relevant job opportunities based on the following candidate profile and preferences:

CANDIDATE PROFILE:
- Name: ${profile.personalInfo.name}
- Email: ${profile.personalInfo.email}
- Location: ${profile.personalInfo.location}
- Education: ${JSON.stringify(profile.education)}
- Experience: ${JSON.stringify(profile.experience)}
- Technical Skills: ${profile.skills.technical.join(', ')}
- Soft Skills: ${profile.skills.soft.join(', ')}
- Languages: ${profile.skills.languages.join(', ')}
- Research Interests: ${profile.research.interests.join(', ')}

JOB SEARCH PREFERENCES:
- Keywords: ${searchConfig.keywords.join(', ')}
- Industries: ${searchConfig.industries.join(', ')}
- Locations: ${searchConfig.locations.join(', ')}
- Job Type: ${searchConfig.jobType || 'Any'}
- Experience Level: ${searchConfig.experienceLevel || 'Any'}
- Remote: ${profile.preferences.remote ? 'Yes' : 'No'}

For each job opportunity, provide:
1. Job Title
2. Company Name
3. Full Job Description (at least 200 words)
4. Key Requirements (list format)
5. Application Link
6. Application Deadline (if available)
7. Salary Range (if available)
8. Location
9. Industry
10. Job Type (Full-time, Part-time, Contract, etc.)
11. Fit Score (0-100) based on how well the candidate's profile matches the requirements
12. Match Analysis (brief explanation of why this job is a good fit)
13. Priority (High/Medium/Low)

Return the results as a JSON array with these exact fields for each job:
{
  "jobs": [
    {
      "title": "",
      "company": "",
      "description": "",
      "requirements": [],
      "applicationLink": "",
      "deadline": "",
      "salary": "",
      "location": "",
      "industry": "",
      "jobType": "",
      "fitScore": 0,
      "matchAnalysis": "",
      "priority": "High/Medium/Low"
    }
  ]
}

Ensure you provide exactly 100 job opportunities that are currently available and relevant.`;
};

const parseJobResults = (responseText) => {
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    
    const data = JSON.parse(jsonMatch[0]);
    return data.jobs || [];
  } catch (error) {
    console.error('Error parsing job results:', error);
    return [];
  }
};

export const generateTailoredResume = async (job, profile, apiKey) => {
  const prompt = `Create a tailored resume for the following job opportunity. Restructure the candidate's education, research focus, internships, and transferable skills to match the job description while keeping a consistent narrative.

JOB DETAILS:
Title: ${job.title}
Company: ${job.company}
Description: ${job.description}
Requirements: ${job.requirements.join(', ')}

CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

Generate a professional resume in the following format:
1. Contact Information
2. Professional Summary (tailored to this specific role)
3. Key Skills (aligned with job requirements)
4. Professional Experience (emphasize relevant experience)
5. Education
6. Research & Publications
7. Projects
8. Certifications & Training

Make sure to:
- Use keywords from the job description
- Highlight transferable skills that match the requirements
- Quantify achievements where possible
- Maintain a professional and consistent tone

Return the resume in a structured JSON format that can be used to generate a PDF.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'RecFind - Resume Generator',
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer. Create tailored, ATS-optimized resumes.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 3000,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Resume Generation Error:', error);
    throw error;
  }
};
