// Section -> Chapter -> Module

export type SectionID =
  | 'foundations'
  | 'intermediate'
  | 'advanced'
  | 'usamo';

export type Chapter = {
  name: string;
  items: string[];
  description?: string;
};

const MODULE_ORDERING: { [key in SectionID]: Chapter[] } = {
  foundations: [
    {
      name: 'Number Theory Basics',
      description: 'Fluency with arithmetic and foundational number theory.',
      items: [
        'arithmetic-nt-basics', 
        'linear-diophantine-equations',
        'chicken-mcnugget'
      ],
    },
    {
      name: 'Algebra Basics',
      description: 'Linear equations, factoring patterns, and core manipulation skills.',
      items: [
        'algebra-basics',
        'exponent-rules',
        'quadratic-identities',
        'quadratic-formula',
        'systems-equations',
        'substitution-techniques',
        'sfft-factoring',
        'cubic-factorizations',
      ],
    },
    {
      name: 'Algebra Tools',
      description: "Vieta's formulas and polynomial root transformations.",
      items: [
        'vieta-formulas',
        'polynomial-manipulations',
      ],
    },
    {
      name: 'Averages and Sequences',
      description: 'Means, arithmetic and geometric sequences, and telescoping sums.',
      items: [
        'mean-median-mode-harmonic',
        'arithmetic-sequences',
        'geometric-sequences',
        'telescoping',
      ],
    },
    {
      name: 'Intro Inequalities',
      description: 'AM-GM, Cauchy-Schwarz, and foundational bounding techniques.',
      items: ['amgm-inequality', 'cauchy-schwarz', "inequalities-foundations"],
    },
    {
      name: 'Counting Fundamentals',
      description: 'Permutations, combinations, inclusion-exclusion, and pigeonhole.',
      items: [
        'counting-fundamentals',
        'pascals-triangle-binomial-theorem',
        'inclusion-exclusion',
        'pigeonhole-principles',
        'stars-and-bars',
      ],
    },
    {
      name: 'Geometry Basics',
      description: 'Triangles, similarity, circles, and core area formulas.',
      items: [
        'geometry-basics',
        'triangle-angle-sum',
        'triangle-area-formulas',
        'special-triangles',
        'right-triangles',
        'special-right-triangles',
        'triangle-medians-centroid',
        'angle-bisectors',
        'altitudes-orthocenter',
        'similarity-basics',
        'proportionality-thales',
        'law-of-sines',
        'law-of-cosines',
        'circle-angles',
        'special-quadrilaterals',
        'triangle-congruence-similarity',
      ],
    },
    {
      name: 'Coordinate Geometry Basics',
      description: 'Distance, midpoint, slope, and line equations.',
      items: ['coordinate-geometry-basics', 'line-equations'],
    },
    {
      name: 'Word Problems',
      description: 'Translating stories into equations using rates, mixtures, and ratios.',
      items: ['word-problems'],
    },
    {
      name: 'Intro to Probability',
      description: 'Sample spaces, complements, conditional probability, and expected value.',
      items: ['intro-probability'],
    },
  ],
  intermediate: [
    {
      name: 'Advanced Algebra',
      description: 'Quadratics, systems, and polynomial identities for AMC 10/12.',
      items: ['advanced-algebra',
        'higher-power-factorizations',
        'sophie-germain-identity',
        'newton-sums',
        'symmetric-polynomials',
        'symmetric-identity',
        'sum-formulas-powers',
      ],
    },
    {
      name: 'Functional Equations',
      description: 'Standard substitutions and symmetry-based approaches.',
      items: [
        'functional-equations',
      ],
    },
    {
      name: 'Counting & Casework',
      description: 'Multi-step counting with careful case analysis.',
      items: ['advanced-counting'],
    },
    {
      name: 'Probability',
      description: 'Conditional probability, geometric probability, and expected value.',
      items: ['probability-intermediate', 'geometric-probability', 'expected-value'],
    },
    {
      name: 'Number Theory',
      description: 'Modular arithmetic, CRT, and divisibility techniques.',
      items: ['modular-arithmetic', 'number-theory-intermediate', 'chinese-remainder-theorem'],
    },
    {
      name: 'Euclidean Geometry',
      description: 'Circle theorems, power of a point, and cyclic quadrilaterals.',
      items: [
        'euclidean-geometry',
        'power-of-a-point',
        'cyclic-quadrilaterals',
        'tangent-lines',
        'tangent-circles',
        'arc-and-chord',
      ],
    },
    {
      name: 'Coordinate Geometry',
      description: 'Analytic methods, Shoelace formula, and coordinate-based proofs.',
      items: ['coordinate-geometry', 'shoelace-formula'],
    },
    {
      name: 'Inequalities',
      description: 'Algebraic and geometric inequality techniques for AMC/AIME.',
      items: ['inequalities'],
    },
    {
      name: 'Sequences & Series',
      description: 'Convergence, recursive formulas, and summation methods.',
      items: ['sequences-series'],
    },
    {
      name: 'Trigonometry',
      description: 'Unit circle, identities, and trig equations for contest math.',
      items: [
        'trig-unit-circle',
        'trig-identities',
        'trig-angle-addition',
        'trig-product-sum',
        'trig-equations',
        'trig-inverse-functions',
        'trig-triangle-laws',
        'trig-patterns',
      ],
    },
    {
      name: 'Complex Numbers',
      description: 'Complex arithmetic, polar form, roots of unity, and geometry.',
      items: [
        'complex-basics',
        'complex-algebra',
        'complex-conjugates',
        'complex-plane',
        'complex-polar-form',
        'complex-geometry',
        'roots-of-unity',
        'roots-of-unity-advanced',
        'complex-trigonometry',
      ],
    },
    {
      name: 'Geometry Extensions',
      description: 'Regular polygons and three-dimensional geometry.',
      items: ['regular-polygons', 'three-d-geometry'],
    },
  ],
  advanced: [
    {
      name: 'Strong Number Theory',
      description: 'Lifting the exponent, orders, and deeper divisibility arguments.',
      items: ['number-theory-advanced'],
    },
    {
      name: 'Advanced Counting',
      description: 'Generating functions, bijections, and harder combinatorial arguments.',
      items: ['counting-advanced'],
    },
    {
      name: 'Polynomials & Roots',
      description: 'Root bounding, irreducibility, and polynomial manipulation.',
      items: ['polynomials-roots'],
    },
    {
      name: 'Complex Numbers',
      description: 'Advanced complex number techniques for AIME geometry and algebra.',
      items: ['complex-numbers'],
    },
    {
      name: 'Advanced Geometry',
      description: 'Projective methods, inversions, homothety, and spiral similarity.',
      items: [
        'geometry-advanced',
        'sphere-geometry',
        'angle-chasing',
        'homothety-spiral-similarity',
      ],
    },
    {
      name: 'Trig in Contests',
      description: 'Contest-specific trig tricks and identities.',
      items: ['trig-contests'],
    },
    {
      name: 'Inequalities (AIME)',
      description: 'Schur, SOS, and multi-variable inequality techniques.',
      items: ['inequalities-advanced'],
    },
    {
      name: 'Generating Functions',
      description: 'Using formal power series to solve counting problems.',
      items: ['generating-functions'],
    },
    {
      name: 'Functional Equations (AIME)',
      description: 'Harder functional equations requiring injectivity and Cauchy-type analysis.',
      items: ['functional-equations-advanced'],
    },
  ],
  usamo: [
    {
      name: 'Proof Writing',
      description: 'Structuring clear, rigorous proofs for olympiad submissions.',
      items: ['proof-writing-basics'],
    },
    {
      name: 'Induction & Extremal',
      description: 'Strong induction, well-ordering, and extremal principle arguments.',
      items: ['induction-extremal'],
    },
    {
      name: 'Graph Theory Intro',
      description: 'Graphs, trees, coloring, and combinatorial structure.',
      items: ['graph-theory-intro'],
    },
    {
      name: 'Advanced Inequalities',
      description: 'Olympiad-level bounding with Schur, Muirhead, and mixing variables.',
      items: ['inequalities-olympiad'],
    },
    {
      name: 'Olympiad Number Theory',
      description: 'Vieta jumping, infinite descent, and olympiad divisibility.',
      items: ['olympiad-number-theory', 'vieta-root-jumping'],
    },
    {
      name: 'Olympiad Geometry',
      description: 'Synthetic and projective techniques for proof-based geometry.',
      items: ['olympiad-geometry'],
    },
    {
      name: 'Strategy & Writeups',
      description: 'Time management, problem selection, and solution presentation.',
      items: ['strategy-writeup'],
    },
  ],
};

