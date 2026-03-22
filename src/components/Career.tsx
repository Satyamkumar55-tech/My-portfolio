import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>Education</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. in AI & Data Science</h4>
                <h5>Vidyavardhini’s College of Engineering and Technology, Mumbai University</h5>
              </div>
              <h3>2024–2028</h3>
            </div>
            <p>
              Currently pursuing my Bachelor of Engineering in Artificial Intelligence & Data Science. Building strong foundations in programming and AI integration.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary (12th) - PCMB</h4>
                <h5>Sonopant Dandekar Shikshan Mandali Jr. College, Palghar</h5>
              </div>
              <h3>2023-24</h3>
            </div>
            <p>
              Completed Higher Secondary Certificate (HSC) Board with 78.83% score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
