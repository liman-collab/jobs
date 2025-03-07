
import './FrontPage.css';

export default function FrontPage() {
    const jobs = [
      { id: 1, title: "Software Engineer", location: "New York, NY", type: "Full-time" },
      { id: 2, title: "Graphic Designer", location: "Los Angeles, CA", type: "Part-time" },
      { id: 3, title: "Marketing Manager", location: "Remote", type: "Contract" },
    ];
  
    return (
      <div>

        <div className="job-container">
          <h2>Available Jobs</h2>
          <ul className="job-list">
            {jobs.map((job) => (
              <li key={job.id} className="job-item">
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-info">{job.location} • {job.type}</p>
                </div>
                <a href={`/apply/${job.id}`} className="apply-button">
                  Apply Now
                </a>
              </li>
            ))}
          </ul>
        </div>
  
      </div>
    );
  }
  