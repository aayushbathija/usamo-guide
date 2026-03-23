import * as React from 'react';
import { ProblemInfo } from '../models/problem';

/** Problem metadata for internal solution / editorial pages (not the solution MDX document). */
export type ProblemSolutionContextProblem = Pick<
  ProblemInfo,
  'uniqueId' | 'url' | 'name' | 'source'
>;

export type ProblemSolutionContextValue = {
  problem: ProblemSolutionContextProblem;
  modulesThatHaveProblem: { id: string; title: string }[];
};

const ProblemSolutionContext =
  React.createContext<ProblemSolutionContextValue | null>(null);

export function ProblemSolutionProvider({
  value,
  children,
}: {
  value: ProblemSolutionContextValue;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ProblemSolutionContext.Provider value={value}>
      {children}
    </ProblemSolutionContext.Provider>
  );
}

export function useProblemSolutions() {
  const context = React.useContext(ProblemSolutionContext);
  if (!context) {
    throw new Error(
      'useProblemSolutions must be used within ProblemSolutionProvider or MarkdownLayout with problemSolution prop'
    );
  }
  return context;
}

export { ProblemSolutionContext };
