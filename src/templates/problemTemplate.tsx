import { graphql, Link, PageProps } from 'gatsby';
import * as React from 'react';
import DifficultyBox from '../components/DifficultyBox';
import Layout from '../components/layout';
import ProblemStatementMarkdown from '../components/ProblemPage/ProblemStatementMarkdown';
import ProblemStatusCheckbox from '../components/markdown/ProblemsList/ProblemStatusCheckbox';
import SEO from '../components/seo';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar';
import { ConfettiProvider } from '../context/ConfettiContext';
import {
  probSources,
  ProblemDifficulty,
  ProblemInfo,
} from '../models/problem';

type ProblemTemplateData = {
  allProblemInfo: {
    nodes: ProblemTemplateNode[];
  };
};

type ProblemTemplateNode = {
  uniqueId: string;
  name: string;
  url: string;
  source: string;
  sourceDescription: string | null;
  difficulty: string | null;
  isStarred: boolean;
  tags: string[];
  statement: string | null;
  author: string | null;
  interaction: {
    type: string;
    correct: string | null;
    choices: readonly string[] | null;
    correctIndex: number | null;
  };
  solutionReveal: {
    mode: string;
    url: string | null;
    markdown: string | null;
  };
  solution: ProblemInfo['solution'] | null;
  module: {
    frontmatter: { id: string; title: string };
    fields: { division: string } | null;
  } | null;
};

function graphqlInteraction(
  i: ProblemTemplateNode['interaction']
): ProblemInfo['interaction'] {
  if (i.type === 'integer' && i.correct != null) {
    return { type: 'integer', correct: i.correct };
  }
  if (
    i.type === 'mcq' &&
    i.choices &&
    i.correctIndex != null &&
    i.correctIndex >= 0 &&
    i.correctIndex < i.choices.length
  ) {
    return {
      type: 'mcq',
      choices: [...i.choices],
      correctIndex: i.correctIndex,
    };
  }
  return { type: 'none' };
}

function graphqlSolutionReveal(
  r: ProblemTemplateNode['solutionReveal'],
  fallbackUrl: string
): ProblemInfo['solutionReveal'] {
  if (r.mode === 'inline' && r.markdown?.trim()) {
    return { mode: 'inline', markdown: r.markdown };
  }
  return { mode: 'external', url: r.url ?? fallbackUrl };
}

function templateNodeToProblemInfo(node: ProblemTemplateNode): ProblemInfo {
  return {
    uniqueId: node.uniqueId,
    name: node.name,
    url: node.url,
    source: node.source,
    sourceDescription: node.sourceDescription ?? undefined,
    difficulty: (node.difficulty ?? 'N/A') as ProblemDifficulty,
    isStarred: node.isStarred,
    tags: [...node.tags],
    solution: node.solution as ProblemInfo['solution'],
    statement: node.statement ?? undefined,
    author: node.author ?? undefined,
    interaction: graphqlInteraction(node.interaction),
    solutionReveal: graphqlSolutionReveal(node.solutionReveal, node.url),
  };
}

function answersMatch(user: string, correct: string): boolean {
  const u = user.trim();
  const c = correct.trim();
  if (u === c) return true;
  const nu = Number(u);
  const nc = Number(c);
  if (!Number.isNaN(nu) && !Number.isNaN(nc) && nu === nc) return true;
  return false;
}

const MIDNIGHT = '#120F24';
const MIDNIGHT_DEEP = '#0A0818';
const VANILLA = '#F4EDEA';
const TEXT_SECONDARY = 'rgba(244, 237, 234, 0.74)';
const MAUVE = '#F0C2FF';
const PURPLE = '#70428A';
const BORDER = 'rgba(240, 194, 255, 0.20)';
const BORDER_STRONG = 'rgba(240, 194, 255, 0.30)';

