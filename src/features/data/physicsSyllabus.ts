
export type SyllabusNode = {
    name: string;
    subtopics: string[];
};

export type PhysicsChapter = {
    chapter: string;
    topics: SyllabusNode[];
};

export const PHYSICS_SYLLABUS: PhysicsChapter[] = [
    {
        chapter: "Dimensions & Measurement",
        topics: [
            {
                name: "Physical Quantities & Units",
                subtopics: [
                    "Types of Physical Quantities",
                    "Fundamental & Derived Quantities",
                    "Fundamental & Derived Units",
                    "SI Prefixes",
                ],
            },
            {
                name: "Dimensions",
                subtopics: [
                    "Methods to find dimensions",
                    "Dimensions of angular quantities",
                    "Applications of dimensional analysis",
                    "Limitations of dimensional analysis",
                ],
            },
            {
                name: "Significant Figures",
                subtopics: [
                    "Rounding off",
                    "Significant figures in calculations",
                    "Order of magnitude",
                ],
            },
            {
                name: "Errors & Measuring Instruments",
                subtopics: [
                    "Types of errors",
                    "Propagation of errors",
                    "Vernier calipers (reading, zero error)",
                    "Screw gauge (pitch, least count, zero error)",
                ],
            },
        ],
    },

    {
        chapter: "Basic Math for Physics",
        topics: [
            {
                name: "Algebra",
                subtopics: [
                    "Algebraic identities",
                    "Linear & quadratic equations",
                    "Binomial theorem",
                ],
            },
            {
                name: "Trigonometry",
                subtopics: [
                    "Angle systems & measurement",
                    "Trigonometric ratios & limits",
                    "Graphs of sin & cos",
                    "Identities & formulae",
                    "Inverse trigonometric functions",
                    "Sine & cosine rule",
                ],
            },
            {
                name: "Coordinate Geometry",
                subtopics: [
                    "Origin, axes, position of point",
                    "Distance formula",
                    "Slope of line",
                    "Equation of line",
                    "Dependent & independent variables",
                    "v–t graph plotting",
                ],
            },
            {
                name: "Functions & Calculus",
                subtopics: [
                    "Definition of function",
                    "Limit of a function",
                ],
            },
            {
                name: "Differentiation",
                subtopics: [
                    "Derivative definition",
                    "Notation",
                    "Rules (product, quotient, chain)",
                    "Derivatives of standard functions",
                    "Maxima & minima",
                ],
            },
            {
                name: "Integration",
                subtopics: [
                    "Integration as inverse of differentiation",
                    "Standard integrals",
                    "Definite integrals",
                    "Properties of definite integrals",
                    "Substitution rule",
                    "Geometrical meaning of integration",
                    "Uses in deriving motion equations",
                ],
            },
        ],
    },

    {
        chapter: "Vectors",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Scalars vs vectors",
                    "Graphical representation",
                ],
            },
            {
                name: "Operations",
                subtopics: [
                    "Vector addition laws",
                    "Subtraction",
                    "Polygon law",
                    "Analytical vector addition",
                ],
            },
            {
                name: "Unit Vectors & Components",
                subtopics: [
                    "Unit vectors",
                    "Components in 2D & 3D",
                    "Addition through components",
                    "Direction cosines",
                ],
            },
            {
                name: "Position & Displacement",
                subtopics: [
                    "Position vector",
                    "Displacement vector",
                ],
            },
            {
                name: "Vector Products",
                subtopics: [
                    "Dot product",
                    "Cross product",
                ],
            },
        ],
    },

    {
        chapter: "Kinematics I",
        topics: [
            {
                name: "Basic Concepts",
                subtopics: [
                    "Translatory motion",
                    "Frame of reference",
                    "Rest & motion",
                ],
            },
            {
                name: "Displacement, Velocity",
                subtopics: [
                    "Position & displacement",
                    "Instantaneous & average velocity",
                    "Speed",
                ],
            },
            {
                name: "Acceleration",
                subtopics: [
                    "Instantaneous & average acceleration",
                ],
            },
            {
                name: "Motion in 1D",
                subtopics: [
                    "Equations of motion",
                    "nth second displacement",
                    "Uniform acceleration",
                ],
            },
            {
                name: "Motion Under Gravity",
                subtopics: [
                    "Vertical motion",
                    "Motion on incline",
                ],
            },
            {
                name: "Relative Motion",
                subtopics: [
                    "Velocity of approach/separation",
                    "River–man problems",
                ],
            },
            {
                name: "Graphical Analysis",
                subtopics: [
                    "x–t graph",
                    "v–t graph",
                    "a–t graph",
                    "v–x graph",
                    "a–x graph",
                ],
            },
        ],
    },

    {
        chapter: "Kinematics II",
        topics: [
            {
                name: "2D Motion Concepts",
                subtopics: [
                    "Vector decomposition of velocity",
                    "Independence of motions",
                ],
            },
            {
                name: "Projectile Motion",
                subtopics: [
                    "Standard projectile",
                    "Parameters (H, R, t)",
                    "Horizontal projectile",
                    "Projectile from height",
                    "Projectile from moving frame",
                    "Projectile to hit a point",
                    "Elastic collision with wall",
                ],
            },
            {
                name: "Projectile on Inclined Plane",
                subtopics: [
                    "Range on inclined plane",
                    "Path on incline",
                ],
            },
            {
                name: "Relative Motion in 2D",
                subtopics: [
                    "Relative velocity",
                    "River / rain / airplane problems",
                    "Minimum distance between objects",
                    "Velocity of approach",
                ],
            },
        ],
    },

    {
        chapter: "NLM (No Friction)",
        topics: [
            {
                name: "Force Concepts",
                subtopics: [
                    "Newton’s three laws",
                    "Inertial frames",
                    "Momentum & impulse",
                ],
            },
            {
                name: "Free-Body Diagrams",
                subtopics: [
                    "Weight",
                    "Normal reaction",
                    "Tension",
                ],
            },
            {
                name: "Equilibrium",
                subtopics: [
                    "Concurrent forces",
                    "Lami’s theorem",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Block–pulley problems",
                    "Connected bodies",
                    "Apparent weight",
                ],
            },
        ],
    },

    {
        chapter: "NLM (Friction)",
        topics: [
            {
                name: "Types & Laws of Friction",
                subtopics: [
                    "Static & kinetic friction",
                    "Limiting friction",
                    "Angle of friction",
                    "Angle of repose",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Pulling vs pushing",
                    "Block on inclined plane",
                    "Two-block system",
                    "Multiple surface friction",
                    "Wedge friction",
                ],
            },
        ],
    },

    {
        chapter: "Work, Energy & Power",
        topics: [
            {
                name: "Work",
                subtopics: [
                    "Work by constant force",
                    "Work by variable force",
                    "Work by gravity",
                    "Work by friction",
                    "Work by spring",
                    "Work in different frames",
                ],
            },
            {
                name: "Energy",
                subtopics: [
                    "Kinetic energy",
                    "Work–Energy theorem",
                    "Conservative forces",
                    "Non-conservative forces",
                ],
            },
            {
                name: "Potential Energy",
                subtopics: [
                    "Gravitational PE",
                    "Elastic PE",
                    "PE curve & energy diagrams",
                ],
            },
            {
                name: "Power",
                subtopics: [
                    "Instantaneous power",
                    "Average power",
                ],
            },
        ],
    },

    {
        chapter: "Circular Motion",
        topics: [
            {
                name: "Kinematics",
                subtopics: [
                    "Angular displacement, velocity, acceleration",
                    "Radial & tangential acceleration",
                    "Total acceleration",
                ],
            },
            {
                name: "Dynamics",
                subtopics: [
                    "Centripetal force",
                    "Newton’s laws in circular motion",
                    "Non-uniform circular motion",
                ],
            },
            {
                name: "Applications",
                subtopics: [
                    "Conical pendulum",
                    "Banking of roads",
                    "Vertical circle",
                    "Oscillation in vertical loop",
                    "Motion on spherical surface",
                    "Circular motion in non-inertial frames",
                    "Circular motion on inclined plane",
                ],
            },
        ],
    },

    {
        chapter: "Impulse & Collision",
        topics: [
            {
                name: "Collision Theory",
                subtopics: [
                    "Coefficient of restitution",
                    "General equation for direct impact",
                    "Oblique collision",
                    "Impact parameter",
                    "Collision of discs",
                    "Collision of wedge & particle",
                ],
            },
            {
                name: "Variable Mass",
                subtopics: [
                    "Variable mass systems",
                    "Rocket propulsion",
                ],
            },
        ],
    },

    /* ======================================================
       ROTATIONAL MECHANICS
    ====================================================== */

    {
        chapter: "RBD Part 1",
        topics: [
            {
                name: "Introduction",
                subtopics: [
                    "Rigid body",
                    "General rigid body motion",
                    "Relative angular velocity",
                    "Types of rotational motion",
                    "Rotation about fixed axis",
                    "Translation + rotation",
                ],
            },
            {
                name: "Instantaneous Axis & Rolling",
                subtopics: [
                    "Instantaneous axis of rotation",
                    "Rolling motion",
                    "Pure rolling",
                    "Constraints (rope, pulley, rod)",
                ],
            },
            {
                name: "Moment of Inertia",
                subtopics: [
                    "Definition of MI",
                    "MI of rod, ring, disc",
                    "MI of lamina",
                    "Parallel & perpendicular axis theorem",
                    "Radius of gyration",
                ],
            },
            {
                name: "Torque & Equilibrium",
                subtopics: [
                    "Torque",
                    "Couple",
                    "Equilibrium of rigid bodies",
                    "Toppling",
                ],
            },
            {
                name: "Rotational Dynamics",
                subtopics: [
                    "Newton’s second law for rotation",
                ],
            },
        ],
    },

    {
        chapter: "RBD Part 2",
        topics: [
            {
                name: "Angular Momentum",
                subtopics: [
                    "Angular momentum",
                    "Angular momentum of system",
                    "Translation + rotation",
                ],
            },
            {
                name: "Impulsive Torque",
                subtopics: [
                    "Angular impulse",
                    "Conservation of angular momentum",
                ],
            },
            {
                name: "Energy in Rotation",
                subtopics: [
                    "Rotational kinetic energy",
                    "Rolling energy",
                    "Work–energy theorem",
                ],
            },
            {
                name: "Rolling on Inclined Plane",
                subtopics: [
                    "Acceleration (energy method)",
                    "Acceleration (angular momentum method)",
                ],
            },
        ],
    },

    /* ======================================================
       GRAVITATION & PROPERTIES OF MATTER
    ====================================================== */

    {
        chapter: "Gravitation",
        topics: [
            {
                name: "Kepler’s Laws",
                subtopics: [
                    "First law",
                    "Second law",
                    "Third law",
                ],
            },
            {
                name: "Gravitational Force",
                subtopics: [
                    "Newton’s law",
                    "Superposition",
                    "Extended bodies",
                ],
            },
            {
                name: "Field & Potential",
                subtopics: [
                    "Gravitational field",
                    "Gravitational potential",
                    "Escape velocity",
                ],
            },
            {
                name: "Satellites",
                subtopics: [
                    "Orbital velocity",
                    "Time period",
                    "Energy of satellite",
                    "Geostationary satellites",
                ],
            },
            {
                name: "Weightlessness",
                subtopics: [
                    "Weightlessness in satellite",
                ],
            },
        ],
    },

    {
        chapter: "Fluid Mechanics",
        topics: [
            {
                name: "Hydrostatics",
                subtopics: [
                    "Pressure",
                    "Pascal’s law",
                    "Force on surfaces",
                ],
            },
            {
                name: "Hydrodynamics",
                subtopics: [
                    "Continuity equation",
                    "Bernoulli’s theorem",
                    "Venturimeter",
                    "Torricelli’s law",
                ],
            },
            {
                name: "Archimedes Principle",
                subtopics: [
                    "Buoyant force",
                    "Floating bodies",
                ],
            },
        ],
    },

    {
        chapter: "Elasticity",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Stress",
                    "Strain",
                    "Elasticity",
                ],
            },
            {
                name: "Elastic Constants",
                subtopics: [
                    "Young’s modulus",
                    "Shear modulus",
                    "Bulk modulus",
                ],
            },
            {
                name: "Elastic Energy",
                subtopics: [
                    "Elastic potential energy",
                ],
            },
        ],
    },

    {
        chapter: "Surface Tension & Viscosity",
        topics: [
            {
                name: "Surface Tension",
                subtopics: [
                    "Surface phenomena",
                    "Capillarity",
                    "Excess pressure",
                ],
            },
            {
                name: "Viscosity",
                subtopics: [
                    "Poiseuille’s law",
                    "Stokes’ law",
                    "Reynolds number",
                ],
            },
        ],
    },

    /* ======================================================
       ELECTRICITY & MAGNETISM
    ====================================================== */

    {
        chapter: "Electrostatics",
        topics: [
            {
                name: "Coulomb’s Law & Electric Field",
                subtopics: [
                    "Electric charge",
                    "Coulomb’s law",
                    "Electric field",
                    "Dipole",
                ],
            },
            {
                name: "Gauss’s Law",
                subtopics: [
                    "Electric flux",
                    "Applications of Gauss’s law",
                ],
            },
            {
                name: "Electric Potential",
                subtopics: [
                    "Potential",
                    "Potential energy",
                    "Motion in electric field",
                ],
            },
            {
                name: "Capacitors",
                subtopics: [
                    "Parallel plate capacitor",
                    "Energy stored",
                    "Capacitor combinations",
                ],
            },
        ],
    },

    {
        chapter: "Current Electricity",
        topics: [
            {
                name: "Basics",
                subtopics: [
                    "Ohm’s law",
                    "Drift velocity",
                    "Resistance",
                ],
            },
            {
                name: "Circuits",
                subtopics: [
                    "Series & parallel circuits",
                    "Kirchhoff’s laws",
                    "Wheatstone bridge",
                ],
            },
            {
                name: "Heating Effect",
                subtopics: [
                    "Joule heating",
                    "Maximum power transfer",
                ],
            },
        ],
    },

    {
        chapter: "Magnetism & EMI",
        topics: [
            {
                name: "Magnetic Field & Forces",
                subtopics: [
                    "Lorentz force",
                    "Motion of charged particle",
                    "Cyclotron",
                ],
            },
            {
                name: "Sources of Magnetic Field",
                subtopics: [
                    "Biot–Savart law",
                    "Ampere’s law",
                ],
            },
            {
                name: "Electromagnetic Induction",
                subtopics: [
                    "Faraday’s laws",
                    "Lenz’s law",
                    "Self & mutual inductance",
                ],
            },
        ],
    },

    {
        chapter: "AC & EM Waves",
        topics: [
            {
                name: "Alternating Current",
                subtopics: [
                    "AC circuits",
                    "RLC resonance",
                    "Transformers",
                ],
            },
            {
                name: "EM Waves",
                subtopics: [
                    "EM spectrum",
                    "Propagation of EM waves",
                ],
            },
        ],
    },

    /* ======================================================
       OPTICS, MODERN PHYSICS
    ====================================================== */

    {
        chapter: "Optics",
        topics: [
            {
                name: "Geometrical Optics",
                subtopics: [
                    "Reflection",
                    "Refraction",
                    "Mirrors & lenses",
                    "Optical instruments",
                ],
            },
            {
                name: "Wave Optics",
                subtopics: [
                    "Interference",
                    "Diffraction",
                    "Polarization",
                ],
            },
        ],
    },

    {
        chapter: "Modern Physics",
        topics: [
            {
                name: "Dual Nature",
                subtopics: [
                    "Photoelectric effect",
                    "de-Broglie waves",
                ],
            },
            {
                name: "Atomic Physics",
                subtopics: [
                    "Bohr model",
                    "X-rays",
                ],
            },
            {
                name: "Nuclear Physics",
                subtopics: [
                    "Radioactivity",
                    "Nuclear reactions",
                ],
            },
            {
                name: "Semiconductors",
                subtopics: [
                    "Diodes",
                    "Transistors",
                    "Logic gates",
                ],
            },
            {
                name: "Communication Systems",
                subtopics: [
                    "Modulation",
                    "Demodulation",
                ],
            },
        ],
    },

];