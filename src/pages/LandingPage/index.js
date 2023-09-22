import React, { useState } from 'react';
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
import { MailIcon } from '../../components/Icons/MailIcon';
import Navbar from '../../components/Navbar.js';
import { LANG, BUTTON_LABELS } from '../../constants/lang';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router';
import { PATHS } from '../../constants/urlPaths';
import userimg from '../../assets/images/ludgi.svg';
import { ReadMore } from './ReadMore';

const { PATH_SIGNUP = '' } = PATHS;

export default function LandingPage() {
  const navigate = useNavigate();

  useState(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    PAGES: {
      HOMEPAGE: {
        LANG_HOMEPAGE_NEXT_GEN,
        LANG_HOMEPAGE_HEADING,
        LANG_HOMEPAGE_OUR_PERPOSE,
        LANG_HOMEPAGE_WE_ARE,
        LANG_HOMEPAGE_OUR_VIEW,
        LANG_HOMEPAGE_OUR_VIEW_LONG1,
        LANG_HOMEPAGE_OUR_VIEW_LONG2,
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
              <div className="lg:mt-7 mt-4">
                <Button label={BTNLBL_SIGNUP} isIcon={true} onClick={() => navigate(PATH_SIGNUP)} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="join-section">
        <div className="join-para">{LANG_HOMEPAGE_WE_ARE}</div>
        <div className="mt-8 flex justify-center">
          <Button label={BTNLBL_JOIN_PUR} isIcon={true} onClick={() => navigate(PATH_SIGNUP)} />
        </div>
      </section>
      <section className="ourview-section">
        <div className="heading">{LANG_HOMEPAGE_OUR_VIEW}</div>
        <div className="underline" />
        <div className="content mt-2">{LANG_HOMEPAGE_OUR_VIEW_LONG1}</div>
        <div className="content">{LANG_HOMEPAGE_OUR_VIEW_LONG2}</div>
        <div className="sub-heading">{LANG_HOMEPAGE_JOIN_US}</div>
      </section>
      <section className="work-section pb-8">
        <div className="heading">{LANG_HOMEPAGE_HOW_WORK}</div>
        <div className="underline" />
        <div className="content mt-2">{LANG_HOMEPAGE_WONDERING}</div>

        <Carousel
          showArrows={false}
          autoFocus={true}
          showThumbs={false}
          showStatus={false}
          className="presentation-mode"
        >
          <WorkCard title={LANG_HOMEPAGE_EXPANSION} content={LANG_HOMEPAGE_EXPANSION_PARA} />
          <WorkCard title={LANG_HOMEPAGE_DEPTH} content={LANG_HOMEPAGE_DEPTH_PARA} />
          <WorkCard title={LANG_HOMEPAGE_POTENTIAL} content={LANG_HOMEPAGE_POTENTIAL_PARA} />
        </Carousel>
      </section>
      <section className="about-section">
        <div className="flex gap-[32px]">
          <div className="hidden md:block">
            <img src={userimg} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="heading">
              About the founder
              <div className="underline" />
            </div>
            <div className="md:hidden pt-4 block">
              <img src={userimg} alt="" />
            </div>
            <div className="name p-0 lg:pt-4">- Ludgi Windrich</div>
          </div>
        </div>
        <div className="mt-4">
          <ReadMore>
            {`My vision for PurDriven is to be a place where people feel comfortable being authentic.
            People are accepted, respected, embraced, inspired, and empowered to be themselves and
            use their uniqueness to contribute.Reaching my potential and making this life worth
            living have been at the top of my life’s goals list for a while. And I see a strong
            connection between potential, authenticity, and purpose. I see myself being aligned with
            my purpose only if I am authentic to my core beliefs and who I am and then naturally
            navigate towards my potential. I am grateful for creating a platform and a business that
            fully aligns with who I am. And I wish that to everybody. I share the same sentiment
            everyone has when doing something they love: fulfillment and gratitude.`}
          </ReadMore>
        </div>
      </section>
      <section className="weaim-section hidden">
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
        <div className="footer-logo mb-6">
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
              <div className="flex gap-6 items-center mt-5 pb-8">
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
