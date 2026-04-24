export const exportJobsToCSV = (jobs) => {
  const data = jobs.map((job, index) => ({
    '#': index + 1,
    'Job Title': job.title,
    'Company': job.company,
    'Industry': job.industry,
    'Location': job.location,
    'Job Type': job.jobType,
    'Salary': job.salary || 'Not specified',
    'Fit Score': `${job.fitScore}%`,
    'Priority': job.priority,
    'Application Link': job.applicationLink,
    'Deadline': job.deadline || 'Not specified',
    'Requirements': job.requirements?.join('; ') || '',
    'Match Analysis': job.matchAnalysis,
  }));

  const headers = Object.keys(data[0] || {});
  if (headers.length === 0) {
    console.error('No jobs to export');
    return;
  }

  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${String(row[header]).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
  element.setAttribute('download', `job_opportunities_${new Date().toISOString().split('T')[0]}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
