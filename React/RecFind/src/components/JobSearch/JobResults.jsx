import { useState, useMemo } from 'react';
import { useJobSearch } from '../../contexts/JobSearchContext';
import { useProfile } from '../../contexts/ProfileContext';
import { generateBulkResumes } from '../../services/resumeGenerator';
import { exportJobsToCSV } from '../../services/csvExporter';
import {
  Briefcase, MapPin, Clock, DollarSign,
  TrendingUp, Download, FileText,
  ArrowUpDown, ExternalLink
} from 'lucide-react';

const JobResults = () => {
  const { jobs } = useJobSearch();
  const { profile } = useProfile();

  const [sortBy, setSortBy] = useState('fitScore');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isGeneratingResumes, setIsGeneratingResumes] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or table

  // Get unique industries for filter
  const industries = useMemo(() => {
    const unique = new Set(jobs.map(job => job.industry));
    return ['all', ...Array.from(unique)];
  }, [jobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (filterIndustry !== 'all') {
      result = result.filter(job => job.industry === filterIndustry);
    }

    if (filterPriority !== 'all') {
      result = result.filter(job => job.priority === filterPriority);
    }

    result.sort((a, b) => {
      const modifier = sortOrder === 'desc' ? -1 : 1;
      return (a[sortBy] - b[sortBy]) * modifier;
    });

    return result;
  }, [jobs, filterIndustry, filterPriority, sortBy, sortOrder]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFitScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleGenerateResumes = async () => {
    if (selectedJobs.length === 0) {
      alert('Please select at least one job to generate resumes');
      return;
    }

    setIsGeneratingResumes(true);

    try {
      const topJobs = filteredJobs.slice(0, 10);
      const resumes = await generateBulkResumes(topJobs, profile, '');
      alert(`Generated ${resumes.length} tailored resumes!`);
    } catch (error) {
      console.error('Failed to generate resumes:', error);
      alert('Failed to generate resumes. Please try again.');
    } finally {
      setIsGeneratingResumes(false);
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Jobs Found</h3>
        <p className="text-gray-500">
          Configure your search and click "Search 100 Jobs" to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {filteredJobs.length} Jobs Found
            </h2>

            {/* Industry Filter */}
            <select
              className="input-field max-w-[200px]"
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
            >
              <option value="all">All Industries</option>
              {industries.filter(i => i !== 'all').map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              className="input-field max-w-[150px]"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            {/* Sort */}
            <select
              className="input-field max-w-[150px]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="fitScore">Sort by Fit Score</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
            </select>

            <button
              onClick={() => setSortOrder(order => order === 'desc' ? 'asc' : 'desc')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-white shadow' : ''}`}
              >
                Table
              </button>
            </div>

            {/* Export Button */}
            <button
              onClick={() => exportJobsToCSV(filteredJobs)}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>

            {/* Generate Resumes */}
            <button
              onClick={handleGenerateResumes}
              disabled={isGeneratingResumes || selectedJobs.length === 0}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              {isGeneratingResumes ? 'Generating...' : 'Generate Resumes'}
            </button>
          </div>
        </div>
      </div>

      {/* Job Results */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job, index) => (
            <div key={index} className="card hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                  {job.priority}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {job.jobType}
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${getFitScoreColor(job.fitScore)}`} />
                  <span className={`font-semibold ${getFitScoreColor(job.fitScore)}`}>
                    {job.fitScore}% Match
                  </span>
                </div>
                {job.deadline && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {job.deadline}
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {job.matchAnalysis}
              </p>

              <div className="flex gap-2">
                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary text-center flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Apply Now
                </a>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedJobs.includes(index)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedJobs([...selectedJobs, index]);
                    } else {
                      setSelectedJobs(selectedJobs.filter(i => i !== index));
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Job Title</th>
                <th className="text-left p-3">Company</th>
                <th className="text-left p-3">Industry</th>
                <th className="text-left p-3">Location</th>
                <th className="text-left p-3">Fit Score</th>
                <th className="text-left p-3">Priority</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{job.title}</td>
                  <td className="p-3">{job.company}</td>
                  <td className="p-3">{job.industry}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${getFitScoreColor(job.fitScore)}`}>
                      {job.fitScore}%
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(job.priority)}`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <a
                      href={job.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="card">
        <h3 className="font-semibold mb-4">Search Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{jobs.length}</p>
            <p className="text-sm text-gray-600">Total Jobs Found</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {jobs.filter(j => j.fitScore >= 80).length}
            </p>
            <p className="text-sm text-gray-600">High Match (80%+)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {jobs.filter(j => j.fitScore >= 60 && j.fitScore < 80).length}
            </p>
            <p className="text-sm text-gray-600">Medium Match</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {jobs.filter(j => j.fitScore < 60).length}
            </p>
            <p className="text-sm text-gray-600">Low Match</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobResults;
