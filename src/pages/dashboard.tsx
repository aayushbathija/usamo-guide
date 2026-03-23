import { graphql, Link, PageProps } from 'gatsby';
import * as React from 'react';
import { SECTION_LABELS } from '../../content/ordering';
import ActiveItems, { ActiveItem } from '../components/Dashboard/ActiveItems';
import Activity from '../components/Dashboard/Activity';
import DailyStreak from '../components/Dashboard/DailyStreak';
import Card from '../components/Dashboard/DashboardCard';
import WelcomeBackBanner from '../components/Dashboard/WelcomeBackBanner';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar';
import { useSignIn } from '../context/SignInContext';
import { useLastVisitInfo } from '../context/UserDataContext/properties/lastVisit';
import {
  useLastViewedModule,
  useShowIgnoredSetting,
} from '../context/UserDataContext/properties/simpleProperties';
import {
  useUserProgressOnModules,
  useUserProgressOnProblems,
} from '../context/UserDataContext/properties/userProgress';
import { useCurrentUser } from '../context/UserDataContext/UserDataContext';
import {
  useModulesProgressInfo,
  useProblemsProgressInfo,
} from '../utils/getProgressInfo';

export default function DashboardPage(props: PageProps) {
  const { modules, problems } = props.data as any;
  const moduleInfoById = modules.edges.reduce((acc, cur) => {
    const id = cur.node.frontmatter.id;
    const division = cur.node.fields?.division;
    if (!id || !division) return acc;
    acc[id] = {
      title: cur.node.frontmatter.title,
      section: division,
      url: `/${division}/${id}`,
    };
    return acc;
  }, {});
  const problemIDMap = React.useMemo(() => {
    // 1. problems in modules
    const res = problems.edges.reduce((acc, cur) => {
      const problem = cur.node;
      // ignore problems that don't have an associated module (extraProblems.json)
      if (problem.module) {
        const moduleId = problem.module.frontmatter.id;
        const moduleInfo = moduleInfoById[moduleId];
        if (!moduleInfo) {
          return acc;
        }
        if (!(problem.uniqueId in acc)) {
          acc[problem.uniqueId] = {
            label: `${problem.source}: ${problem.name}`,
            modules: [],
          };
        }
        acc[problem.uniqueId].modules.push({
          url: `${moduleInfo.url}/#problem-${problem.uniqueId}`,
          moduleId,
        });
      }
      return acc;
    }, {});

    return res;
  }, [problems, moduleInfoById]);
  const lastViewedModuleID = useLastViewedModule();
  const userProgressOnModules = useUserProgressOnModules();
  const userProgressOnProblems = useUserProgressOnProblems();
  const currentUser = useCurrentUser();
  const { consecutiveVisits } = useLastVisitInfo();
  const showIgnored = useShowIgnoredSetting();
  const { signIn } = useSignIn();

  const lastViewedModuleURL = moduleInfoById[lastViewedModuleID]?.url;
  const activeModules: ActiveItem[] = React.useMemo(() => {
    return Object.keys(userProgressOnModules)
      .filter(
        x =>
          (userProgressOnModules[x] === 'Reading' ||
            userProgressOnModules[x] === 'Practicing' ||
            userProgressOnModules[x] === 'Skipped' ||
            (showIgnored && userProgressOnModules[x] === 'Ignored')) &&
          moduleInfoById.hasOwnProperty(x)
      )
      .map(x => ({
        label: `${SECTION_LABELS[moduleInfoById[x].section]}: ${moduleInfoById[x].title}`,
        url: moduleInfoById[x].url,
        status: userProgressOnModules[x] as
          | 'Skipped'
          | 'Reading'
          | 'Practicing'
          | 'Ignored',
      }));
  }, [userProgressOnModules, showIgnored, moduleInfoById]);
  const activeProblems: ActiveItem[] = React.useMemo(() => {
    return Object.keys(userProgressOnProblems)
      .filter(
        x =>
          (userProgressOnProblems[x] === 'Reviewing' ||
            userProgressOnProblems[x] === 'Solving' ||
            userProgressOnProblems[x] === 'Skipped' ||
            (showIgnored && userProgressOnProblems[x] === 'Ignored')) &&
          problemIDMap.hasOwnProperty(x)
      )
      .map(x => ({
        label: problemIDMap[x].label,
        url: problemIDMap[x].modules[0].url,
        status: userProgressOnProblems[x] as
          | 'Reviewing'
          | 'Solving'
          | 'Skipped'
          | 'Ignored',
      }));
  }, [userProgressOnProblems, showIgnored]);

  const lastViewedSection =
    moduleInfoById[lastViewedModuleID]?.section || 'foundations';
  const moduleProgressIDs = Object.keys(moduleInfoById).filter(
    x => moduleInfoById[x].section === lastViewedSection
  );
  const allModulesProgressInfo = useModulesProgressInfo(moduleProgressIDs);

  const problemStatisticsIDs = React.useMemo(() => {
    return Object.keys(problemIDMap).filter(problemID =>
      problemIDMap[problemID].modules.some(
        (module: { url: string; moduleId: string }) =>
          moduleInfoById[module.moduleId]?.section === lastViewedSection
      )
    );
  }, [problemIDMap, lastViewedSection, moduleInfoById]);
  const allProblemsProgressInfo = useProblemsProgressInfo(problemStatisticsIDs);

  const [finishedRendering, setFinishedRendering] = React.useState(false);
  React.useEffect(() => {
    setFinishedRendering(true);
  }, []);

  const renderStatsTile = (
    title: string,
    total: number,
    counts: {
      completed: number;
      inProgress: number;
      skipped: number;
      notStarted: number;
    }
  ) => {
    const percentComplete = total === 0 ? 0 : Math.round((counts.completed / total) * 100);
    const segment = (value: number) => (total === 0 ? 0 : (value / total) * 100);

    return (
      <Card>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="dark:text-dark-high-emphasis text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {total} total
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 px-4 py-3 text-center dark:bg-gray-700">
              <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {percentComplete}%
              </div>
              <div className="text-xs font-medium uppercase text-gray-500 dark:text-gray-300">
                Complete
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 dark:bg-green-700" />
                Completed
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {counts.completed}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 dark:bg-yellow-700" />
                In progress
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {counts.inProgress}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500 dark:bg-blue-700" />
                Skipped
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {counts.skipped}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                Not started
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {counts.notStarted}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                style={{ width: `${segment(counts.completed)}%` }}
                className="h-2 bg-green-500 dark:bg-green-700"
              />
              <div
                style={{ width: `${segment(counts.inProgress)}%` }}
                className="h-2 bg-yellow-400 dark:bg-yellow-700"
              />
              <div
                style={{ width: `${segment(counts.skipped)}%` }}
                className="h-2 bg-blue-500 dark:bg-blue-700"
              />
              <div
                style={{ width: `${segment(counts.notStarted)}%` }}
                className="h-2 bg-gray-300 dark:bg-gray-600"
              />
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Layout>
      <SEO title="Dashboard" image={null} pathname={props.path} />

      <div
        className="ui-page min-h-screen"
        style={{
          '--ui-page-bg-image': 'url(/images/math-doodles.png)',
        } as React.CSSProperties}
      >
        <TopNavigationBar linkLogoToIndex={true} redirectToDashboard={false} />

        {finishedRendering && (
          <main className="pb-12">
            <div className="mx-auto mb-4 max-w-screen-2xl">
              <div className="pt-4 pb-6 lg:px-4">
                <div className="mb-4 flex flex-wrap">
                  <div className="w-full text-center">
                    {currentUser ? (
                      <>
                        Signed in as <i>{currentUser.email}</i>.
                      </>
                    ) : (
                      <span>
                        Not signed in.{' '}
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            signIn();
                          }}
                          className="text-blue-600 underline dark:text-blue-300"
                        >
                          Sign in now!
                        </a>{' '}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mb-8 max-w-screen-2xl px-4 sm:px-6 lg:px-4">
              <div className="grid gap-8 lg:grid-cols-3">
                <section className="lg:col-span-2">
                  <h1 className="dark:text-dark-high-emphasis text-3xl leading-tight font-bold text-gray-900">
                    Activity
                  </h1>
                  <Activity />
                </section>
                <section className="lg:col-span-1">
                  <h2 className="dark:text-dark-high-emphasis text-2xl leading-tight font-bold text-gray-900">
                    Active items
                  </h2>
                  <div className="mt-4 space-y-6">
                    {activeProblems.length > 0 && (
                      <ActiveItems type="problems" items={activeProblems} />
                    )}
                    {activeModules.length > 0 && (
                      <ActiveItems type="modules" items={activeModules} />
                    )}
                    {activeProblems.length === 0 && activeModules.length === 0 && (
                      <Card>
                        <div className="px-4 py-5 text-sm text-gray-600 sm:p-6 dark:text-gray-400">
                          No active problems or modules yet.
                        </div>
                      </Card>
                    )}
                  </div>
                </section>
              </div>
              <div className="mt-6 flex">
                <Link
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-800 px-5 py-3 text-base font-medium text-white transition hover:bg-blue-600 dark:hover:bg-blue-700"
                  to={
                    lastViewedModuleURL ||
                    '/foundations/arithmetic-nt-basics'
                  }
                >
                  {lastViewedModuleURL
                    ? `Continue: ${moduleInfoById[lastViewedModuleID]?.title}`
                    : 'Continue: Arithmetic and Number Theory Basics!'}
                </Link>
              </div>
            </div>
            <header>
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-4">
                <h1 className="dark:text-dark-high-emphasis text-3xl leading-tight font-bold text-gray-900">
                  Statistics
                </h1>
              </div>
            </header>
            <div className="mx-auto max-w-screen-2xl">
              <div className="space-y-8 py-4 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 lg:px-4">
                <div className="space-y-8">
                  {renderStatsTile(
                    `Modules Progress - ${SECTION_LABELS[lastViewedSection]}`,
                    moduleProgressIDs.length,
                    allModulesProgressInfo
                  )}
                </div>
                <div className="space-y-8">
                  {renderStatsTile(
                    `Problems Progress - ${SECTION_LABELS[lastViewedSection]}`,
                    Object.keys(problemStatisticsIDs).length,
                    allProblemsProgressInfo
                  )}
                </div>
                <DailyStreak streak={consecutiveVisits} />
              </div>
            </div>
          </main>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    modules: allXdm(
      filter: {
        fileAbsolutePath: { regex: "/content/" }
        fields: { division: { ne: null } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            id
          }
          fields {
            division
          }
        }
      }
    }
    problems: allProblemInfo {
      edges {
        node {
          uniqueId
          name
          source
          module {
            frontmatter {
              id
            }
          }
        }
      }
    }
  }
`;
