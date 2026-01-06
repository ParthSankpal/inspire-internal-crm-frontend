export type MathsTopic = {
    name: string;
    subtopics: string[];
};

export type MathsChapter = {
    chapter: string;
    topics: MathsTopic[];
};

export const MATHS_SYLLABUS: MathsChapter[] = [

    /* ======================================================
       ALGEBRA – BASIC
    ====================================================== */

    {
        chapter: "Set Theory & Real Number System",
        topics: [
            {
                name: "Sets",
                subtopics: [
                    "Representation of Set",
                    "Different Types of Sets",
                    "Subset",
                    "Proper Subset of a Set",
                    "Power Set",
                    "Universal Set",
                    "Venn Diagram",
                    "Operation on Sets",
                    "Complement of a Set",
                    "Venn Diagrams for Operations",
                    "Intervals as Subset of Set ℝ",
                    "Cardinal Number of a Set",
                ],
            },
            {
                name: "Inequalities",
                subtopics: [
                    "Values of x² from given x",
                    "Values of |x| from given x",
                    "Sign Scheme Method",
                ],
            },
            {
                name: "Real Numbers",
                subtopics: [
                    "Modulus of Real Numbers",
                    "Graph of Modulus Function",
                    "Absolute Value as Square Root",
                ],
            },
            {
                name: "Modulus",
                subtopics: [
                    "Modulus of an Expression",
                    "Inequalities involving Modulus",
                    "Addition & Subtraction of Modulus",
                ],
            },
        ],
    },

    {
        chapter: "Theory of Equations",
        topics: [
            {
                name: "Polynomial",
                subtopics: [
                    "Definition of Polynomial",
                    "Degree of Polynomial",
                    "Polynomial Equation",
                ],
            },
            {
                name: "Roots",
                subtopics: [
                    "Roots of an Equation",
                    "Solution Set",
                ],
            },
            {
                name: "Theorems",
                subtopics: [
                    "Remainder Theorem",
                    "Factor Theorem",
                ],
            },
            {
                name: "Quadratic",
                subtopics: [
                    "Nature of Roots",
                    "Relation between Roots & Coefficients",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Formation of Quadratic Equation",
                ],
            },
        ],
    },

    {
        chapter: "Complex Numbers",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Imaginary Number",
                    "Integral Powers of i",
                ],
            },
            {
                name: "Algebra",
                subtopics: [
                    "Algebraic Operations",
                ],
            },
            {
                name: "Representation",
                subtopics: [
                    "Argand Plane",
                ],
            },
            {
                name: "Conjugate",
                subtopics: [
                    "Conjugate of Complex Number",
                ],
            },
            {
                name: "Modulus",
                subtopics: [
                    "Modulus of Complex Number",
                ],
            },
            {
                name: "Argument",
                subtopics: [
                    "Argument of Complex Number",
                ],
            },
            {
                name: "Polar Form",
                subtopics: [
                    "Polar Representation",
                ],
            },
            {
                name: "De Moivre",
                subtopics: [
                    "De Moivre’s Theorem",
                ],
            },
            {
                name: "Geometry",
                subtopics: [
                    "Locus Problems",
                ],
            },
        ],
    },

    {
        chapter: "Mathematical Induction",
        topics: [
            {
                name: "PMI",
                subtopics: [
                    "Principle of Mathematical Induction",
                    "Base Step",
                    "Induction Hypothesis",
                    "Induction Step",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Proofs using PMI",
                ],
            },
        ],
    },

    {
        chapter: "Progression & Series",
        topics: [
            {
                name: "Introduction",
                subtopics: [
                    "Sequences",
                ],
            },
            {
                name: "A.P.",
                subtopics: [
                    "Arithmetic Progression",
                    "nth Term of A.P.",
                    "Sum of n Terms of A.P.",
                ],
            },
            {
                name: "G.P.",
                subtopics: [
                    "Geometric Progression",
                    "Sum of G.P.",
                ],
            },
            {
                name: "Special Series",
                subtopics: [
                    "Arithmetic Mean",
                    "Geometric Mean",
                    "Harmonic Mean",
                ],
            },
        ],
    },

    {
        chapter: "Inequalities Involving Means",
        topics: [
            {
                name: "Means",
                subtopics: [
                    "Simple Means of Two Positive Numbers",
                    "AM–GM Inequality",
                    "AM–GM–HM Inequality",
                    "Weighted Means",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Concept Application Problems",
                    "Solved Examples",
                ],
            },
        ],
    },

    {
        chapter: "Permutation and Combination",
        topics: [
            {
                name: "Counting",
                subtopics: [
                    "Fundamental Principle of Counting",
                    "Multiplication Rule",
                    "Addition Rule",
                ],
            },
            {
                name: "Permutation",
                subtopics: [
                    "Factorial Notation",
                    "Permutations of n Objects",
                    "Permutations with Repetition",
                    "Circular Permutations",
                ],
            },
            {
                name: "Combination",
                subtopics: [
                    "Combination of Objects",
                    "Properties of nCr",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Problems on Permutation & Combination",
                ],
            },
        ],
    },

    {
        chapter: "Binomial Theorem",
        topics: [
            {
                name: "Expansion",
                subtopics: [
                    "Binomial Expansion",
                    "Pascal’s Triangle",
                ],
            },
            {
                name: "Terms",
                subtopics: [
                    "General Term",
                    "Middle Term(s)",
                ],
            },
            {
                name: "Coefficients",
                subtopics: [
                    "Binomial Coefficients",
                ],
            },
            {
                name: "Properties",
                subtopics: [
                    "Properties of Binomial Coefficients",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Finding Greatest Coefficient",
                    "Special Expansions",
                ],
            },
        ],
    },

    {
        chapter: "Probability",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Random Experiment",
                    "Sample Space",
                    "Event",
                ],
            },
            {
                name: "Types",
                subtopics: [
                    "Mutually Exclusive Events",
                    "Equally Likely Events",
                ],
            },
            {
                name: "Theorems",
                subtopics: [
                    "Classical Definition of Probability",
                    "Addition Theorem of Probability",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Solved Problems",
                ],
            },
        ],
    },

    /* ======================================================
       TRIGONOMETRY
    ====================================================== */

    {
        chapter: "Trigonometric Functions",
        topics: [
            {
                name: "Angles",
                subtopics: [
                    "Measurement of Angle",
                    "Degree & Radian Measure",
                    "Conversion (Degree ↔ Radian)",
                ],
            },
            {
                name: "Ratios",
                subtopics: [
                    "Acute Angle Ratios",
                    "Standard Angles",
                ],
            },
            {
                name: "Functions",
                subtopics: [
                    "Circular Functions",
                    "Graphs of Trig Functions",
                ],
            },
            {
                name: "Behaviour",
                subtopics: [
                    "Behaviour of Trig Functions",
                ],
            },
        ],
    },

    {
        chapter: "Trigonometric Ratios & Transformation",
        topics: [
            {
                name: "Identities",
                subtopics: [
                    "Standard Identities",
                ],
            },
            {
                name: "Formulas",
                subtopics: [
                    "Compound Angle (sin, cos)",
                    "Tan Transformation",
                ],
            },
            {
                name: "Multiple Angles",
                subtopics: [
                    "sin nθ, cos nθ",
                    "tan nθ",
                ],
            },
            {
                name: "A.P.",
                subtopics: [
                    "Sum of Cosines / Sines",
                ],
            },
            {
                name: "Inequalities",
                subtopics: [
                    "Conditional Identities",
                ],
            },
        ],
    },

    {
        chapter: "Trigonometric Equations",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Equation Formation",
                ],
            },
            {
                name: "Equations",
                subtopics: [
                    "sin x = a",
                    "cos x = a",
                    "tan x = a",
                ],
            },
            {
                name: "General",
                subtopics: [
                    "f(x²) = f(a²)",
                ],
            },
            {
                name: "Methods",
                subtopics: [
                    "Maximum–Minimum Solutions",
                ],
            },
            {
                name: "Graphs",
                subtopics: [
                    "Solving Using Graphs",
                ],
            },
        ],
    },

    {
        chapter: "Inverse Trigonometric Functions",
        topics: [
            {
                name: "Definition",
                subtopics: [
                    "Inverse Trig Functions",
                ],
            },
            {
                name: "Graphs",
                subtopics: [
                    "Graph of Inverse Trig",
                ],
            },
            {
                name: "Principal Value",
                subtopics: [
                    "sin⁻¹x",
                    "cos⁻¹x",
                    "tan⁻¹x",
                ],
            },
            {
                name: "Properties",
                subtopics: [
                    "Transformations",
                ],
            },
        ],
    },/* ======================================================
   COORDINATE GEOMETRY
====================================================== */

    {
        chapter: "Coordinate System",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Rectangular (Cartesian) Coordinate System",
                ],
            },
            {
                name: "Axes",
                subtopics: [
                    "Transformation of Axes",
                ],
            },
            {
                name: "Distance",
                subtopics: [
                    "Distance Formula",
                ],
            },
            {
                name: "Area",
                subtopics: [
                    "Area of Polygon",
                ],
            },
            {
                name: "Section Formula",
                subtopics: [
                    "Internal Division",
                    "External Division",
                ],
            },
            {
                name: "Triangle",
                subtopics: [
                    "Coordinates of Centroid",
                    "Circumcentre",
                    "Orthocentre",
                    "Incentre",
                    "Excentres",
                ],
            },
            {
                name: "Lines",
                subtopics: [
                    "Slope of a Line",
                    "Angle Between Two Lines",
                ],
            },
            {
                name: "Coordinates",
                subtopics: [
                    "Polar Coordinates",
                ],
            },
            {
                name: "Locus",
                subtopics: [
                    "Locus and Its Equation",
                ],
            },
        ],
    },

    {
        chapter: "Straight Lines",
        topics: [
            {
                name: "Equation",
                subtopics: [
                    "Point–Slope Form",
                    "Two-Point Form",
                    "Intercept Form",
                    "Normal Form",
                    "Symmetric Form",
                    "Parametric Form",
                ],
            },
            {
                name: "Distance",
                subtopics: [
                    "Distance of a Point from a Line",
                ],
            },
            {
                name: "Geometry",
                subtopics: [
                    "Position of a Point w.r.t Line",
                    "Division of Plane by Line",
                    "Angle Bisectors",
                ],
            },
            {
                name: "Image",
                subtopics: [
                    "Image of a Point in a Line",
                ],
            },
            {
                name: "Concurrency",
                subtopics: [
                    "Concurrency of Three Lines",
                ],
            },
        ],
    },

    {
        chapter: "Pair of Straight Lines",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Equation of Pair of Straight Lines",
                ],
            },
            {
                name: "Degree",
                subtopics: [
                    "Second Degree Equation",
                ],
            },
            {
                name: "Angle",
                subtopics: [
                    "Angle Between Pair of Lines",
                ],
            },
            {
                name: "Bisectors",
                subtopics: [
                    "Angle Bisectors of Pair of Lines",
                ],
            },
            {
                name: "Homogeneous",
                subtopics: [
                    "Homogeneous Second Degree Equation",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Solved Problems",
                ],
            },
        ],
    },

    {
        chapter: "Circle",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Definition of Circle",
                ],
            },
            {
                name: "Equation",
                subtopics: [
                    "Centre–Radius Form",
                    "General Equation of Circle",
                    "Circle through Three Points",
                ],
            },
            {
                name: "Geometry",
                subtopics: [
                    "Tangent to Circle",
                    "Normal to Circle",
                    "Director Circle",
                    "Chord of Contact",
                ],
            },
            {
                name: "Family",
                subtopics: [
                    "Family of Circles",
                ],
            },
        ],
    },

    {
        chapter: "Ellipse",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Definition of Ellipse",
                ],
            },
            {
                name: "Equation",
                subtopics: [
                    "Standard Equation",
                ],
            },
            {
                name: "Geometry",
                subtopics: [
                    "Focus & Directrix",
                ],
            },
            {
                name: "Chord",
                subtopics: [
                    "Chord of Ellipse",
                ],
            },
            {
                name: "Tangent",
                subtopics: [
                    "Equation of Tangent",
                ],
            },
            {
                name: "Normal",
                subtopics: [
                    "Equation of Normal",
                ],
            },
            {
                name: "Properties",
                subtopics: [
                    "Important Properties",
                ],
            },
        ],
    },

    {
        chapter: "Hyperbola",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Definition of Hyperbola",
                ],
            },
            {
                name: "Equation",
                subtopics: [
                    "Standard Equation",
                ],
            },
            {
                name: "Geometry",
                subtopics: [
                    "Asymptotes",
                ],
            },
            {
                name: "Tangent",
                subtopics: [
                    "Equation of Tangent",
                ],
            },
            {
                name: "Normal",
                subtopics: [
                    "Equation of Normal",
                ],
            },
            {
                name: "Properties",
                subtopics: [
                    "Important Properties",
                ],
            },
        ],
    },

    /* ======================================================
       CALCULUS
    ====================================================== */

    {
        chapter: "Limits",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Limit of a Function",
                ],
            },
            {
                name: "Algebraic",
                subtopics: [
                    "Algebraic Substitution",
                ],
            },
            {
                name: "Indeterminate Forms",
                subtopics: [
                    "0/0",
                    "∞/∞",
                ],
            },
            {
                name: "Rationalisation",
                subtopics: [
                    "Rationalisation Method",
                ],
            },
            {
                name: "Standard Limits",
                subtopics: [
                    "Standard Formulae",
                    "Limit of sinx/x",
                ],
            },
            {
                name: "Trigonometric",
                subtopics: [
                    "Trigonometric Limits",
                ],
            },
            {
                name: "One-Sided",
                subtopics: [
                    "LHL & RHL",
                ],
            },
            {
                name: "Infinite Limits",
                subtopics: [
                    "Limits at Infinity",
                ],
            },
        ],
    },

    {
        chapter: "Differentiation",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Definition of Derivative",
                ],
            },
            {
                name: "Geometry",
                subtopics: [
                    "Slope of Tangent",
                ],
            },
            {
                name: "Rules",
                subtopics: [
                    "Product Rule",
                    "Quotient Rule",
                    "Chain Rule",
                ],
            },
            {
                name: "Functions",
                subtopics: [
                    "Implicit Differentiation",
                ],
            },
            {
                name: "Parametric",
                subtopics: [
                    "Parametric Differentiation",
                ],
            },
            {
                name: "Higher Order",
                subtopics: [
                    "Second & Higher Derivatives",
                ],
            },
            {
                name: "Relations",
                subtopics: [
                    "Differentiation of Inverse Functions",
                ],
            },
        ],
    },

    {
        chapter: "Continuity & Differentiability",
        topics: [
            {
                name: "Continuity",
                subtopics: [
                    "Definition of Continuity",
                    "Types of Discontinuity",
                ],
            },
            {
                name: "Differentiability",
                subtopics: [
                    "Differentiability at a Point",
                ],
            },
            {
                name: "Relations",
                subtopics: [
                    "Continuity vs Differentiability",
                ],
            },
            {
                name: "Composite",
                subtopics: [
                    "Continuity of Composite Functions",
                ],
            },
            {
                name: "Special",
                subtopics: [
                    "Continuity of GIF & Signum",
                ],
            },
        ],
    },

    {
        chapter: "Application of Derivatives",
        topics: [
            {
                name: "Tangent",
                subtopics: [
                    "Tangent & Normal",
                ],
            },
            {
                name: "Geometry",
                subtopics: [
                    "Angle Between Curves",
                ],
            },
            {
                name: "Monotonicity",
                subtopics: [
                    "Increasing & Decreasing Functions",
                ],
            },
            {
                name: "Max–Min",
                subtopics: [
                    "Maxima & Minima",
                ],
            },
            {
                name: "Optimization",
                subtopics: [
                    "Practical Problems",
                ],
            },
            {
                name: "Curve Tracing",
                subtopics: [
                    "Sketching of Curves",
                ],
            },
        ],
    },

    {
        chapter: "Indefinite Integration",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Integration as Reverse of Differentiation",
                ],
            },
            {
                name: "Methods",
                subtopics: [
                    "Substitution Method",
                    "By Parts",
                ],
            },
            {
                name: "Functions",
                subtopics: [
                    "Integration of Trigonometric Functions",
                ],
            },
            {
                name: "Special",
                subtopics: [
                    "Standard Integrals",
                ],
            },
        ],
    },

    {
        chapter: "Definite Integration",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Definition as Limit of Sum",
                ],
            },
            {
                name: "Properties",
                subtopics: [
                    "Properties of Definite Integral",
                ],
            },
            {
                name: "Theorems",
                subtopics: [
                    "Fundamental Theorems",
                ],
            },
            {
                name: "Techniques",
                subtopics: [
                    "Evaluation Using Properties",
                ],
            },
        ],
    },

    {
        chapter: "Area Under Curve",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Area Bounded by Curve & Axis",
                ],
            },
            {
                name: "Curves",
                subtopics: [
                    "Area Between Two Curves",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Graph-Based Problems",
                ],
            },
        ],
    },

    {
        chapter: "Differential Equations",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Order and Degree",
                ],
            },
            {
                name: "Formation",
                subtopics: [
                    "Formation of Differential Equation",
                ],
            },
            {
                name: "Variable",
                subtopics: [
                    "Separable Variable",
                ],
            },
            {
                name: "Linear",
                subtopics: [
                    "Linear Differential Equations",
                ],
            },
            {
                name: "Homogeneous",
                subtopics: [
                    "Homogeneous Differential Equation",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Practical Problems",
                ],
            },
        ],
    },

    /* ======================================================
       VECTORS & 3D GEOMETRY
    ====================================================== */

    {
        chapter: "Products of Vectors",
        topics: [
            {
                name: "Dot Product",
                subtopics: [
                    "Definition",
                    "Physical Interpretation",
                    "Geometrical Interpretation",
                    "Properties",
                    "Applications",
                ],
            },
            {
                name: "Cross Product",
                subtopics: [
                    "Definition",
                    "Physical Interpretation",
                    "Geometrical Interpretation",
                ],
            },
            {
                name: "Scalar Triple Product",
                subtopics: [
                    "Definition",
                    "Volume of Tetrahedron",
                    "Properties",
                ],
            },
            {
                name: "Vector Triple Product",
                subtopics: [
                    "Lagrange’s Identity",
                ],
            },
            {
                name: "Reciprocal System",
                subtopics: [
                    "Properties",
                ],
            },
        ],
    },

    {
        chapter: "Introduction to 3D Geometry",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "3D Coordinate System",
                ],
            },
            {
                name: "Coordinates",
                subtopics: [
                    "Coordinates of a Point in 3D",
                ],
            },
            {
                name: "Angles",
                subtopics: [
                    "Direction Angles",
                    "Direction Cosines",
                ],
            },
            {
                name: "Distance",
                subtopics: [
                    "Distance Between Two Points",
                    "Points on Same Axis",
                    "Line ∥ to Axis",
                ],
            },
            {
                name: "Section",
                subtopics: [
                    "Section Formula",
                ],
            },
            {
                name: "Sphere",
                subtopics: [
                    "General Equation of Sphere",
                ],
            },
        ],
    },

    {
        chapter: "Line and Plane",
        topics: [
            {
                name: "Direction",
                subtopics: [
                    "Direction Ratios",
                ],
            },
            {
                name: "Lines",
                subtopics: [
                    "Line in Space",
                    "Line through Point & Parallel to Vector",
                    "Line through Two Points",
                    "Angle Between Two Lines",
                    "Shortest Distance Between Two Lines",
                ],
            },
            {
                name: "Planes",
                subtopics: [
                    "Plane in Normal Form",
                    "Plane through Given Point",
                    "Plane through Three Points",
                    "Plane ∥ to Given Plane",
                    "Angle Between Two Planes",
                    "Line of Intersection of Two Planes",
                ],
            },
            {
                name: "Distance",
                subtopics: [
                    "Distance of Point from Plane",
                    "Distance Between Parallel Planes",
                ],
            },
            {
                name: "Geometry",
                subtopics: [
                    "Regular Tetrahedron",
                ],
            },
        ],
    }

]