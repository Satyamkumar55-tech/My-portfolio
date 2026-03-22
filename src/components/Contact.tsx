import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:satyamranjeet2006@gmail.com" data-cursor="disable">
                satyamranjeet2006@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>B.E. AI & Data Science</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Satyamkumar55-tech?tab=overview&from=2026-03-01&to=2026-03-22"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/satyamkumar-singh-a32041378/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Satyamkumar R. Singh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