export default function ProblemTemplate(
  props: PageProps<ProblemTemplateData, { uniqueId: string }>
): JSX.Element {
  const node = props.data.allProblemInfo.nodes[0];
  const [solutionOpen, setSolutionOpen] = React.useState(false);
  const [integerInput, setIntegerInput] = React.useState('');
  const [mcqIndex, setMcqIndex] = React.useState<number | null>(null);
  const [checkResult, setCheckResult] = React.useState<
    'idle' | 'correct' | 'incorrect'
  >('idle');

  if (!node) {
    return (
      <Layout>
        <SEO title="Problem not found" image={null} pathname={props.path} />
        <div className="ui-page min-h-screen">
          <TopNavigationBar />
          <main className="mx-auto max-w-3xl px-4 py-16">
            <p className="text-gray-600 dark:text-gray-400">Problem not found.</p>
            <Link to="/problems/" className="mt-4 inline-block text-blue-600">
              All problems
            </Link>
          </main>
        </div>
      </Layout>
    );
  }

  const problem = templateNodeToProblemInfo(node);
  const sourceTooltip =
    node.sourceDescription ||
    (probSources[node.source as keyof typeof probSources]?.[1] ?? null);

  const runCheck = () => {
    if (problem.interaction.type === 'integer') {
      setCheckResult(
        answersMatch(integerInput, problem.interaction.correct)
          ? 'correct'
          : 'incorrect'
      );
    } else if (problem.interaction.type === 'mcq') {
      if (mcqIndex === null) {
        setCheckResult('incorrect');
        return;
      }
      setCheckResult(
        mcqIndex === problem.interaction.correctIndex ? 'correct' : 'incorrect'
      );
    }
  };

  return (
    <Layout>
      <SEO
        title={`${node.name} — ${node.source}`}
        image={null}
        pathname={props.path}
      />
      <div
        data-page-tone="dark"
        className="ui-page relative min-h-screen overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT} 0%, ${MIDNIGHT_DEEP} 100%)`,
          color: VANILLA,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(191,128,255,0.10),transparent_36%),radial-gradient(circle_at_18%_84%,rgba(112,66,138,0.12),transparent_36%),linear-gradient(180deg,rgba(10,8,24,0.22),rgba(12,10,28,0.56)_70%,rgba(6,5,16,0.85))]" />
        <TopNavigationBar />
        <main className="relative mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm" style={{ color: TEXT_SECONDARY }}>
            <Link
              to="/problems/"
              className="transition-opacity hover:opacity-85"
              style={{ color: MAUVE }}
            >
              Problems
            </Link>
            <span className="mx-2">/</span>
            <span style={{ color: VANILLA }}>{node.name}</span>
          </nav>

          <header
            className="mb-8 rounded-2xl pb-6 shadow-lg"
            style={{
              border: '1px solid rgba(229, 194, 255, 0.12)',
              background: 'linear-gradient(180deg, rgba(54, 37, 72, 0.9) 0%, rgba(31, 22, 42, 0.94) 100%)',
            }}
          >
            <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: VANILLA }}>
              {node.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium" style={{ color: MAUVE }}>
                {sourceTooltip ? (
                  <span title={sourceTooltip}>{node.source}</span>
                ) : (
                  node.source
                )}
              </span>
              {node.author ? (
                <>
                  <span style={{ color: TEXT_SECONDARY }}>·</span>
                  <span style={{ color: TEXT_SECONDARY }}>
                    {node.author}
                  </span>
                </>
              ) : null}
              <DifficultyBox
                difficulty={(node.difficulty ?? 'N/A') as ProblemDifficulty}
              />
            </div>
            {node.module?.frontmatter?.id && node.module.fields?.division ? (
              <p className="mt-3 text-sm" style={{ color: TEXT_SECONDARY }}>
                From module{' '}
                <Link
                  className="hover:underline"
                  style={{ color: MAUVE }}
                  to={`/${node.module.fields.division}/${node.module.frontmatter.id}/`}
                >
                  {node.module.frontmatter.title}
                </Link>
              </p>
            ) : null}
            <div className="mt-4">
              <ConfettiProvider>
                <ProblemStatusCheckbox problem={problem} size="large" />
              </ConfettiProvider>
            </div>
            </div>
          </header>

          <section className="mb-10" aria-labelledby="problem-statement">
            <h2
              id="problem-statement"
              className="mb-4 text-lg font-semibold"
              style={{ color: VANILLA }}
            >
              Problem
            </h2>
            <ProblemStatementMarkdown>{node.statement}</ProblemStatementMarkdown>
          </section>

          {problem.interaction.type === 'integer' && (
            <section
              className="mb-10"
              aria-label="Submit numeric answer"
            >
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: TEXT_SECONDARY }}
              >
                Your answer
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  inputMode="decimal"
                  value={integerInput}
                  onChange={e => {
                    setIntegerInput(e.target.value);
                    setCheckResult('idle');
                  }}
                  className="ui-input max-w-xs rounded-md px-3 py-2"
                  style={{
                    borderColor: BORDER_STRONG,
                    background: 'rgba(14, 11, 31, 0.72)',
                    color: VANILLA,
                  }}
                  placeholder="Enter a number"
                />
                <button
                  type="button"
                  onClick={runCheck}
                  className="purple-motion-effect inline-flex items-center justify-center rounded-full px-6 py-2 font-mono text-sm font-bold leading-tight"
                  style={{
                    border: '1px solid rgba(240, 194, 255, 0.34)',
                    background: 'linear-gradient(135deg, #5A2F87 0%, #C58BFF 100%)',
                    '--pme-color': '#F4EDEA',
                    '--pme-hover-color': '#201C36',
                    '--pme-wipe-bg': '#F0C2FF',
                  } as React.CSSProperties}
                >
                  Check
                </button>
              </div>
              {checkResult === 'correct' && (
                <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                  Correct.
                </p>
              )}
              {checkResult === 'incorrect' && (
                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                  Not quite — try again.
                </p>
              )}
            </section>
          )}

          {problem.interaction.type === 'mcq' && (
            <section className="mb-10" aria-label="Multiple choice">
              <p className="mb-3 text-sm font-medium" style={{ color: TEXT_SECONDARY }}>
                Select an answer
              </p>
              <ul className="space-y-2">
                {problem.interaction.choices.map((choice, i) => (
                  <li key={i}>
                    <label
                      className="flex cursor-pointer items-start gap-2 rounded-2xl px-3 py-2 shadow-lg"
                      style={{
                        border: '1px solid rgba(229, 194, 255, 0.12)',
                        background: 'linear-gradient(180deg, rgba(54, 37, 72, 0.9) 0%, rgba(31, 22, 42, 0.94) 100%)',
                      }}
                    >
                      <input
                        type="radio"
                        name="mcq"
                        checked={mcqIndex === i}
                        onChange={() => {
                          setMcqIndex(i);
                          setCheckResult('idle');
                        }}
                        className="mt-1"
                      />
                      <span style={{ color: VANILLA }}>
                        {choice}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={runCheck}
                className="mt-4 rounded-md px-4 py-2 text-sm font-medium transition hover:opacity-95"
                style={{
                  backgroundColor: PURPLE,
                  color: VANILLA,
                  border: `1px solid ${BORDER_STRONG}`,
                }}
              >
                Check
              </button>
              {checkResult === 'correct' && (
                <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                  Correct.
                </p>
              )}
              {checkResult === 'incorrect' && (
                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                  Not quite — try again.
                </p>
              )}
            </section>
          )}

          <section className="mb-10" aria-label="Solution">
            {problem.solutionReveal.mode === 'external' &&
            problem.solutionReveal.url ? (
              <a
                href={problem.solutionReveal.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="purple-motion-effect inline-flex items-center justify-center rounded-full px-6 py-2.5 font-mono text-sm font-bold leading-tight"
                style={{
                  border: '1px solid rgba(240, 194, 255, 0.34)',
                  background: 'linear-gradient(135deg, #5A2F87 0%, #C58BFF 100%)',
                  '--pme-color': '#F4EDEA',
                  '--pme-hover-color': '#201C36',
                  '--pme-wipe-bg': '#F0C2FF',
                } as React.CSSProperties}
              >
                Show me the solution
                <svg
                  className="ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            ) : problem.solutionReveal.mode === 'inline' ? (
              <>
                <button
                  type="button"
                  onClick={() => setSolutionOpen(o => !o)}
                  className="purple-motion-effect inline-flex items-center justify-center rounded-full px-6 py-2.5 font-mono text-sm font-bold leading-tight"
                  style={{
                    border: '1px solid rgba(240, 194, 255, 0.34)',
                    background: 'linear-gradient(135deg, #5A2F87 0%, #C58BFF 100%)',
                    '--pme-color': '#F4EDEA',
                    '--pme-hover-color': '#201C36',
                    '--pme-wipe-bg': '#F0C2FF',
                  } as React.CSSProperties}
                >
                  {solutionOpen ? 'Hide solution' : 'Show me the solution'}
                </button>
                {solutionOpen && (
                  <div
                    className="mt-6 rounded-2xl p-4 shadow-lg"
                    style={{
                      border: '1px solid rgba(229, 194, 255, 0.12)',
                      background: 'linear-gradient(180deg, rgba(54, 37, 72, 0.9) 0%, rgba(31, 22, 42, 0.94) 100%)',
                    }}
                  >
                    <ProblemStatementMarkdown>
                      {problem.solutionReveal.markdown}
                    </ProblemStatementMarkdown>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
                No solution is configured for this problem yet.
              </p>
            )}
          </section>

          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            <Link to="/problems/" className="hover:underline" style={{ color: MAUVE }}>
              ← Back to all problems
            </Link>
          </p>
        </main>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ProblemTemplate($uniqueId: String!) {
    allProblemInfo(filter: { uniqueId: { eq: $uniqueId } }, limit: 1) {
      nodes {
        uniqueId
        name
        url
        source
        sourceDescription
        difficulty
        isStarred
        tags
        statement
        author
        interaction {
          type
          correct
          choices
          correctIndex
        }
        solutionReveal {
          mode
          url
          markdown
        }
        solution {
          kind
          label
          labelTooltip
          url
          hasHints
          sketch
        }
        module {
          frontmatter {
            id
            title
          }
          fields {
            division
          }
        }
      }
    }
  }
`;
