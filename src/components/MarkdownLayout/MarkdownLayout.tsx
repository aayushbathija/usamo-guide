import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { useContext, useState } from 'react';
import ConfettiContext from '../../context/ConfettiContext';
import MarkdownLayoutContext from '../../context/MarkdownLayoutContext';
import {
  ProblemSolutionContext,
  type ProblemSolutionContextValue,
} from '../../context/ProblemSolutionContext';
import { ProblemSuggestionModalProvider } from '../../context/ProblemSuggestionModalContext';
import {
  useSetProgressOnModule,
  useUserProgressOnModules,
} from '../../context/UserDataContext/properties/userProgress';
import { ModuleInfo } from '../../models/module';
import { SolutionInfo } from '../../models/solution';
import ForumCTA from '../ForumCTA';
import DesktopSidebar from './DesktopSidebar';
import MobileAppBar from './MobileAppBar';
import MobileSideNav from './MobileSideNav';
import ModuleHeaders from './ModuleHeaders/ModuleHeaders';
import ModuleProgressUpdateBanner from './ModuleProgressUpdateBanner';
import NavBar from './NavBar';
import NotSignedInWarning from './NotSignedInWarning';
import TableOfContentsBlock from './TableOfContents/TableOfContentsBlock';
import TableOfContentsSidebar from './TableOfContents/TableOfContentsSidebar';

const ContentContainer = ({ children, tableOfContents }) => (
  <main
    className="relative overflow-x-hidden pt-6 focus:outline-hidden lg:pt-2 2xl:h-screen 2xl:overflow-hidden"
    tabIndex={0}
  >
    <div className="mx-auto">
      <div className="flex justify-center">
        {/* Placeholder for the sidebar */}
        <div
          className="order-1 hidden shrink-0 lg:block"
          style={{ width: '20rem' }}
        />
        <div className="order-3 hidden w-72 shrink-0 2xl:flex 2xl:items-center 2xl:justify-center">
          <div className="w-full px-3">
            <TableOfContentsSidebar tableOfContents={tableOfContents} />
          </div>
        </div>
        <div className="order-2 w-0 max-w-6xl min-w-0 flex-1 overflow-x-auto px-4 sm:px-6 lg:px-8 2xl:max-h-screen 2xl:overflow-y-auto">
          <div className="hidden lg:block">
            <NavBar />
            <div className="h-8" />
          </div>

          {children}

          <div className="pt-4 pb-6">
            <NavBar alignNavButtonsRight={false} />
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default function MarkdownLayout({
  markdownData,
  children,
  /** When `markdownData` is a solution page, pass this or wrap with ProblemSolutionProvider. */
  problemSolution,
}: {
  markdownData: ModuleInfo | SolutionInfo;
  children: React.ReactNode;
  problemSolution?: ProblemSolutionContextValue | null;
}) {
  const userProgressOnModules = useUserProgressOnModules();
  const setModuleProgress = useSetProgressOnModule();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const moduleProgress =
    (userProgressOnModules && userProgressOnModules[markdownData.id]) ||
    'Not Started';

  const tocEntries = markdownData.toc ?? {};
  const tableOfContents =
    tocEntries.cpp ||
    tocEntries.java ||
    tocEntries.py ||
    Object.values(tocEntries)[0] ||
    [];

  const data = useStaticQuery(graphql`
    query {
      allXdm(
        filter: {
          fileAbsolutePath: { regex: "/content/" }
          fields: { division: { ne: null } }
        }
      ) {
        nodes {
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
  `);
  const moduleLinks = React.useMemo(() => {
    return data.allXdm.nodes
      .filter(cur => cur.fields?.division)
      .map(cur => ({
        id: cur.frontmatter.id,
        title: cur.frontmatter.title ?? cur.frontmatter.id,
        section: cur.fields.division,
        url: `/${cur.fields.division}/${cur.frontmatter.id}`,
      }));
  }, [data.allXdm]);
  const showConfetti = useContext(ConfettiContext);
  const handleCompletionChange = progress => {
    if (moduleProgress === progress) return;
    setModuleProgress(markdownData.id, progress);
    if (
      moduleProgress !== 'Complete' &&
      (progress === 'Practicing' || progress === 'Complete')
    ) {
      showConfetti!();
    }
  };

  const problemSolutionFromTree = useContext(ProblemSolutionContext);
  const solutionLayoutContext: ProblemSolutionContextValue | null =
    markdownData instanceof SolutionInfo
      ? problemSolution ?? problemSolutionFromTree
      : null;

  if (markdownData instanceof SolutionInfo && !solutionLayoutContext) {
    throw new Error(
      'MarkdownLayout: solution pages need `problemSolution={...}` or an ancestor ProblemSolutionProvider'
    );
  }

  let activeIDs: string[] = [];
  if (markdownData instanceof ModuleInfo) {
    activeIDs.push(markdownData.id);
  } else {
    activeIDs = solutionLayoutContext!.modulesThatHaveProblem.map(x => x.id);
  }

  const layoutTree = (
    <MarkdownLayoutContext.Provider
      value={{
        markdownLayoutInfo: markdownData,
        sidebarLinks: moduleLinks,
        activeIDs,
        uniqueID: null, // legacy, remove when classes is removed
        isMobileNavOpen,
        setIsMobileNavOpen,
        moduleProgress,
        handleCompletionChange,
      }}
    >
      <ProblemSuggestionModalProvider>
        <MobileSideNav />
        <DesktopSidebar />

        <div className="w-full">
          <MobileAppBar />

          <ContentContainer tableOfContents={tableOfContents}>
            <NotSignedInWarning />

            <ModuleHeaders moduleLinks={moduleLinks} />

            <div className={tableOfContents.length > 1 ? '2xl:hidden' : ''}>
              <TableOfContentsBlock tableOfContents={tableOfContents} />
            </div>

            {children}

            <ModuleProgressUpdateBanner />

            <ForumCTA />

            {/*<div className="my-8">*/}
            {/*  <ModuleFeedback markdownData={markdownData} />*/}
            {/*</div>*/}
          </ContentContainer>
        </div>
      </ProblemSuggestionModalProvider>
    </MarkdownLayoutContext.Provider>
  );

  if (markdownData instanceof SolutionInfo && problemSolution) {
    return (
      <ProblemSolutionContext.Provider value={problemSolution}>
        {layoutTree}
      </ProblemSolutionContext.Provider>
    );
  }

  return layoutTree;
}
