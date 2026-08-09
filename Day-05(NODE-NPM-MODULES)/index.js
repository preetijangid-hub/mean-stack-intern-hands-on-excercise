const fs = require("fs");

const inputData = fs.readFileSync("./data/input.json", "utf-8");

const students = JSON.parse(inputData);

const updatedStudents = students.map((student) => {
  return {
    ...student,
    status: student.marks >= 80 ? "Pass" : "Needs Improvement"
  };
});

fs.writeFileSync(
  "./data/output.json",
  JSON.stringify(updatedStudents, null, 2)
);

console.log("Output file created successfully!");