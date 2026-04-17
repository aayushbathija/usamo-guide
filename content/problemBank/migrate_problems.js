const fs = require('fs');
const path = require('path');

const SOURCE_FILE = './content/problemBank/bank.json';
const UNMAPPED_FILE = './unmapped_problems.json';

const categoryMap = {
  "Arithmetic and Number Theory Basics": "content/1_Foundations/Arithmetic_Number_Theory_Basics.problems.json",
  "Arithmetic Sequences": "content/1_Foundations/Arithmetic_Sequences.problems.json",
  "Exponent Rules": "content/1_Foundations/Exponent_Rules.problems.json",
  "Geometry Basics": "content/1_Foundations/Geometry_Basics.problems.json",
  "Word Problems": "content/1_Foundations/Word_Problems.problems.json",
  "Algebra Basics": "content/1_Foundations/Algebra_Basics.problems.json",
  "Telescoping Sums and Products": "content/1_Foundations/Telescoping.problems.json",
  "Counting Fundamentals": "content/1_Foundations/Counting_Fundamentals.problems.json",
  "Mean, Median, Mode, and Harmonic Mean": "content/1_Foundations/Mean_Median_Mode_Harmonic.problems.json",
  "Inequalities Foundations": "content/1_Foundations/Inequalities_Foundations.json",
  "Introduction to Probability": "content/1_Foundations/Intro_Probability.problems.json",
  "Linear Diophantine Equations": "content/1_Foundations/Linear_Diophantine_Equations.json",
  "Geometric Sequences": "content/1_Foundations/Geometric_Sequences.problems.json",
  "Systems of Equations": "content/1_Foundations/Systems_of_Equations.problems.json",
  "Inclusion-Exclusion": "content/1_Foundations/Inclusion_Exclusion.problems.json",
  "Coordinate Geometry Basics": "content/1_Foundations/Coordinate_Geometry_Basics.problems.json",
  "Triangle Area Formulas": "content/1_Foundations/Triangle_Area_Formulas.problems.json",
  "Pigeonhole Principle": "content/1_Foundations/Pigeonhole_Principles.problems.json",
  "Triangle Angle Sum": "content/1_Foundations/Triangle_Angle_Sum.problems.json",
  "Right Triangles and Pythagorean Triples": "content/1_Foundations/Right_Triangles.problems.json",
  "Special Quadrilaterals": "content/1_Foundations/Special_Quadrilaterals.problems.json",
  "Stars and Bars": "content/1_Foundations/Stars_and_Bars.problems.json",
  "Special Triangles": "content/1_Foundations/Special_Triangles.problems.json",
  "Special Right Triangles": "content/1_Foundations/Special_Right_Triangles.problems.json",
  "Triangle Similarity": "content/1_Foundations/Similarity_Basics.problems.json"
};

const main = () => {
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`Source file ${SOURCE_FILE} not found!`);
    return;
  }

  const rawData = fs.readFileSync(SOURCE_FILE, 'utf8');
  let bankData;
  try {
    bankData = JSON.parse(rawData);
  } catch (e) {
    console.error("Error parsing ajhsme_all.json", e);
    return;
  }

  const unmapped = [];
  const modifiedFiles = new Set();
  
  // Create a map to hold the parsed target files in memory
  const targets = {};

  bankData.exams.forEach(examObj => {
    examObj.problems.forEach(p => {
      const cat = p.categorization;
      const targetPath = categoryMap[cat];

      if (!targetPath) {
        unmapped.push(p);
        return;
      }

      if (!fs.existsSync(targetPath)) {
        console.warn(`Target file ${targetPath} does not exist for category ${cat}! Dropping to unmapped.`);
        unmapped.push(p);
        return;
      }

      // Read target if not loaded
      if (!targets[targetPath]) {
        try {
          targets[targetPath] = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        } catch(e) {
          fs.appendFileSync('parse_errors.log', `Error parsing ${targetPath}: ${e.message}\n`);
          // Skip mapping this problem since target is invalid
          unmapped.push(p);
          return;
        }
      }

      // Convert answers to interaction object format
      let interaction = { type: "none" };
      if (p.answerChoices && p.answer) {
        // Find correct index
        const letters = ["A", "B", "C", "D", "E"];
        const correctIndex = letters.indexOf(p.answer);
        if (correctIndex !== -1 && p.answerChoices.length > 0) {
          interaction = {
            type: "mcq",
            choices: p.answerChoices,
            correctIndex
          };
        }
      }

      // Construct final schema-compliant problem
      const newProblem = {
        uniqueId: p.uniqueId,
        name: p.name,
        url: p.url,
        source: p.source,
        difficulty: p.difficulty || "Normal",
        isStarred: p.isStarred || false,
        tags: p.tags || [],
        statement: p.statement,
        interaction: interaction,
        solutionMetadata: p.solutionMetadata || { kind: "none" }
      };

      // Append to "practice" array avoiding duplicates
      if (!targets[targetPath].practice) {
        targets[targetPath].practice = [];
      }
      
      const isDuplicate = targets[targetPath].practice.some(existing => existing.uniqueId === newProblem.uniqueId);
      if (!isDuplicate) {
        targets[targetPath].practice.push(newProblem);
        modifiedFiles.add(targetPath);
      } else {
        // We can just silently skip or log if you ever want to see duplicates
      }
    });
  });

  // Save modified files
  modifiedFiles.forEach(file => {
    fs.writeFileSync(file, JSON.stringify(targets[file], null, 2));
    console.log(`Updated ${file}`);
  });

  // Save unmapped
  if (unmapped.length > 0) {
    fs.writeFileSync(UNMAPPED_FILE, JSON.stringify(unmapped, null, 2));
    console.log(`Saved ${unmapped.length} unmapped problems to ${UNMAPPED_FILE}`);
  }

  console.log("Migration complete!");
};

main();
