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
  href="https://github.com/Satyamkumar55-tech"
  target="_blank"
  data-cursor="disable"
  className="contact-social"
>
  Github <MdArrowOutward />
  <div className="profile-popup">
    <div className="profile-popup-left">
      <img src="/images/Github Profile photo.png" alt="Profile" />
    </div>
    <div className="profile-popup-right">
      <h4>Satyamkumar Singh</h4>
      <p>AI & Data Science Student | Focused on Learning & Innovation | Passionate about exploring how AI can be applied in real-world scenarios</p>
    </div>
  </div>
</a>

            <a
              href="https://www.linkedin.com/in/satyamkumar-singh-a32041378/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
       <div className="profile-popup">
    <div className="profile-popup-left">
      <img src="/images/LinkedIn Profile photo.png" alt="Profile" />
    </div>
    <div className="profile-popup-right">
      <h4>Satyamkumar Singh</h4>
      <p>Artificial intelligence & Data Science Student | Passionate about exploring how AI can be applied in real-world scenarios.</p>
    </div>
  </div>
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