export default MODULE_ORDERING;
export const SECTIONS: SectionID[] = Object.keys(
  MODULE_ORDERING
) as SectionID[];
export const SECTION_LABELS: { [key in SectionID]: string } = {
  foundations: 'Foundations (AMC 8)',
  intermediate: 'Intermediate (AMC 10-12)',
  advanced: 'Advanced (AIME)',
  usamo: 'Olympiad (USA(J)MO)',
} as const;
export const SECTION_SEO_DESCRIPTION: { [key in SectionID]: string } = {
  foundations:
    'Core AMC 8 and early AMC 10 foundations: number sense, algebra, counting, geometry, word problems, and probability.',
  intermediate:
    'AMC 10/12 topics: algebra, functional equations, counting, probability, number theory, geometry, inequalities, and sequences.',
  advanced:
    'AIME-level techniques: advanced number theory, counting, polynomials, complex numbers, geometry, trig, inequalities, and generating functions.',
  usamo:
    'USAMO preparation: proof writing, induction, extremal arguments, olympiad number theory and geometry, and contest strategy.',
};
export const SECTION_SEO_TITLES: { [key in SectionID]: string } = {
  foundations: 'Foundations (AMC 8)',
  intermediate: 'Intermediate (AMC 10-12)',
  advanced: 'Advanced (AIME)',
  usamo: 'Olympiad (USA(J)MO)',
};

const moduleIDToSectionMap: { [key: string]: SectionID } = {};

SECTIONS.forEach(section => {
  MODULE_ORDERING[section].forEach(category => {
    category.items.forEach(moduleID => {
      moduleIDToSectionMap[moduleID] = section;
    });
  });
});

export { moduleIDToSectionMap, moduleIDToURLMap };

const moduleIDToURLMap: { [key: string]: string } = {};

SECTIONS.forEach(section => {
  MODULE_ORDERING[section].forEach(category => {
    category.items.forEach(moduleID => {
      moduleIDToURLMap[moduleID] = `/${section}/${moduleID}`;
    });
  });
});
