import { useLocation } from '@gatsbyjs/reach-router';
import classNames from 'classnames';
import { Link, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { Feature } from '../components/Index/Feature';
import { ProblemsetsFeature } from '../components/Index/features/ProblemsetsFeature';
import { ProgressTrackingFeature } from '../components/Index/features/ProgressTrackingFeature';
import { ResourcesFeature } from '../components/Index/features/ResourcesFeature';
import AetherFlowHero from '../components/Index/AetherFlowHero';
import ActiveCardsHome from '../components/activeCardsHome';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import LightRays from '../components/Index/LightRays';
import {
  useCurrentUser,
  useIsUserDataLoaded,
} from '../context/UserDataContext/UserDataContext';


/**
 * Index-only DARK palette:
 * - Background: midnight navy-ish
 * - Accents/content: vanilla + purple
 *
 * Requested update (image2):
 * - Use the sampled deep purple (~#70428A) for:
 *   - “AMC to Olympiad” text
 *   - “Browse Topics” button background
 * - Remove glow around “Browse Topics” (no GlowingRing wrapper, no shadow)
 */
const MIDNIGHT = '#120F24';
const MIDNIGHT_DEEP = '#0A0818';


const VANILLA = '#F4EDEA';
const MAUVE = '#F0C2FF';


/** sampled from image2 (approx) */
const PURPLE_FROM_IMAGE2 = '#70428A';


const BORDER_STRONG = 'rgba(240, 194, 255, 0.26)';
const TEXT_PRIMARY = VANILLA;
const TEXT_SECONDARY = 'rgba(244, 237, 234, 0.78)';
const TEXT_MUTED = 'rgba(244, 237, 234, 0.62)';


const containerClasses = 'max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8';


function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);
  return (
    <div
      ref={ref}
      className={classNames(
        'transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}


export default function IndexPage({ path }): JSX.Element {
  const currentUser = useCurrentUser();
  const loading = useIsUserDataLoaded();
  const location = useLocation();


  React.useEffect(() => {
    try {
      if (currentUser && location.state.redirect) navigate('/dashboard');
    } catch (e) {
      if (currentUser) navigate('/dashboard');
    }
  }, [currentUser, loading, location]);


  React.useEffect(() => {
    const htmlStyle = document.documentElement.style;
    const bodyStyle = document.body.style;
    const prevHtmlOverscrollY = htmlStyle.overscrollBehaviorY;
    const prevBodyOverscrollY = bodyStyle.overscrollBehaviorY;


    htmlStyle.overscrollBehaviorY = 'none';
    bodyStyle.overscrollBehaviorY = 'none';


    return () => {
      htmlStyle.overscrollBehaviorY = prevHtmlOverscrollY;
      bodyStyle.overscrollBehaviorY = prevBodyOverscrollY;
    };
  }, []);


  const linkStyle: React.CSSProperties = {
    color: MAUVE,
    textDecoration: 'none',
    fontWeight: 700,
  };


  const sectionHeadingClasses =
    'mx-auto flex max-w-4xl flex-col items-center text-center text-4xl font-bold tracking-tight md:text-5xl 2xl:text-6xl';
  const sectionSubtitleClasses =
    'mx-auto max-w-3xl text-center text-lg font-medium leading-relaxed md:text-xl 2xl:text-2xl';
  const infoCardStyle: React.CSSProperties = {
    border: `1px solid ${BORDER_STRONG}`,
    background: 'rgba(244, 237, 234, 0.08)',
    color: TEXT_PRIMARY,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  };


  return (
    <Layout>
      <SEO title={null} image={null} pathname={path} />


      <div className="fixed top-0 z-50 w-full">
        <div className="backdrop-blur-lg">
            <TopNavigationBar hidePromoBar />
        </div>
      </div>


      {/* Begin Hero */}
      <AetherFlowHero />
      {/* End Hero */}

      {/* Wave transition: dark base */}
      <div
        className="overflow-hidden leading-[0] pointer-events-none"
        style={{ backgroundColor: MIDNIGHT }}
      >
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20 block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,80 C300,80 400,0 600,0 C800,0 900,80 1200,80 L1200,0 L0,0 Z"
            fill={MIDNIGHT}
          />
        </svg>
      </div>


      {/* Below hero: keep dark background but page-owned text stays vanilla/purple */}
      <div
        className="relative transition-colors duration-500"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT} 0%, ${MIDNIGHT_DEEP} 100%)`,
          color: TEXT_PRIMARY,
        }}
      >
        <div className="h-6 sm:h-10 md:h-16 2xl:h-24"></div>


        <RevealSection className="px-6 sm:px-8 lg:px-10">
          <div className="mx-auto grid w-full max-w-6xl items-center justify-center gap-8 pb-3 md:grid-cols-[auto_auto] md:gap-x-10 md:pl-8 lg:gap-x-14 lg:pl-10">
            <div className="flex min-w-0 flex-col items-center">
              <h2
                className="text-center text-5xl font-bold md:text-6xl md:whitespace-nowrap xl:text-7xl"
                style={{ color: TEXT_PRIMARY }}
              >
                Learn Contest Math
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl text-center text-lg font-medium leading-relaxed md:text-xl 2xl:text-2xl"
                style={{ color: TEXT_SECONDARY }}
              >
                Carefully designed for math contest students - available to everyone,
                for free.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/Lovemascot.png"
                alt="Lovemascot"
                className="h-32 w-auto shrink-0 object-contain md:h-40 lg:h-48 xl:h-56"
              />
            </div>
          </div>
        </RevealSection>

        <div className={containerClasses}>


          <div className="h-12 md:h-20 2xl:h-36"></div>


          {/* Imported components may still have their own colors internally */}
          <RevealSection delay={100}>
            <div className="grid gap-6 lg:grid-cols-2">
              <Feature
                iconSrc="/images/feature-resources.png"
                iconFallbackSrc="https://i.ibb.co/TD2gjPwB/feature-resources.png"
                iconAlt="Resources icon"
                iconClasses="from-black to-black"
                title="Curated Resources"
                blobClasses="[background-color:rgb(99,84,139)] hidden xl:block"
                feature={<ResourcesFeature />}
                fade="none"
              >
                Learn new topics from a vetted list of high-quality resources. If one
                resource doesn't click, look at another!
                <span className="mt-3 block">
                  <Link to="/foundations" style={linkStyle}>
                    Explore Foundations Resources
                  </Link>
                </span>
              </Feature>


              <Feature
                iconSrc="/images/feature-problemsets.png"
                iconFallbackSrc="https://i.ibb.co/S7mV5P3x/feature-problemsets.png"
                iconAlt="Problemsets icon"
                iconClasses="from-black to-black"
                title="Extensive Problemsets"
                blobClasses="from-black to-black"
                feature={<ProblemsetsFeature />}
                fade="none"
              >
                Practice each topic with extensive problemsets and solutions covering a
                wide range of difficulties.
                <span className="mt-3 block">
                  <Link to="/problems" style={linkStyle}>
                    Go to Problems Page
                  </Link>
                </span>
              </Feature>
            </div>
          </RevealSection>


          <div className="h-6 md:h-10 2xl:h-24"></div>


          <RevealSection delay={150}>
            <div className="grid gap-6 lg:grid-cols-2">
              <Feature
                iconSrc="/images/feature-progress.png"
                iconFallbackSrc="https://i.ibb.co/hJbCbhn9/feature-progress.png"
                iconAlt="Progress tracking icon"
                iconClasses="from-black to-black"
                title="Progress Tracking"
                blobClasses="[background-color:rgb(99,84,139)]"
                feature={<ProgressTrackingFeature />}
                fade="none"
              >
                Use our progress-tracking tools to track your progress in the Guide and
                stay motivated.
                <span className="mt-3 block">
                  <Link to="/dashboard" style={linkStyle}>
                    Open Dashboard
                  </Link>
                </span>
              </Feature>


              <Feature
                iconSrc="/images/feature-community.png"
                iconFallbackSrc="https://i.ibb.co/gLmZWq6n/feature-community.png"
                iconAlt="Community help icon"
                iconClasses="from-black to-black"
                title="Help when you need it"
                blobClasses="bg-green-200 dark:bg-green-800"
                feature={
                  <div className="">
                  </div>
                }
                fade="none"
              >
                <span className="mb-4 block md:mb-8">
                  Ask questions, share solutions, and learn from other contest students
                  in the AoPS community.
                </span>


                <a
                  href="https://artofproblemsolving.com/community"
                  target="_blank"
                  rel="noreferrer"
                  style={linkStyle}
                >
                  Visit AoPS Community →
                </a>
              </Feature>
            </div>
          </RevealSection>


          <div className="h-16 md:h-20 2xl:h-36"></div>
        </div>
      </div>
      <ActiveCardsHome/>
         {/* Section divider — glowing line */}
      <div
        className="pointer-events-none mx-auto w-2/3"
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(197, 139, 255, 0.7), rgba(140, 80, 220, 0.9), rgba(197, 139, 255, 0.7), transparent)',
          boxShadow: '0 0 18px 6px rgba(140, 80, 220, 0.35)',
        }}
      />
      <div
        className="relative transition-colors duration-500"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT_DEEP} 0%, ${MIDNIGHT_DEEP} 100%)`,
          color: TEXT_PRIMARY,
        }}
      >
        {/* Light rays effect from divider line */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <LightRays
            raysOrigin="top-center"
            raysColor="#bd9ee5"
            raysSpeed={0.8}
            lightSpread={0.5}
            rayLength={2.5}
            pulsating={true}
            fadeDistance={1}
            saturation={0.9}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.05}
            distortion={0.1}
            className="custom-rays"
          />
        </div>
        <div className="relative z-10">
          <div className="h-16 md:h-24"></div>
          <div className={containerClasses}>
            <RevealSection>
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h2
                    className="max-w-3xl text-left text-4xl font-bold tracking-tight md:text-5xl 2xl:text-6xl"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    Join our Team.
                  </h2>
                  <div className="h-5"></div>
                  <p
                    className="max-w-2xl text-left text-lg leading-relaxed md:text-xl"
                    style={{ color: TEXT_SECONDARY }}
                  >
                    USAMO Guide is a student-run community dedicated to olympiad
                    mathematics. Join us to write lessons, curate problem sets,
                    and grow as a mentor alongside fellow contest enthusiasts.
                  </p>
                  <div className="h-7 md:h-9"></div>
                  <a
                    href="https://docs.google.com/document/d/1AUNOq6OlVcSZN_gUPfvyhimlh9hA4GNvNaLdzyflX_8/edit?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="purple-motion-effect inline-flex items-center rounded-full px-7 py-3 text-base font-bold transition"
                    style={{
                      border: `1px solid rgba(112, 66, 138, 0.55)`,
                      backgroundColor: PURPLE_FROM_IMAGE2,
                      '--pme-color': VANILLA,
                      '--pme-hover-color': '#201C36',
                      '--pme-wipe-bg': '#F7DEFF',
                    } as React.CSSProperties}
                  >
                    Apply Now
                  </a>
                </div>
                <div className="lg:col-span-5">
                  <div className="overflow-hidden rounded-2xl ui-card-dark">
                    <img
                      src="/images/builders.png"
                      alt="USAMO Guide team collaboration"
                      className="w-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="h-16 md:h-24"></div>
              </div>
            </RevealSection>
          </div>
        </div>
      </div>


      {/* Begin FAQ */}
      <div
        className="relative transition-colors duration-500"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT} 0%, ${MIDNIGHT_DEEP} 100%)`,
          color: TEXT_PRIMARY,
        }}
      >

        <div className="relative z-10 mx-auto max-w-(--breakpoint-xl) px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-28">
          <RevealSection>
          <h2 className={sectionHeadingClasses} style={{ color: TEXT_PRIMARY }}>
            Frequently asked questions
          </h2>
          <p className={sectionSubtitleClasses} style={{ color: TEXT_SECONDARY }}>
            The essentials about how to use the Guide, get help, and contribute.
          </p>
          </RevealSection>
          <div className="pt-10 md:pt-16">
            <RevealSection delay={100}>
            <dl className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-2 md:gap-8">
              <div>
                <div className="rounded-xl p-6 text-left shadow-sm" style={infoCardStyle}>
                  <dt className="text-lg leading-6 font-medium" style={{ color: TEXT_PRIMARY }}>
                    What are AMC, AIME, and USAMO?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6" style={{ color: TEXT_SECONDARY }}>
                      The AMC (8/10/12) and AIME are the main pipeline contests
                      in the U.S. that culminate in USAMO. For official contest
                      information and schedules, see the{' '}
                      <a
                        href="https://www.maa.org/math-competitions"
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle}
                      >
                        MAA competitions page
                      </a>
                      .
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl p-6 text-left shadow-sm" style={infoCardStyle}>
                  <dt className="text-lg leading-6 font-medium" style={{ color: TEXT_PRIMARY }}>
                    Is this an official syllabus?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6" style={{ color: TEXT_SECONDARY }}>
                      No. This guide is a community-curated roadmap that
                      reflects common contest topics and problem-solving
                      techniques. It does not represent an official syllabus.
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl p-6 text-left shadow-sm" style={infoCardStyle}>
                  <dt className="text-lg leading-6 font-medium" style={{ color: TEXT_PRIMARY }}>
                    How do I report a problem or ask a question?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6" style={{ color: TEXT_SECONDARY }}>
                      If you encounter an issue while using the guide (website
                      bug, typo, broken link, unclear explanation, etc), use the
                      "Contact Us" button. Alternatively, email us at{' '}
                      <a
                        href="mailto:contact@usamoguide.com"
                        style={linkStyle}
                      >
                        contact@usamoguide.com
                      </a>
                      .
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl p-6 text-left shadow-sm" style={infoCardStyle}>
                  <dt className="text-lg leading-6 font-medium" style={{ color: TEXT_PRIMARY }}>
                    I'm looking for classes, club curriculum...
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6" style={{ color: TEXT_SECONDARY }}>
                      Check out AoPS classes and community-led study groups, or
                      join the USAMO Guide study cohorts.
                    </p>
                  </dd>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="rounded-xl p-6 text-left shadow-sm" style={infoCardStyle}>
                  <dt className="text-lg leading-6 font-medium" style={{ color: TEXT_PRIMARY }}>
                    Is this guide only for USAMO qualifiers?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6" style={{ color: TEXT_SECONDARY }}>
                      Not at all. The guide is designed to support AMC 8, AMC
                      10/12, and AIME learners to reach USAMO.
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl p-6 text-left shadow-sm" style={infoCardStyle}>
                  <dt className="text-lg leading-6 font-medium" style={{ color: TEXT_PRIMARY }}>
                    How can I get help?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6" style={{ color: TEXT_SECONDARY }}>
                      If you get stuck, ask questions in the{' '}
                      <a
                        href="https://artofproblemsolving.com/community"
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle}
                      >
                        AoPS community
                      </a>{' '}
                      or reach out via the Contact Us button.
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl p-6 text-left shadow-sm" style={infoCardStyle}>
                  <dt className="text-lg leading-6 font-medium" style={{ color: TEXT_PRIMARY }}>
                    How can I contribute?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6" style={{ color: TEXT_SECONDARY }}>
                      Contributions are welcome! Visit our{' '}
                      <a
                        href="https://github.com/usamoguide/usamo-guide"
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle}
                      >
                        GitHub repository
                      </a>
                      to find guidelines and open issues.
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl p-6 text-left shadow-sm" style={infoCardStyle}>
                  <dt className="text-lg leading-6 font-medium" style={{ color: TEXT_PRIMARY }}>
                    Is this open source?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6" style={{ color: TEXT_SECONDARY }}>
                      Yes! Check out our{' '}
                      <a
                        href="https://github.com/usamoguide/usamo-guide"
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle}
                      >
                        GitHub Repository
                      </a>
                      .
                    </p>
                  </dd>
                </div>
              </div>
            </dl>
            </RevealSection>
          </div>
        </div>
      </div>
      {/*End FAQ*/}

      
      {/* Footer: dark bg + vanilla text */}
      <div style={{ background: MIDNIGHT }}>
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-12">
          <p className="text-center text-base leading-6" style={{ color: TEXT_MUTED }}>
            &copy; {new Date().getFullYear()} USAMO Guide.
            <br />
            No part of this website may be reproduced or commercialized in any manner without prior written permission.{' '}
            <Link to="/license" style={linkStyle}>
              Learn More.
            </Link>
            {' | '}
            <Link to="/privacy-policy" style={linkStyle}>
              Privacy Policy
            </Link>
            {' | '}
            <Link to="/terms-of-service" style={linkStyle}>
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}