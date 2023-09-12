import React from 'react';
import './style.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { AimListIcon } from '../../components/Icons/AimListIcon';
import { FooterLogoIcon } from '../../components/Icons/FooterLogoIcon';
import instagramIcon from '../../components/Icons/instagramIcon.svg';
import linkdinicon from '../../components/Icons/linkdinicon.svg';
import facebook from '../../components/Icons/facebook.svg';
import footerIcon from '../../components/Icons/footerIcon.png';
import WorkCard from '../../components/Workcard';
import { NormalButton } from '../../components/Button';
import { MailIcon } from '../../components/Icons/MailIcon';
import Navbar from '../../components/Navbar.js';
import { LANG, BUTTON_LABELS } from '../../constants/lang';

export default function LandingPage() {
  const {
    PAGES: {
      HOMEPAGE: {
        LANG_HOMEPAGE_NEXT_GEN,
        LANG_HOMEPAGE_HEADING,
        LANG_HOMEPAGE_OUR_PERPOSE,
        LANG_HOMEPAGE_WE_ARE,
        LANG_HOMEPAGE_OUR_VIEW,
        LANG_HOMEPAGE_OUR_VIEW_LONG,
        LANG_HOMEPAGE_JOIN_US,
        LANG_HOMEPAGE_HOW_WORK,
        LANG_HOMEPAGE_WONDERING,
        LANG_HOMEPAGE_EXPANSION,
        LANG_HOMEPAGE_EXPANSION_PARA,
        LANG_HOMEPAGE_DEPTH,
        LANG_HOMEPAGE_DEPTH_PARA,
        LANG_HOMEPAGE_POTENTIAL,
        LANG_HOMEPAGE_POTENTIAL_PARA,
        LANG_HOMEPAGE_WE_AIM,
        LANG_HOMEPAGE_WE_HIGHLIGHT,
        LANG_HOMEPAGE_WE_STREAMLINE,
        LANG_HOMEPAGE_WE_FOSTER,
        LANG_HOMEPAGE_WE_REALIGN,
        LANG_HOMEPAGE_WE_UNLEASH,
        LANG_HOMEPAGE_AUTHENTIC,
        LANG_HOMEPAGE_QUICK_LINKS,
        LANG_HOMEPAGE_HOME,
        LANG_HOMEPAGE_CONTACT,
        LANG_HOMEPAGE_TERMS,
        LANG_HOMEPAGE_PRIVACY,
        LANG_HOMEPAGE_CONNECT,
        LANG_HOMEPAGE_RIGHTS,
      },
    },
    LANG_FEATURE,
    LANG_ABOUT_US,
  } = LANG;
  const { BTNLBL_SIGNUP, BTNLBL_JOIN_PUR } = BUTTON_LABELS;

  return (
    <div className="landing-page">
      <navbar>
        <Navbar />
      </navbar>
      <section className="hero-section">
        <div className="content-box">
          <div className="title">
            The <span className="next-gen">{LANG_HOMEPAGE_NEXT_GEN}</span>
          </div>
          <div className="title">{LANG_HOMEPAGE_HEADING}</div>
          <div className="sub-content">
            <div className="vertical-divider" />
            <div className="flex flex-col">
              <div className="sub-title">{LANG_HOMEPAGE_OUR_PERPOSE}</div>
              <div className="lg:mt-8 mt-4">
                <NormalButton label={BTNLBL_SIGNUP} isIcon={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="join-section">
        <div className="join-para">{LANG_HOMEPAGE_WE_ARE}</div>
        <div className="text-center mt-8">
          <NormalButton label={BTNLBL_JOIN_PUR} isIcon={true} />
        </div>
      </section>
      <section className="ourview-section">
        <div className="heading">{LANG_HOMEPAGE_OUR_VIEW}</div>
        <div className="underline" />
        <div className="content mt-2">{LANG_HOMEPAGE_OUR_VIEW_LONG}</div>
        <div className="sub-heading">{LANG_HOMEPAGE_JOIN_US}</div>
      </section>
      <section className="work-section">
        <div className="heading">{LANG_HOMEPAGE_HOW_WORK}</div>
        <div className="underline" />
        <div className="content mt-2">{LANG_HOMEPAGE_WONDERING}</div>
        <Carousel
          showArrows={false}
          autoFocus={true}
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows
          className="presentation-mode"
        >
          <WorkCard title={LANG_HOMEPAGE_EXPANSION} content={LANG_HOMEPAGE_EXPANSION_PARA} />
          <WorkCard title={LANG_HOMEPAGE_DEPTH} content={LANG_HOMEPAGE_DEPTH_PARA} />
          <WorkCard title={LANG_HOMEPAGE_POTENTIAL} content={LANG_HOMEPAGE_POTENTIAL_PARA} />
        </Carousel>
      </section>
      <section className="weaim-section">
        <div className="heading">{LANG_HOMEPAGE_WE_AIM}</div>
        <div className="underline" />
        <div className="content mt-2">{LANG_HOMEPAGE_WE_HIGHLIGHT}</div>
        <ul>
          <li className="flex flex-row items-start">
            <AimListIcon />
            {LANG_HOMEPAGE_WE_STREAMLINE}
          </li>
          <li className="flex flex-row items-start">
            <AimListIcon />
            {LANG_HOMEPAGE_WE_FOSTER}
          </li>
          <li className="flex flex-row items-start">
            <AimListIcon />
            {LANG_HOMEPAGE_WE_REALIGN}
          </li>
          <li className="flex flex-row items-start">
            <AimListIcon />
            {LANG_HOMEPAGE_WE_UNLEASH}
          </li>
          <li className="flex flex-row items-start">
            <AimListIcon />
            {LANG_HOMEPAGE_AUTHENTIC}
          </li>
        </ul>
      </section>
      <footer>
        <div className="footer-logo">
          <FooterLogoIcon />
        </div>
        <div className="landing-footer">
          <div>
            <div className="purpose-text mb-10">{LANG_HOMEPAGE_AUTHENTIC}</div>
            <div className="flex items-center gap-6 email pt-4">
              <span>
                <MailIcon />
              </span>
              <span className>purdriven@gmail.com</span>
            </div>
          </div>
          <div>
            <div className="footer-link-heading">{LANG_HOMEPAGE_QUICK_LINKS}</div>
            <div className="flex gap-8">
              <div className="footer-links mb-8">
                <ul>
                  <li>
                    <a>{LANG_HOMEPAGE_HOME}</a>
                  </li>
                  <li>
                    <a>{LANG_ABOUT_US}</a>
                  </li>
                  <li>
                    <a>{LANG_FEATURE}</a>
                  </li>
                  <li>
                    <a>{LANG_HOMEPAGE_CONTACT}</a>
                  </li>
                </ul>
              </div>
              <div className="footer-links">
                <ul>
                  <li>
                    <a>{LANG_HOMEPAGE_TERMS}</a>
                  </li>
                  <li>
                    <a>{LANG_HOMEPAGE_PRIVACY}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="footer-link-heading">{LANG_HOMEPAGE_CONNECT}</div>
              <div className="flex gap-6 items-center mt-5 ">
                <div className="social-links">
                  <a href="#">
                    <img src={linkdinicon} alt="" />
                  </a>
                </div>
                <div className="social-links">
                  <a href="#">
                    <img src={instagramIcon} alt="" />
                  </a>
                </div>
                <div className="social-links">
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
      <div className="py-5 text-center copyright">&#169; {LANG_HOMEPAGE_RIGHTS}</div>
    </div>
  );
}
