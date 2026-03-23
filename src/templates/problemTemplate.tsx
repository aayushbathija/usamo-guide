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
      <div className="ui-page min-h-screen">
        <TopNavigationBar />
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/problems/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Problems
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 dark:text-gray-200">{node.name}</span>
          </nav>

          <header className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
            <h1 className="dark:text-dark-high-emphasis text-2xl font-bold text-gray-900 sm:text-3xl">
              {node.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-blue-700 dark:text-blue-400">
                {sourceTooltip ? (
                  <span title={sourceTooltip}>{node.source}</span>
                ) : (
                  node.source
                )}
              </span>
              {node.author ? (
                <>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {node.author}
                  </span>
                </>
              ) : null}
              <DifficultyBox
                difficulty={(node.difficulty ?? 'N/A') as ProblemDifficulty}
              />
            </div>
            {node.module?.frontmatter?.id && node.module.fields?.division ? (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                From module{' '}
                <Link
                  className="text-blue-600 hover:underline dark:text-blue-400"
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
          </header>

          <section className="mb-10" aria-labelledby="problem-statement">
            <h2
              id="problem-statement"
              className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100"
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
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                  className="ui-input max-w-xs rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Enter a number"
                />
                <button
                  type="button"
                  onClick={runCheck}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
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
              <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Select an answer
              </p>
              <ul className="space-y-2">
                {problem.interaction.choices.map((choice, i) => (
                  <li key={i}>
                    <label className="flex cursor-pointer items-start gap-2 rounded-md border border-transparent px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800/80">
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
                      <span className="text-gray-800 dark:text-gray-200">
                        {choice}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={runCheck}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
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
                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
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
                  className="rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
                >
                  {solutionOpen ? 'Hide solution' : 'Show me the solution'}
                </button>
                {solutionOpen && (
                  <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                    <ProblemStatementMarkdown>
                      {problem.solutionReveal.markdown}
                    </ProblemStatementMarkdown>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No solution is configured for this problem yet.
              </p>
            )}
          </section>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            <Link to="/problems/" className="text-blue-600 hover:underline dark:text-blue-400">
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
