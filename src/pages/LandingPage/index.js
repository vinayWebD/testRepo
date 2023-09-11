import React from 'react';
import './style.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { CardGradientDivider } from '../../component/Icons/CardGradientDivider';
import { AimListIcon } from '../../component/Icons/AimListIcon';
import { FooterLogoIcon } from '../../component/Icons/FooterLogoIcon';
import instagramIcon from '../../component/Icons/instagramIcon.svg';
import linkdinicon from '../../component/Icons/linkdinicon.svg';
import facebook from '../../component/Icons/facebook.svg';
import footerIcon from '../../component/Icons/footerIcon.png';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <navbar>
        <div style={{ height: '70px' }}>navbar</div>
      </navbar>
      <section className="hero-section">
        <div className="content-box">
          <div className="title">
            The <span className="next-gen">next-generation</span> professional platform
          </div>
          <div className="sub-content">
            <div className="vertical-divider" />
            <div className="sub-title">
              Our purpose is to help people find the best opportunities based on the truest and most
              authentic version of themselves.
              <div>
                <button className="primary-btn">Click Me!</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="join-section">
        <div className="join-para">
          We are passionate about linking human capital with satisfaction. It is more than merely
          producing output. It is about attaining fulfillment, discovering purpose, and providing to
          society while remaining genuine to oneself.
        </div>
      </section>
      <section className="ourview-section">
        <div className="heading">Our View</div>
        <div className="content">
          Our view of the workforce is that it comprises people with different abilities, ambitions,
          and motivations. We trust that everyone reaps the benefits when we encourage people to
          express themselves fully, locate chances aligned with their values, interests, and skills,
          and connect with entities and individuals who share their purpose.
          <br /> We are not only a platform; we are a revolution. Our movement fosters genuineness,
          inclusivity, and development, empowering people and companies to locate their compass and
          build meaningful relationships.
        </div>
        <div className="sub-heading">
          Join us, and let us shift work from merely being a source of pay to becoming a well of
          satisfaction.
        </div>
      </section>
      <section className="work-section">
        <div className="heading">How does PurDriven work?</div>
        <div className="content">
          Wondering how our platform works? We depend on fundamentals not limited to expansion,
          depth, and potential.
        </div>

        <Carousel
          showArrows={false}
          autoFocus={true}
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows
          className="presentation-mode"
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              maxWidth: '600px',
              minHeight: '360px',
              marginBottom: '32px',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '8px',
            }}
          >
            <div style={{ padding: '24px', color: '#fff' }}>
              <div className="card-title"> Expansion</div>
              <div className="card-divider">
                <CardGradientDivider />
              </div>
              <div className="card-content">
                Purdriven allows you to showcase all your talents in one place, offering you an
                increased chance of discovering a job or exploring exciting opportunities by
                combining your skills. Research indicates that employees who utilize strengths at
                work are more engaged, satisfied, and motivated to invest in their roles. At
                PurDriven, we highly value individuals with potential. Having carefully designed our
                platform to cater to this significant segment of the workforce that often requires
                more than one platform to exhibit their work and abilities.
              </div>
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              maxWidth: '600px',
              minHeight: '360px',
              marginBottom: '32px',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '8px',
            }}
          >
            <div style={{ padding: '24px', color: '#fff' }}>
              <div className="card-title">Depth</div>
              <div className="card-divider">
                <CardGradientDivider />
              </div>
              <div className="card-content">
                Understanding oneself is crucial when it comes to finding a fulfilling career. Our
                search filters go beyond skills by encompassing elements empowering individuals to
                find the perfect match for their growth and fulfillment. You alone know what brings
                you a sense of purpose and meaning. We encourage you to find how to leverage your
                unique talents to make meaningful contributions.
              </div>
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              maxWidth: '600px',
              minHeight: '360px',
              marginBottom: '32px',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '8px',
            }}
          >
            <div style={{ padding: '24px', color: '#fff' }}>
              <div className="card-title">Potential</div>
              <div className="card-divider">
                <CardGradientDivider />
              </div>
              <div className="card-content">
                Creativity has become a valued attribute of job candidates today. Many entrepreneurs
                and founders created successful businesses from their interests and passions. At
                PurDriven, we actively encourage people to share their interests igniting the
                potential for business ventures or opportunities.
              </div>
            </div>
          </div>
        </Carousel>
      </section>
      <section className="weaim-section">
        <div className="heading">We Aim to</div>
        <div className="content">
          {`Turn your passions into your life's work with the help of our innovative professional
          platform. Our goals include :`}
        </div>
        <ul>
          <li className="flex flex-row items-start">
            <AimListIcon />
            Streamline the hiring process, providing deeper transparency and multidimensional
            awareness to employers.
          </li>
          <li className="flex flex-row items-start">
            <AimListIcon />
            Streamline the hiring process, providing deeper transparency and multidimensional
            awareness to employers.
          </li>
          <li className="flex flex-row items-start">
            <AimListIcon />
            Foster meaningful connections with other professionals and find people with the same
            goals and objectives in your working environment.
          </li>
          <li className="flex flex-row items-start">
            <AimListIcon />
            Realign your career path by helping you define your strengths and weaknesses to make the
            most out of your professional life.
          </li>
          <li className="flex flex-row items-start">
            <AimListIcon />
            Unleash creativity which is a highly valued asset among job candidates. Connect with
            your interests, passions and hobbies to create a business or a unique opportunity.
          </li>
        </ul>
      </section>
      <footer>
        <div className="landing-footer">
          <div>
            <FooterLogoIcon />
            <div className="purpose-text my-6">
              Your authentic career platform that helps you find your true purpose.
            </div>
          </div>
          <div>
            <div className="footer-link-heading">Quick Links</div>
            <div className="flex gap-8">
              <div className="footer-links">
                <ul>
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>About Us</a>
                  </li>
                  <li>
                    <a>Features</a>
                  </li>
                  <li>
                    <a>Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="footer-links">
                <ul>
                  <li>
                    <a>Terms & Conditions</a>
                  </li>
                  <li>
                    <a>Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="footer-link-heading">Connect with us</div>
              <div className="flex gap-6 items-center">
                <div>
                  <a href="#">
                    <img src={linkdinicon} alt="" />
                  </a>
                </div>
                <div>
                  <a href="#">
                    <img src={instagramIcon} alt="" />
                  </a>
                </div>
                <div>
                  <a href="#">
                    <img src={facebook} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="absolute bottom-0 right-0 ">
        <img src={footerIcon} alt="" className="landing-footer-img" />
      </div>
      <div className="py-5 text-center copyright">&#169; 2023, PurDriven. All Rights Reserved.</div>
    </div>
  );
}
