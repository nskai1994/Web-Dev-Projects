# 🎯 RecFind - Job Profile Search Aggregator

An intelligent, AI-powered job search platform that creates a comprehensive knowledge base of your profile, performs smart job searches, and provides tailored career opportunities.

## ✨ Features

### 📋 Knowledge Base
- **Personal Information Management** - Store your contact details, social profiles
- **Education Tracking** - Manage multiple degrees and educational background
- **Work Experience** - Document your professional journey with detailed descriptions
- **Skills Matrix** - Categorize technical skills, soft skills, and languages
- **Research & Interests** - Track research interests, publications, and projects
- **Job Preferences** - Define your ideal job criteria and salary expectations

### 🔍 Intelligent Job Search
- **AI-Powered Search** - Uses OpenRouter API with advanced LLMs
- **Profile Matching** - Finds jobs that match your skills and preferences
- **Customizable Search** - Filter by keywords, industries, locations, experience level
- **Real-time Results** - Get 100+ curated job opportunities
- **Fit Scoring** - Each job is scored 0-100% based on your profile match

### 📊 Results & Analytics
- **Grid & Table Views** - Multiple viewing options for job listings
- **Advanced Filtering** - Filter by industry, priority, salary range
- **Sorting Options** - Sort by fit score, priority, company name
- **Export to CSV** - Download your job search results
- **Summary Statistics** - See match distribution at a glance

### 💾 Data Management
- **Export Profile** - Save your profile as JSON
- **Import Profile** - Load previously saved profiles
- **Persistent Data** - All information saved locally

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with Vite
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **API Integration:** OpenRouter API
- **State Management:** React Context API
- **Animations:** Custom CSS animations

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager
- OpenRouter API key (get one free at [openrouter.ai](https://openrouter.ai))

### Installation

```bash
# Clone the repository
git clone https://github.com/nskai1994/Web-Dev-Projects.git
cd Web-Dev-Projects/React/RecFind

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Step 1: Build Your Profile
1. Go to **Knowledge Base** tab
2. Fill in your personal information
3. Add your education and work experience
4. List your technical and soft skills
5. Define your job preferences
6. Click **Validate Profile** to ensure completeness

### Step 2: Configure Search
1. Go to **Job Search** tab
2. Enter your OpenRouter API key
3. Add search keywords (e.g., "Data Scientist", "Machine Learning Engineer")
4. Select target industries and locations
5. Choose experience level and job type preferences

### Step 3: Search & Explore
1. Click **Search 100 Jobs with AI**
2. Wait for the AI to analyze and find matches
3. View results in Grid or Table view
4. Filter and sort as needed
5. Export results as CSV or apply directly to jobs

## 📁 Project Structure

```
RecFind/
├── src/
│   ├── components/
│   │   ├── KnowledgeBase/
│   │   │   └── ProfileBuilder.jsx
│   │   ├── JobSearch/
│   │   │   ├── SearchConfig.jsx
│   │   │   └── JobResults.jsx
│   │   └── Layout/
│   │       ├── MainLayout.jsx
│   │       └── Sidebar.jsx
│   ├── contexts/
│   │   ├── ProfileContext.jsx
│   │   └── JobSearchContext.jsx
│   ├── services/
│   │   ├── openRouterApi.js
│   │   └── csvExporter.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔑 API Configuration

### Getting Your OpenRouter API Key

1. Visit [openrouter.ai](https://openrouter.ai)
2. Sign up or log in
3. Go to [API Keys](https://openrouter.ai/keys)
4. Generate a new API key
5. Paste it in the RecFind app's API Configuration section

### API Models Used

- **Default Model:** Google Gemini Flash 1.5 (cost-effective and fast)
- **Temperature:** 0.7 for search, 0.5 for resume generation
- **Max Tokens:** 4000 for job search, 3000 for resume generation

## 🎯 Key Functions

### Profile Management
```javascript
// Export your profile
const profileJSON = exportProfile();

// Import a saved profile
const success = importProfile(jsonString);

// Validate profile completeness
const isComplete = validateProfile();
```

### Job Search
```javascript
// Search for jobs
const jobs = await searchJobsWithAI(profile, searchConfig, apiKey);

// Export results to CSV
exportJobsToCSV(jobs);
```

## 🎨 UI Components

### Custom Tailwind Classes
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.card` - Main card container
- `.input-field` - Form input field
- `.badge` - Status badges with variants

### Animations
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation

## 🔐 Security & Privacy

- **Local Storage:** All profile data is stored locally in your browser
- **API Keys:** Never shared or logged
- **Data Export:** Full control over your data with export/import features
- **No Server:** All processing happens on your device

## 🚨 Troubleshooting

### API Key Not Working
- Verify the key is correct from OpenRouter dashboard
- Check that your OpenRouter account has sufficient credits
- Ensure the API key has access permissions

### Jobs Not Found
- Ensure your profile is complete and validated
- Try different search keywords
- Check internet connection
- Verify API key permissions

### Performance Issues
- Clear browser cache
- Reduce the number of search keywords
- Use a modern browser (Chrome, Firefox, Safari, Edge)

## 📊 Future Enhancements

- [ ] Direct integration with job boards (LinkedIn, Indeed, Glassdoor)
- [ ] Email notification for new matching jobs
- [ ] Automated cover letter generation
- [ ] Interview prep questions based on job description
- [ ] Application tracking system (ATS)
- [ ] Salary comparison analytics
- [ ] Collaboration with mentors and recruiters
- [ ] Mobile app version

## 📄 License

This project is part of the Web-Dev-Projects repository and is available for personal and educational use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Built with ❤️ by [@nskai1994](https://github.com/nskai1994)**
