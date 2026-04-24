import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export const exportJobsToCSV = (jobs) => {
  const data = jobs.map(job => ({
    'Job Title': job.title,
    'Company': job.company,
    'Industry': job.industry,
    'Location': job.location,
    'Job Type': job.jobType,
    'Salary': job.salary,
    'Fit Score': job.fitScore,
    'Priority': job.priority,
    'Application Link': job.applicationLink,
    'Deadline': job.deadline,
    'Requirements': job.requirements.join('; '),
    'Match Analysis': job.matchAnalysis,
    'Description': job.description?.substring(0, 200) + '...',
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'job_opportunities.csv');
};

export const exportJobToExcel = (jobs) => {
  // Create Excel-compatible CSV with BOM for UTF-8
  const BOM = '\uFEFF';
  const data = jobs.map(job => ({
    'Job Title': job.title,
    'Company': job.company,
    'Industry': job.industry,
    'Location': job.location,
    'Job Type': job.jobType,
    'Salary': job.salary,
    'Fit Score': job.fitScore,
    'Priority': job.priority,
    'Application Link': job.applicationLink,
    'Deadline': job.deadline,
    'Requirements': job.requirements.join('\n'),
    'Match Analysis': job.matchAnalysis,
  }));

  const csv = BOM + Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'job_opportunities_100.xlsx');
};
