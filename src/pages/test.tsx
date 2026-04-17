import { useLocation } from '@gatsbyjs/reach-router';
import classNames from 'classnames';
import { Link, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { GlowingRing } from '../components/elements/landing/GlowingRing';
import { GlowingText } from '../components/elements/landing/GlowingText';
import { GradientText } from '../components/elements/landing/GradientText';
import { Feature } from '../components/Index/Feature';
import { ProblemsetsFeature } from '../components/Index/features/ProblemsetsFeature';
import { ProgressTrackingFeature } from '../components/Index/features/ProgressTrackingFeature';
import { ResourcesFeature } from '../components/Index/features/ResourcesFeature';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ActiveCardsHome from '../components/activeCardsHome';
import TrustedBy from '../components/Index/TrustedBy';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar';
import {
  useCurrentUser,
  useIsUserDataLoaded,
} from '../context/UserDataContext/UserDataContext';

const containerClasses = 'max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8';
const headerClasses =
  'text-4xl md:text-5xl 2xl:text-6xl font-black text-black dark:text-white';
const headerClassesNoText = 'text-4xl md:text-5xl 2xl:text-6xl font-black';
const subtextClasses =
  'text-lg md:text-xl 2xl:text-2xl font-medium max-w-4xl leading-relaxed text-gray-700 dark:text-gray-400';
const headerSubtextSpacerClasses = 'h-6 2xl:h-12';
const whiteButtonClassesBig =
  'text-lg bg-white px-4 py-2 md:px-6 md:py-3 rounded-[130px] font-medium text-gray-900 relative';
const whiteButtonClasses =
  'text-lg md:text-xl bg-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium text-gray-900 relative';
const usamoTitleClasses =
  'text-center font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl bg-clip-text text-transparent bg-linear-to-b from-gray-900 to-gray-600 dark:from-white dark:to-red-200';
const linkTextStyles =
  'text-orange-600 dark:text-orange-300 transition hover:text-orange-800 dark:hover:text-orange-100';

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
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0',
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
    // User will normally be redirected to the dashboard if the user is logged in, but if user clicks the icon in the top left corner while on the dashboard, they will not be redirected.
    try {
      if (currentUser && location.state.redirect) {
        /* Whether or not the user should be redirected to the dashboard is stored in location.state.redirect, but if the user opens a link straight
        to the landing page, location.state.redirect will be undefined, causing a typeerror, this try catch statements accounts for that */
        navigate('/dashboard');
      }
    } catch (e) {
      if (currentUser) {
        navigate('/dashboard');
      }
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

  return (
    <Layout>
      <SEO title={null} image={null} pathname={path} />

      <div className="fixed top-0 z-50 w-full">
        <div className="backdrop-blur-lg">
          <TopNavigationBar />
        </div>
      </div>

      {/* Begin Hero */}
      <div className="relative overflow-hidden -mt-16 pt-32 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:via-black dark:to-[#1a0d00] transition-colors duration-500">
        <div
          className="pointer-events-none absolute inset-0 bg-repeat bg-center blur-[1px] dark:opacity-17"
          style={{ backgroundImage: "url('/images/math-doodles.png')" }}
        />
        <div className="pointer-events-none absolute inset-0 z-0">
          
          <div className="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]">
            <svg
              className="h-full w-full opacity-[0.15] dark:opacity-[0.4]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid-pattern"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-orange-400/60 dark:text-orange-500/80"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_95%_80%_at_50%_38%,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.12)_40%,rgba(0,0,0,0.05)_58%,transparent_80%)] dark:bg-[radial-gradient(ellipse_95%_80%_at_50%_38%,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.24)_40%,rgba(0,0,0,0.1)_58%,transparent_80%)]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.05)_0%,transparent_68%)]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-orange-500/10 blur-[100px] rounded-full" />
      
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-[#160f08] to-transparent" />

        <div className="relative z-10 flex flex-col px-4 sm:px-6 md:min-h-screen lg:px-8">
          <div className="h-6 sm:h-12"></div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="h-4"></div>

            <div className="mb-2 flex justify-center">
              <a
                href="#"
                className="inline-flex items-center rounded-full border border-orange-300/80 bg-linear-to-r from-orange-100 to-amber-100 px-6 py-3 text-base font-extrabold tracking-wide text-orange-900 shadow-[0_8px_24px_rgba(251,146,60,0.25)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 dark:border-orange-700/60 dark:from-orange-900/40 dark:to-amber-900/30 dark:text-orange-100"
              >
                Written by USAMO/JMO qualifiers.
              </a>
            </div>

            <div>
              <h1
                className={classNames(
                  usamoTitleClasses,
                  'mx-auto h-0 w-full max-w-4xl flex-row items-center justify-center pb-1 leading-tight font-semibold dark:visible dark:h-auto'
                )}
              >
                A Clear Roadmap from
                <br />
                <span className="whitespace-nowrap">AMC to Olympiad</span>
              </h1>
            </div>

            <div className="h-2 sm:h-3"></div>

            <p className="font-brand text-8 text-center leading-snug text-gray-800 sm:text-xl md:!leading-normal 2xl:text-3xl dark:text-gray-300">
            Structured topics, curated problems, and a clear path to Olympiad-level problem solving
            </p>

            <div className="h-10 sm:h-14"></div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-10">
              <Link
                to="/dashboard"
                className="shine-effect inline-flex items-center justify-center rounded-full border-orange-600 bg-linear-to-br from-orange-300 to-orange-400 px-8 py-3 text-[16px] font-bold leading-none text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(251,146,60,0.4)]"
              >
                Start Learning {'>'}
              </Link>
              <GlowingRing>
                <Link
                  to="/foundations"
                  className={classNames(whiteButtonClassesBig, '!text-[15px] inline-block !font-bold shine-effect')}
                >
                  Browse Topics
                </Link>
              </GlowingRing>
            </div>

            <div className="h-10 sm:h-14"></div>

            <RevealSection>
            <div className="flex flex-col items-center gap-4 text-center text-gray-600 md:justify-center md:text-sm dark:text-gray-400">
              <span className="block font-semibold text-center">Built by the USAMO Guide community</span>
              <div className="flex w-full flex-wrap justify-center gap-4 sm:gap-6">
                <a
                  href="https://github.com/usamoguide/usamo-guide"
                  target="_blank"
                  rel="noreferrer"
                  className={linkTextStyles}
                >
                  Check out our GitHub →
                </a>
                <a
                  href="https://discord.gg/X2zx6u53XH"
                  target="_blank"
                  rel="noreferrer"
                  className={linkTextStyles}
                >
                  Join our Discord server →
                </a>
                <a
                  href="https://contests.usamoguide.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={linkTextStyles}
                >
                  Explore contests platform →
                </a>
              </div>
            </div>
            </RevealSection>
          </div>

          <div className="h-16 sm:h-24"></div>
        </div>
      </div>
      {/* End Hero */}
      {/* Wave transition: wrapper bg = next section top color, SVG path = hero bottom color */}
      <div className="overflow-hidden leading-[0] bg-white dark:bg-[#2a1208] pointer-events-none">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20 block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,80 C300,80 400,0 600,0 C800,0 900,80 1200,80 L1200,0 L0,0 Z"
            className="fill-gray-50 dark:fill-[#160f08]"
          />
        </svg>
      </div>
      <div className="relative bg-gradient-to-b from-white via-orange-100 to-orange-50 dark:bg-gradient-to-b dark:from-[#2a1208] dark:via-[#3a1d0f] dark:to-[#2d170c] transition-colors duration-500">
        {/* Stars System Section 
        <div className="pt-16 md:pt-24">
          <div className={containerClasses}>
            <h2 className="justify-center items-center mx-auto flex flex-col text-6xl font-bold pb-3 dark:text-orange-50/90">
              ⭐ Earn Stars, Unlock Rewards
            </h2>
            <p className={classNames(subtextClasses, 'text-center mx-auto mt-4')}>
              Earn stars as you progress through USAMO Guide. Get 5 stars for completing each page and 1 star for every problem you solve. Collect stars and redeem them in our shop for exclusive rewards and perks.
            </p>
            <div className="h-12 md:h-20"></div>
            <div className="flex justify-center">
              <div className="border-4 border-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,146,60,0.4)]">
                <img
                  src="/images/starbg.jpg"
                  alt="Earn stars and unlock rewards"
                  className="w-full object-cover block"
                />
              </div>
            </div>
          </div>
        </div>*/}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]">
            <svg
              className="h-full w-full opacity-[0.08] dark:opacity-[0.2]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="learn-section-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-orange-400/60 dark:text-orange-500/80" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#learn-section-grid-pattern)" />
            </svg>
          </div>
        </div>

        <div className="h-12 sm:h-20 md:h-36 2xl:h-48"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-900/20 blur-[150px] rounded-full pointer-events-none" />

        <div className={containerClasses}>
          <RevealSection>
            <h2 className="justify-center items-center mx-auto flex flex-col text-6xl font-bold pb-3 dark:text-orange-50/90">
              Learn Contest Math
            </h2>
            <p className={classNames(subtextClasses, 'text-center mx-auto !w-2/4')}>
              Carefully designed for math contest students - available to everyone,
              for free.
            </p>
          </RevealSection>

          <div className="h-12 md:h-20 2xl:h-36"></div>
          <RevealSection delay={100}>
          <div className="grid gap-6 lg:grid-cols-2">
            <Feature
              iconSrc="/images/feature-resources.png"
              iconFallbackSrc="https://i.ibb.co/TD2gjPwB/feature-resources.png"
              iconAlt="Resources icon"
              iconClasses="from-black to-black"
              title="Curated Resources"
              blobClasses="bg-orange-200 dark:bg-orange-800 hidden xl:block"
              feature={<ResourcesFeature />}
              fade="none"
            >
              Learn new topics from a vetted list of high-quality resources. If
              one resource doesn't click, look at another!
              <span className="mt-3 block">
                <Link to="/foundations" className={linkTextStyles}>
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
              Practice each topic with extensive problemsets and solutions
              covering a wide range of difficulties.
              <span className="mt-3 block">
                <Link to="/problems" className={linkTextStyles}>
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
              blobClasses="bg-orange-200 dark:bg-orange-800"
              feature={<ProgressTrackingFeature />}
              fade="none"
            >
              Use our progress-tracking tools to track your progress in the Guide
              and stay motivated.
              <span className="mt-3 block">
                <Link to="/dashboard" className={linkTextStyles}>
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
                <div className="rounded-lg shadow-lg">
                  <StaticImage
                    src="../assets/aops_banner.png"
                    alt="AoPS Community Screenshot"
                    placeholder="blurred"
                    layout="constrained"
                    width={560}
                  />
                </div>
              }
              fade="none"
            >
              <span className="mb-4 block md:mb-8">
                Ask questions, share solutions, and learn from other contest
                students in the AoPS community.
              </span>

              <a
                href="https://artofproblemsolving.com/community"
                target="_blank"
                rel="noreferrer"
                className={linkTextStyles}
              >
                Visit AoPS Community →
              </a>
            </Feature>
          </div>
          </RevealSection>

          <div className="h-16 md:h-20 2xl:h-36"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-[#2d170c] opacity-90 blur-2xl dark:block" />
        </div>
      </div>

      <ActiveCardsHome/>

      

      <div className="relative bg-gradient-to-b from-orange-50 to-gray-100 dark:bg-none dark:bg-gradient-to-b dark:[background:linear-gradient(to_bottom,rgba(232,93,4,0.18)_0%,rgba(20,12,5,1)_60%,rgba(15,10,5,1)_100%)]">
        <div className="relative z-10">
          <div className="h-15 md:h-20"></div>
          <div className={containerClasses}>
            <RevealSection>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className={classNames(
                    headerClassesNoText,
                    'text-left text-4xl md:text-5xl 2xl:text-6xl text-gray-900 dark:text-orange-100'
                  )}
                >
                  Join our Team.
                </h2>
                <div className="h-5"></div>
                <p className="max-w-2xl text-left text-lg leading-relaxed text-gray-700 md:text-xl dark:text-orange-100/75">
                  USAMO Guide is a student-run community dedicated to olympiad
                  mathematics. Join us to write lessons, curate problem sets,
                  and grow as a mentor alongside fellow contest enthusiasts.
                </p>
                <div className="h-7 md:h-9"></div>
                <a
                  href="https://docs.google.com/document/d/1AUNOq6OlVcSZN_gUPfvyhimlh9hA4GNvNaLdzyflX_8/edit?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="shine-effect inline-flex items-center rounded-full border-orange-600 bg-linear-to-br from-orange-300 to-orange-400 px-7 py-3 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(251,146,60,0.4)]"
                >
                  Apply Now
                </a>
              </div>
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-orange-200/70 bg-white/70 shadow-sm dark:border-orange-500/20 dark:bg-[#15100c]/65">
                  <img
                    src="/images/builders.png"
                    alt="USAMO Guide team collaboration"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            </RevealSection>
          </div>
          <div className="h-15 md:h-20"></div>
        </div>
      </div>

      {/* Begin FAQ */}
      <div className="relative bg-white dark:[background:linear-gradient(to_bottom,rgba(15,10,5,1)_0%,rgba(18,12,7,1)_100%)]">

        <div className="relative z-10 mx-auto max-w-(--breakpoint-xl) px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-28">
          <RevealSection>
          <h2 className={classNames(headerClasses, 'dark:text-gray-100 text-center')}>
            Frequently asked questions
          </h2>
          </RevealSection>
          <div className="pt-10 md:pt-16">
            <RevealSection delay={100}>
            <dl className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-2 md:gap-8">
              <div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-orange-500/20 dark:bg-[#1a130d]/75">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    What are AMC, AIME, and USAMO?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
                      The AMC (8/10/12) and AIME are the main pipeline contests
                      in the U.S. that culminate in USAMO. For official contest
                      information and schedules, see the{' '}
                      <a
                        href="https://www.maa.org/math-competitions"
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-600 underline dark:text-orange-400"
                      >
                        MAA competitions page
                      </a>
                      .
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-orange-500/20 dark:bg-[#1a130d]/75">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Is this an official syllabus?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
                      No. This guide is a community-curated roadmap that
                      reflects common contest topics and problem-solving
                      techniques. It does not represent an official syllabus.
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-orange-500/20 dark:bg-[#1a130d]/75">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    How do I report a problem or ask a question?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
                      If you encounter an issue while using the guide (website
                      bug, typo, broken link, unclear explanation, etc), use the
                      "Contact Us" button. Alternatively, email us at{' '}
                      <a
                        href="mailto:contact@usamoguide.com"
                        className="text-orange-600 underline dark:text-orange-400"
                      >
                        contact@usamoguide.com
                      </a>
                      .
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-orange-500/20 dark:bg-[#1a130d]/75">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    I'm looking for classes, club curriculum...
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
                      Check out AoPS classes and community-led study groups, or
                      join the USAMO Guide study cohorts.
                    </p>
                  </dd>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-orange-500/20 dark:bg-[#1a130d]/75">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Is this guide only for USAMO qualifiers?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
                      Not at all. The guide is designed to support AMC 8, AMC
                      10/12, and AIME learners to reach USAMO.
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-orange-500/20 dark:bg-[#1a130d]/75">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    How can I get help?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
                      If you get stuck, ask questions in the{' '}
                      <a
                        href="https://artofproblemsolving.com/community"
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-600 underline dark:text-orange-400"
                      >
                        AoPS community
                      </a>{' '}
                      or reach out via the Contact Us button.
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-orange-500/20 dark:bg-[#1a130d]/75">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    How can I contribute?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
                      Contributions are welcome! Visit our{' '}
                      <a
                        href="https://github.com/usamoguide/usamo-guide"
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-600 underline dark:text-orange-400"
                      >
                        GitHub repository
                      </a>
                      to find guidelines and open issues.
                    </p>
                  </dd>
                </div>
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-orange-500/20 dark:bg-[#1a130d]/75">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Is this open source?
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
                      Yes! Check out our{' '}
                      <a
                        href="https://github.com/usamoguide/usamo-guide"
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-600 underline dark:text-orange-400"
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

      <div className="dark:[background:linear-gradient(to_bottom,rgba(18,12,7,1)_0%,rgba(13,10,7,1)_100%)]">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-12">
          <p className="dark:text-dark-med-emphasis text-center text-base leading-6 text-gray-400">
            &copy; {new Date().getFullYear()} USAMO Guide.
            <br />
            No part of this website may be reproduced or commercialized in any
            manner without prior written permission.{' '}
            <Link to="/license" className="underline">
              Learn More.
            </Link>
            {' | '}
            <Link to="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            {' | '}
            <Link to="/terms-of-service" className="underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
