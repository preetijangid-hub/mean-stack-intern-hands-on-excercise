# Day 21 - MongoDB Basics

## Topics Covered

Day 21 focuses on MongoDB fundamentals, CRUD operations, query operators, projection, indexes, and MongoDB Compass.

---

## 1. MongoDB Basics

MongoDB is a NoSQL document database.

MongoDB stores data in flexible JSON-like documents.

### MongoDB Structure

```text
Database
   ↓
Collection
   ↓
Document
   ↓
Fields

SQL vs MongoDB
SQL	MongoDB
Database	Database
Table	Collection
Row	Document
Column	Field
2. Database and Collection

Database used for this exercise:

internshipDB

Collection used:

users
3. CRUD Operations

CRUD stands for:

Create
Read
Update
Delete
Create
db.users.insertOne({
  name: "Preeti",
  email: "preeti@example.com",
  age: 22,
  city: "Jaipur"
});

Multiple documents:

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
  }
]);
4. Read

Find all documents:

db.users.find();

Find one document:

db.users.findOne();

Find users from Jaipur:

db.users.find({
  city: "Jaipur"
});
5. Query Operators
$gt

Greater than:

db.users.find({
  age: { $gt: 21 }
});
$gte

Greater than or equal:

db.users.find({
  age: { $gte: 24 }
});
$lt

Less than:

db.users.find({
  age: { $lt: 25 }
});
$lte

Less than or equal:

db.users.find({
  age: { $lte: 24 }
});
$in

Match any value from a list:

db.users.find({
  city: { $in: ["Jaipur", "Delhi"] }
});
$nin

Exclude specified values:

db.users.find({
  city: { $nin: ["Delhi", "Mumbai"] }
});
6. Multiple Conditions

Example:

db.users.find({
  age: { $gt: 21 },
  city: "Jaipur"
});

This returns users whose:

age > 21
AND
city = Jaipur
7. $or Operator
db.users.find({
  $or: [
    { city: "Jaipur" },
    { city: "Delhi" }
  ]
});
8. Projection

Projection is used to select which fields should be returned.

Example:

db.users.find(
  {},
  {
    name: 1,
    email: 1,
    _id: 0
  }
);
Projection Rules
1 = Include field
0 = Exclude field
9. Update
Update One
db.users.updateOne(
  { name: "Preeti" },
  {
    $set: {
      age: 23
    }
  }
);
Update Many
db.users.updateMany(
  { city: "Delhi" },
  {
    $set: {
      country: "India"
    }
  }
);
Increment
db.users.updateOne(
  { name: "Preeti" },
  {
    $inc: {
      age: 1
    }
  }
);
10. Delete

Delete one document:

db.users.deleteOne({
  name: "Aman"
});

Delete multiple documents:

db.users.deleteMany({
  city: "Mumbai"
});

deleteMany({}) should not be used during practice because it can delete all documents in the collection.

11. Indexes

Indexes improve query performance for suitable queries.

Create an index on email:

db.users.createIndex({
  email: 1
});

View indexes:

db.users.getIndexes();
Index Values
1  = Ascending
-1 = Descending
12. MongoDB Compass

MongoDB Compass is a graphical user interface for MongoDB.

Using Compass, we can:

Create databases
Create collections
Insert documents
View documents
Filter documents
Update documents
Delete documents
Create indexes
View indexes

13. Hands-on Exercise

Database
internshipDB
Collection
users
Sample Documents
{
  "name": "Preeti",
  "email": "preeti@example.com",
  "age": 22,
  "city": "Jaipur"
}
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "age": 25,
  "city": "Delhi"
}
{
  "name": "Neha",
  "email": "neha@example.com",
  "age": 21,
  "city": "Mumbai"
}
{
  "name": "Aman",
  "email": "aman@example.com",
  "age": 28,
  "city": "Jaipur"
}
{
  "name": "Priya",
  "email": "priya@example.com",
  "age": 24,
  "city": "Delhi"
}
14. Compass Filtered Queries
Filter by city
{
  "city": "Jaipur"
}
Filter using $gt
{
  "age": {
    "$gt": 21
  }
}
Filter using $in
{
  "city": {
    "$in": ["Jaipur", "Delhi"]
  }
}
15. Projection in Compass

Project:

{
  "name": 1,
  "email": 1,
  "_id": 0
}
16. Index Exercise

Create an index on:

email

Query:

db.users.createIndex({
  email: 1
});

Verify:

db.users.getIndexes();

After creating the index, re-run a filtered query.

Example:

db.users.find({
  age: { $gt: 21 }
});
17. Day 21 Learning Outcome

After completing this exercise, I learned:

MongoDB fundamentals
Database and collections
Documents and fields
CRUD operations
Query operators
$gt
$gte
$lt
$lte
$in
$nin
$or
Projection
Update operations
Delete operations
Index basics
MongoDB Compass
Filtered queries in Compass

Files
Day-21(MONGODB-BASICS)
│
├── README.md
└── mongodb-queries.js
Status

Day 21 MongoDB Basics hands-on completed.

---
