// Filter students with marks above 75

const students = [
    { name: "Aman", marks: 65 },
    { name: "Preeti", marks: 90 },
    { name: "Neha", marks: 80 },
    { name: "Rahul", marks: 70 }
];

const topStudents = students.filter(student => student.marks > 75);

console.log(topStudents);