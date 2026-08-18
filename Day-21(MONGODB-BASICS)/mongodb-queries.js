// DAY 21 - MONGODB BASICS
// CRUD + QUERY OPERATORS + PROJECTION + INDEXES

// 1. DATABASE

// Select/create database
db = db.getSiblingDB("internshipDB");

// 2. CREATE COLLECTION

// Create users collection
db.createCollection("users");

// 3. CREATE - INSERT ONE

db.users.insertOne({
  name: "Preeti",
  email: "preeti@example.com",
  age: 22,
  city: "Jaipur"
});

// 4. CREATE - INSERT MANY

db.users.insertMany([
  {
    name: "Rahul",
    email: "rahul@example.com",
    age: 25,
    city: "Delhi"
  },
  {
    name: "Neha",
    email: "neha@example.com",
    age: 21,
    city: "Mumbai"
  },
  {
    name: "Aman",
    email: "aman@example.com",
    age: 28,
    city: "Jaipur"
  },
  {
    name: "Priya",
    email: "priya@example.com",
    age: 24,
    city: "Delhi"
  }
]);

// 5. READ - FIND ALL

db.users.find();

// 6. READ - FIND ONE

db.users.findOne();

// 7. FILTER - EXACT MATCH

db.users.find({
  city: "Jaipur"
});

// 8. QUERY OPERATOR - $gt
// Greater Than

db.users.find({
  age: { $gt: 21 }
});

// 9. QUERY OPERATOR - $gte
// Greater Than or Equal

db.users.find({
  age: { $gte: 24 }
});

// 10. QUERY OPERATOR - $lt
// Less Than

db.users.find({
  age: { $lt: 25 }
});

// 11. QUERY OPERATOR - $lte
// Less Than or Equal

db.users.find({
  age: { $lte: 24 }
});

// 12. QUERY OPERATOR - $in

db.users.find({
  city: { $in: ["Jaipur", "Delhi"] }
});

// 13. QUERY OPERATOR - $nin

db.users.find({
  city: { $nin: ["Delhi", "Mumbai"] }
});

// 14. MULTIPLE CONDITIONS

db.users.find({
  age: { $gt: 21 },
  city: "Jaipur"
});

// 15. $or OPERATOR

db.users.find({
  $or: [
    { city: "Jaipur" },
    { city: "Delhi" }
  ]
});

// 16. PROJECTION
// Show only name and email

db.users.find(
  {},
  {
    name: 1,
    email: 1,
    _id: 0
  }
);

// 17. UPDATE ONE

db.users.updateOne(
  { name: "Preeti" },
  {
    $set: {
      age: 23
    }
  }
);

// 18. UPDATE MANY

db.users.updateMany(
  { city: "Delhi" },
  {
    $set: {
      country: "India"
    }
  }
);

// 19. INCREMENT VALUE

db.users.updateOne(
  { name: "Preeti" },
  {
    $inc: {
      age: 1
    }
  }
);

// 20. DELETE ONE

// Example: delete one specific user
db.users.deleteOne({
  name: "Aman"
});

// 21. CREATE INDEX

db.users.createIndex({
  email: 1
});

// 22. VIEW INDEXES

db.users.getIndexes();

// 23. FILTERED QUERY AFTER INDEX
// Re-run query after creating index

db.users.find({
  age: { $gt: 21 }
});

// 24. COUNT DOCUMENTS

db.users.countDocuments();

// 25. SORT

// Ascending age
db.users.find().sort({
  age: 1
});

// Descending age
db.users.find().sort({
  age: -1
});