export type ChemistryTopic = {
  name: string;
  subtopics: string[];
};

export type ChemistryChapter = {
  chapter: string;
  topics: ChemistryTopic[];
};

export const CHEMISTRY_SYLLABUS: ChemistryChapter[] = [

/* ======================================================
   PHYSICAL CHEMISTRY
====================================================== */

{
  chapter: "Some Basic Concepts in Chemistry",
  topics: [
    { name: "Matter", subtopics: ["Nature of Matter"] },
    { name: "Atomic Theory", subtopics: ["Dalton’s Atomic Theory"] },
    { name: "Basics", subtopics: ["Atom, Molecule, Element, Compound"] },
    {
      name: "Measurements",
      subtopics: [
        "Physical Quantities & SI Units",
        "Precision, Accuracy, Significant Figures",
      ],
    },
    { name: "Laws", subtopics: ["Laws of Chemical Combination"] },
    {
      name: "Mole Concept",
      subtopics: ["Atomic & Molecular Mass", "Mole, Molar Mass"],
    },
    {
      name: "Stoichiometry",
      subtopics: [
        "Empirical & Molecular Formula",
        "Chemical Equations & Calculations",
      ],
    },
  ],
},

{
  chapter: "States of Matter",
  topics: [
    { name: "Classification", subtopics: ["Solid, Liquid, Gas"] },
    { name: "Gaseous State", subtopics: ["Properties of Gases"] },
    {
      name: "Gas Laws",
      subtopics: [
        "Boyle, Charles, Avogadro Laws",
        "Dalton & Graham Laws",
      ],
    },
    { name: "Ideal Gas", subtopics: ["Ideal Gas Equation"] },
    {
      name: "Kinetic Theory",
      subtopics: [
        "Postulates of KTG",
        "RMS, Average & Most Probable Speed",
      ],
    },
    { name: "Real Gases", subtopics: ["van der Waals Equation"] },
    {
      name: "Liquid State",
      subtopics: ["Vapour Pressure, Viscosity, Surface Tension"],
    },
    {
      name: "Solid State",
      subtopics: [
        "Types of Solids",
        "Unit Cell & Packing",
        "Bragg’s Law",
      ],
    },
    {
      name: "Properties",
      subtopics: ["Electrical & Magnetic Properties"],
    },
  ],
},

{
  chapter: "Atomic Structure",
  topics: [
    {
      name: "Atomic Models",
      subtopics: ["Thomson Model", "Rutherford Model"],
    },
    {
      name: "Radiation",
      subtopics: ["Electromagnetic Radiation", "Photoelectric Effect"],
    },
    {
      name: "Bohr Model",
      subtopics: ["Postulates & Limitations"],
    },
    {
      name: "Quantum Theory",
      subtopics: [
        "de-Broglie Equation",
        "Heisenberg Uncertainty Principle",
      ],
    },
    {
      name: "Orbitals",
      subtopics: [
        "Quantum Numbers",
        "Shapes of s, p, d Orbitals",
      ],
    },
    {
      name: "Electronic Configuration",
      subtopics: ["Aufbau, Pauli & Hund Rules"],
    },
  ],
},

{
  chapter: "Chemical Bonding",
  topics: [
    {
      name: "Ionic Bond",
      subtopics: ["Formation & Lattice Energy"],
    },
    {
      name: "Covalent Bond",
      subtopics: ["Electronegativity & Dipole Moment"],
    },
    { name: "VSEPR", subtopics: ["Shapes of Molecules"] },
    {
      name: "Hybridization",
      subtopics: ["sp, sp², sp³, sp³d"],
    },
    { name: "Resonance", subtopics: ["Resonance Structures"] },
    {
      name: "MOT",
      subtopics: ["Molecular Orbital Theory", "Bond Order & Bond Energy"],
    },
  ],
},

{
  chapter: "Chemical Thermodynamics",
  topics: [
    { name: "Basics", subtopics: ["System & Surroundings"] },
    {
      name: "First Law",
      subtopics: ["Internal Energy & Enthalpy"],
    },
    { name: "Thermochemistry", subtopics: ["Hess’s Law"] },
    {
      name: "Enthalpy",
      subtopics: ["Bond, Formation & Combustion"],
    },
    { name: "Second Law", subtopics: ["Entropy"] },
    {
      name: "Gibbs Energy",
      subtopics: ["ΔG & Equilibrium Constant"],
    },
  ],
},

{
  chapter: "Solutions",
  topics: [
    {
      name: "Concentration",
      subtopics: ["Molarity, Molality, Mole Fraction"],
    },
    { name: "Vapour Pressure", subtopics: ["Raoult’s Law"] },
    {
      name: "Colligative Properties",
      subtopics: [
        "RLVP",
        "ΔTf",
        "ΔTb",
        "Osmotic Pressure",
      ],
    },
    {
      name: "Abnormal Behaviour",
      subtopics: ["van’t Hoff Factor"],
    },
  ],
},

{
  chapter: "Equilibrium",
  topics: [
    {
      name: "Chemical Equilibrium",
      subtopics: ["Law of Mass Action"],
    },
    {
      name: "Equilibrium Constant",
      subtopics: ["Kp & Kc"],
    },
    {
      name: "Le Chatelier",
      subtopics: ["Effect of Temperature & Pressure"],
    },
    {
      name: "Ionic Equilibrium",
      subtopics: ["Acids & Bases", "pH, Buffer, Solubility Product"],
    },
  ],
},

{
  chapter: "Electrochemistry",
  topics: [
    { name: "Redox", subtopics: ["Oxidation & Reduction"] },
    {
      name: "Electrochemical Cells",
      subtopics: ["Galvanic & Electrolytic Cells"],
    },
    {
      name: "Nernst Equation",
      subtopics: ["Cell Potential"],
    },
    {
      name: "Applications",
      subtopics: ["Batteries & Fuel Cells"],
    },
  ],
},

{
  chapter: "Chemical Kinetics",
  topics: [
    { name: "Rate", subtopics: ["Rate Law & Order"] },
    {
      name: "Integrated Rate",
      subtopics: ["Zero & First Order"],
    },
    {
      name: "Temperature Effect",
      subtopics: ["Arrhenius Equation"],
    },
  ],
},

{
  chapter: "Surface Chemistry",
  topics: [
    {
      name: "Adsorption",
      subtopics: ["Physisorption & Chemisorption"],
    },
    { name: "Colloids", subtopics: ["Types & Properties"] },
    { name: "Emulsions", subtopics: ["Preparation & Uses"] },
  ],
},

/* ======================================================
   INORGANIC CHEMISTRY
====================================================== */

{
  chapter: "Periodicity",
  topics: [
    { name: "Periodic Law", subtopics: ["Modern Periodic Law"] },
    {
      name: "Periodic Table",
      subtopics: ["s, p, d & f Block Elements"],
    },
    {
      name: "Periodic Trends",
      subtopics: [
        "Atomic & Ionic Radii",
        "Ionization Enthalpy",
        "Electron Gain Enthalpy",
        "Valency & Oxidation State",
      ],
    },
    { name: "Reactivity", subtopics: ["Chemical Reactivity Trends"] },
  ],
},

{
  chapter: "Metallurgy",
  topics: [
    { name: "Occurrence", subtopics: ["Minerals & Ores"] },
    {
      name: "Extraction",
      subtopics: [
        "Concentration of Ores",
        "Reduction (Chemical & Electrolytic)",
      ],
    },
    { name: "Refining", subtopics: ["Refining of Metals"] },
    {
      name: "Case Studies",
      subtopics: ["Extraction of Al, Cu, Zn & Fe"],
    },
    {
      name: "Principles",
      subtopics: [
        "Thermodynamic & Electrochemical Principles",
      ],
    },
  ],
},

{
  chapter: "Hydrogen",
  topics: [
    { name: "Position", subtopics: ["Position in Periodic Table"] },
    { name: "Isotopes", subtopics: ["Isotopes of Hydrogen"] },
    { name: "Preparation", subtopics: ["Preparation of Hydrogen"] },
    {
      name: "Water",
      subtopics: ["Properties of Water & Heavy Water"],
    },
    {
      name: "Peroxide",
      subtopics: ["Hydrogen Peroxide – Properties & Uses"],
    },
    { name: "Energy", subtopics: ["Hydrogen as a Fuel"] },
  ],
},

{
  chapter: "S-Block Elements",
  topics: [
    { name: "Groups", subtopics: ["Group 1 & Group 2 Overview"] },
    {
      name: "Trends",
      subtopics: ["Physical & Chemical Properties"],
    },
    { name: "Anomalies", subtopics: ["Anomalous Behaviour"] },
    {
      name: "Compounds",
      subtopics: ["Na₂CO₃ & NaOH"],
    },
    {
      name: "Industrial",
      subtopics: ["Lime, Cement & Plaster of Paris"],
    },
    {
      name: "Biological",
      subtopics: ["Importance of Na, K, Mg, Ca"],
    },
  ],
},

{
  chapter: "P-Block Elements",
  topics: [
    {
      name: "Overview",
      subtopics: ["General Trends (Group 13–18)"],
    },
    {
      name: "Group 13",
      subtopics: ["Boron & Aluminium Compounds"],
    },
    {
      name: "Group 14",
      subtopics: ["Carbon, Silicates & Zeolites"],
    },
    {
      name: "Group 15",
      subtopics: ["Nitrogen & Phosphorus Compounds"],
    },
    {
      name: "Group 16",
      subtopics: ["Sulphur & Sulphuric Acid"],
    },
    {
      name: "Group 17",
      subtopics: ["Halogens & Interhalogen Compounds"],
    },
    {
      name: "Group 18",
      subtopics: ["Noble Gases & Xenon Compounds"],
    },
  ],
},

{
  chapter: "d- & f-Block Elements",
  topics: [
    {
      name: "d-Block Elements",
      subtopics: [
        "General Characteristics",
        "Oxidation State, Colour, Magnetism",
        "KMnO₄ & K₂Cr₂O₇",
      ],
    },
    {
      name: "f-Block Elements",
      subtopics: [
        "Lanthanoids & Lanthanoid Contraction",
        "Actinoids & Oxidation States",
      ],
    },
  ],
},

{
  chapter: "Coordination Compounds",
  topics: [
    { name: "Basics", subtopics: ["Werner’s Theory"] },
    {
      name: "Ligands",
      subtopics: ["Ligands & Denticity"],
    },
    {
      name: "Nomenclature",
      subtopics: ["IUPAC Naming"],
    },
    {
      name: "Isomerism",
      subtopics: ["Structural & Stereoisomerism"],
    },
    {
      name: "Bonding",
      subtopics: ["VBT & CFT"],
    },
    {
      name: "Applications",
      subtopics: ["Biological & Industrial Importance"],
    },
  ],
},

{
  chapter: "Environmental Chemistry",
  topics: [
    {
      name: "Pollution",
      subtopics: ["Air, Water & Soil Pollution"],
    },
    {
      name: "Air Pollution",
      subtopics: ["Greenhouse Effect & Acid Rain"],
    },
    { name: "Ozone", subtopics: ["Ozone Depletion"] },
    {
      name: "Water Pollution",
      subtopics: ["Sources & Prevention"],
    },
    {
      name: "Soil Pollution",
      subtopics: ["Pesticides & Control Measures"],
    },
  ],
},

/* ======================================================
   ORGANIC CHEMISTRY
====================================================== */

{
  chapter: "Purification & Characterisation",
  topics: [
    {
      name: "Purification",
      subtopics: [
        "Crystallization",
        "Sublimation",
        "Distillation",
        "Differential Extraction",
        "Chromatography",
      ],
    },
    {
      name: "Qualitative Analysis",
      subtopics: ["Detection of N, S, Halogens"],
    },
    {
      name: "Quantitative Analysis",
      subtopics: [
        "Estimation of C & H",
        "Estimation of N, Halogens, S, P",
      ],
    },
    {
      name: "Calculations",
      subtopics: ["Empirical & Molecular Formula"],
    },
  ],
},

{
  chapter: "Basic Principles of Organic Chemistry",
  topics: [
    { name: "Structure", subtopics: ["Tetravalency of Carbon"] },
    {
      name: "Hybridization",
      subtopics: ["sp, sp², sp³"],
    },
    {
      name: "Classification",
      subtopics: ["Functional Groups"],
    },
    {
      name: "Homologous Series",
      subtopics: ["Concept & Properties"],
    },
    {
      name: "Isomerism",
      subtopics: [
        "Structural Isomerism",
        "Stereoisomerism",
      ],
    },
    {
      name: "Nomenclature",
      subtopics: ["Trivial & IUPAC"],
    },
    {
      name: "Bond Fission",
      subtopics: ["Homolytic & Heterolytic"],
    },
    {
      name: "Intermediates",
      subtopics: [
        "Free Radicals",
        "Carbocations",
        "Carbanions",
      ],
    },
    {
      name: "Effects",
      subtopics: [
        "Inductive Effect",
        "Resonance",
        "Hyperconjugation",
      ],
    },
  ],
},

{
  chapter: "Hydrocarbons",
  topics: [
    {
      name: "Alkanes",
      subtopics: [
        "Preparation & Properties",
        "Conformations of Ethane",
        "Halogenation Mechanism",
      ],
    },
    {
      name: "Alkenes",
      subtopics: [
        "Geometrical Isomerism",
        "Electrophilic Addition",
      ],
    },
    {
      name: "Alkynes",
      subtopics: ["Acidic Character & Reactions"],
    },
    {
      name: "Aromatic",
      subtopics: [
        "Benzene Structure & Aromaticity",
        "Electrophilic Substitution",
      ],
    },
  ],
},

{
  chapter: "Haloalkanes & Haloarenes",
  topics: [
    { name: "Preparation", subtopics: ["General Methods"] },
    {
      name: "Properties",
      subtopics: ["Physical & Chemical"],
    },
    { name: "Bonding", subtopics: ["Nature of C–X Bond"] },
    {
      name: "Reactions",
      subtopics: ["SN1 & SN2 Mechanism"],
    },
    { name: "Uses", subtopics: ["Environmental Effects"] },
  ],
},

{
  chapter: "Oxygen Compounds",
  topics: [
    {
      name: "Alcohols",
      subtopics: [
        "Classification & Reactions",
        "Dehydration Mechanism",
      ],
    },
    {
      name: "Phenols",
      subtopics: ["Acidic Nature & Reactions"],
    },
    {
      name: "Ethers",
      subtopics: ["Structure & Properties"],
    },
    {
      name: "Aldehydes & Ketones",
      subtopics: [
        "Carbonyl Group",
        "Nucleophilic Addition",
        "Aldol, Cannizzaro, Haloform",
      ],
    },
    {
      name: "Carboxylic Acids",
      subtopics: ["Acidic Strength & Factors"],
    },
  ],
},

{
  chapter: "Nitrogen Compounds",
  topics: [
    {
      name: "Amines",
      subtopics: [
        "Classification & Basicity",
        "Identification Tests",
      ],
    },
    {
      name: "Diazonium Salts",
      subtopics: ["Preparation & Importance"],
    },
  ],
},

{
  chapter: "Polymers",
  topics: [
    {
      name: "Basics",
      subtopics: ["Classification of Polymers"],
    },
    {
      name: "Polymerization",
      subtopics: ["Addition & Condensation"],
    },
    {
      name: "Rubber",
      subtopics: ["Natural & Synthetic Rubber"],
    },
    {
      name: "Important Polymers",
      subtopics: [
        "Polythene",
        "Nylon",
        "Polyester",
        "Bakelite",
      ],
    },
  ],
},

{
  chapter: "Biomolecules",
  topics: [
    { name: "Carbohydrates", subtopics: ["Glucose & Fructose"] },
    { name: "Proteins", subtopics: ["Structure & Denaturation"] },
    { name: "Enzymes", subtopics: ["Functions"] },
    {
      name: "Vitamins",
      subtopics: ["Classification & Functions"],
    },
    {
      name: "Nucleic Acids",
      subtopics: ["DNA & RNA"],
    },
  ],
},

{
  chapter: "Chemistry in Everyday Life",
  topics: [
    {
      name: "Medicines",
      subtopics: ["Analgesics, Antibiotics"],
    },
    {
      name: "Food",
      subtopics: ["Preservatives & Sweeteners"],
    },
    {
      name: "Cleansing Agents",
      subtopics: ["Soaps & Detergents"],
    },
  ],
},

{
  chapter: "Practical Chemistry",
  topics: [
    {
      name: "Analysis",
      subtopics: ["Detection of Extra Elements"],
    },
    {
      name: "Functional Groups",
      subtopics: ["Identification Tests"],
    },
    {
      name: "Preparations",
      subtopics: ["Organic & Inorganic Compounds"],
    },
    {
      name: "Volumetric Analysis",
      subtopics: ["Acid–Base & Redox Titrations"],
    },
    {
      name: "Salt Analysis",
      subtopics: ["Cations & Anions"],
    },
    {
      name: "Experiments",
      subtopics: ["Thermochemistry & Kinetics"],
    },
  ],
},

];
