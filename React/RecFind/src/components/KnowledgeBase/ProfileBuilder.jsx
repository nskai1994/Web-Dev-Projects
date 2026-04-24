import { useState } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import {
  User, GraduationCap, Briefcase, Code,
  BookOpen, Target, Plus, Trash2, CheckCircle
} from 'lucide-react';

const ProfileBuilder = () => {
  const {
    profile, updateProfile, addEducation, addExperience,
    addSkill, removeEducation, removeExperience, removeSkill,
    validateProfile, isComplete
  } = useProfile();

  const [activeSection, setActiveSection] = useState('personal');
  const [skillInput, setSkillInput] = useState('');
  const [skillCategory, setSkillCategory] = useState('technical');

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'preferences', label: 'Preferences', icon: Target },
  ];

  const handlePersonalInfoUpdate = (field, value) => {
    updateProfile('personalInfo', {
      ...profile.personalInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}

          <button
            onClick={validateProfile}
            className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg ${
              isComplete
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            {isComplete ? 'Profile Complete' : 'Validate Profile'}
          </button>
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Personal Information */}
        {activeSection === 'personal' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  className="input-field"
                  value={profile.personalInfo.name}
                  onChange={(e) => handlePersonalInfoUpdate('name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  className="input-field"
                  value={profile.personalInfo.email}
                  onChange={(e) => handlePersonalInfoUpdate('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="input-field"
                  value={profile.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoUpdate('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="input-field"
                  value={profile.personalInfo.location}
                  onChange={(e) => handlePersonalInfoUpdate('location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  className="input-field"
                  value={profile.personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoUpdate('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Portfolio URL</label>
                <input
                  type="url"
                  className="input-field"
                  value={profile.personalInfo.portfolio}
                  onChange={(e) => handlePersonalInfoUpdate('portfolio', e.target.value)}
                  placeholder="https://johndoe.dev"
                />
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary-600" />
                Education
              </h2>
              <button
                onClick={() => addEducation({
                  institution: '',
                  degree: '',
                  field: '',
                  graduationYear: '',
                  gpa: '',
                })}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </button>
            </div>

            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-4 relative">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Institution</label>
                      <input
                        type="text"
                        className="input-field"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = profile.education.map(ed =>
                            ed.id === edu.id ? { ...ed, institution: e.target.value } : ed
                          );
                          updateProfile('education', updated);
                        }}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Degree</label>
                      <input
                        type="text"
                        className="input-field"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = profile.education.map(ed =>
                            ed.id === edu.id ? { ...ed, degree: e.target.value } : ed
                          );
                          updateProfile('education', updated);
                        }}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Field of Study</label>
                      <input
                        type="text"
                        className="input-field"
                        value={edu.field}
                        onChange={(e) => {
                          const updated = profile.education.map(ed =>
                            ed.id === edu.id ? { ...ed, field: e.target.value } : ed
                          );
                          updateProfile('education', updated);
                        }}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Graduation Year</label>
                      <input
                        type="text"
                        className="input-field"
                        value={edu.graduationYear}
                        onChange={(e) => {
                          const updated = profile.education.map(ed =>
                            ed.id === edu.id ? { ...ed, graduationYear: e.target.value } : ed
                          );
                          updateProfile('education', updated);
                        }}
                        placeholder="2023"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-600" />
                Work Experience
              </h2>
              <button
                onClick={() => addExperience({
                  company: '',
                  title: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                  achievements: [],
                })}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="border rounded-lg p-4 relative">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Company</label>
                      <input
                        type="text"
                        className="input-field"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = profile.experience.map(ex =>
                            ex.id === exp.id ? { ...ex, company: e.target.value } : ex
                          );
                          updateProfile('experience', updated);
                        }}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Job Title</label>
                      <input
                        type="text"
                        className="input-field"
                        value={exp.title}
                        onChange={(e) => {
                          const updated = profile.experience.map(ex =>
                            ex.id === exp.id ? { ...ex, title: e.target.value } : ex
                          );
                          updateProfile('experience', updated);
                        }}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Date</label>
                      <input
                        type="month"
                        className="input-field"
                        value={exp.startDate}
                        onChange={(e) => {
                          const updated = profile.experience.map(ex =>
                            ex.id === exp.id ? { ...ex, startDate: e.target.value } : ex
                          );
                          updateProfile('experience', updated);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Date</label>
                      <input
                        type="month"
                        className="input-field"
                        value={exp.endDate}
                        onChange={(e) => {
                          const updated = profile.experience.map(ex =>
                            ex.id === exp.id ? { ...ex, endDate: e.target.value } : ex
                          );
                          updateProfile('experience', updated);
                        }}
                        placeholder="Present"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        className="input-field"
                        rows="3"
                        value={exp.description}
                        onChange={(e) => {
                          const updated = profile.experience.map(ex =>
                            ex.id === exp.id ? { ...ex, description: e.target.value } : ex
                          );
                          updateProfile('experience', updated);
                        }}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Code className="w-5 h-5 text-primary-600" />
              Skills & Expertise
            </h2>

            <div className="flex gap-4">
              <select
                className="input-field max-w-xs"
                value={skillCategory}
                onChange={(e) => setSkillCategory(e.target.value)}
              >
                <option value="technical">Technical Skills</option>
                <option value="soft">Soft Skills</option>
                <option value="languages">Languages</option>
              </select>

              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  className="input-field flex-1"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && skillInput.trim()) {
                      addSkill(skillCategory, skillInput.trim());
                      setSkillInput('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (skillInput.trim()) {
                      addSkill(skillCategory, skillInput.trim());
                      setSkillInput('');
                    }
                  }}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(profile.skills).map(([category, skills]) => (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold capitalize mb-3">{category} Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-sm"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(category, skill)}
                          className="text-red-400 hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research Section */}
        {activeSection === 'research' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-600" />
              Research & Interests
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1">Research Interests</label>
              <textarea
                className="input-field"
                rows="3"
                value={profile.research.interests.join(', ')}
                onChange={(e) => {
                  const interests = e.target.value.split(',').map(i => i.trim()).filter(Boolean);
                  updateProfile('research', {
                    ...profile.research,
                    interests
                  });
                }}
                placeholder="Machine Learning, Natural Language Processing, Computer Vision..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Publications</label>
              <textarea
                className="input-field"
                rows="3"
                value={profile.research.publications.join('\n')}
                onChange={(e) => {
                  const publications = e.target.value.split('\n').filter(Boolean);
                  updateProfile('research', {
                    ...profile.research,
                    publications
                  });
                }}
                placeholder="List your publications (one per line)..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Projects</label>
              <textarea
                className="input-field"
                rows="3"
                value={profile.research.projects.join('\n')}
                onChange={(e) => {
                  const projects = e.target.value.split('\n').filter(Boolean);
                  updateProfile('research', {
                    ...profile.research,
                    projects
                  });
                }}
                placeholder="List your research projects (one per line)..."
              />
            </div>
          </div>
        )}

        {/* Job Preferences */}
        {activeSection === 'preferences' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600" />
              Job Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Locations</label>
                <input
                  type="text"
                  className="input-field"
                  value={profile.preferences.locations.join(', ')}
                  onChange={(e) => {
                    const locations = e.target.value.split(',').map(l => l.trim()).filter(Boolean);
                    updateProfile('preferences', {
                      ...profile.preferences,
                      locations
                    });
                  }}
                  placeholder="San Francisco, New York, Remote..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Industries</label>
                <input
                  type="text"
                  className="input-field"
                  value={profile.preferences.industries.join(', ')}
                  onChange={(e) => {
                    const industries = e.target.value.split(',').map(i => i.trim()).filter(Boolean);
                    updateProfile('preferences', {
                      ...profile.preferences,
                      industries
                    });
                  }}
                  placeholder="Technology, Healthcare, Finance..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Job Types</label>
                <input
                  type="text"
                  className="input-field"
                  value={profile.preferences.jobTypes.join(', ')}
                  onChange={(e) => {
                    const jobTypes = e.target.value.split(',').map(j => j.trim()).filter(Boolean);
                    updateProfile('preferences', {
                      ...profile.preferences,
                      jobTypes
                    });
                  }}
                  placeholder="Full-time, Contract, Remote..."
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600"
                    checked={profile.preferences.remote}
                    onChange={(e) => {
                      updateProfile('preferences', {
                        ...profile.preferences,
                        remote: e.target.checked
                      });
                    }}
                  />
                  <span className="text-sm font-medium">Open to Remote Work</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBuilder;
