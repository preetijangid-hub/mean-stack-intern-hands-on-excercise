# Day 22 - Mongoose ODM

## Topic

Mongoose ODM - Schemas, Models, Validation, References, Populate, Timestamps and Lean.

## Objectives

- Understand Mongoose ODM
- Create Mongoose schemas and models
- Apply schema validation
- Create references between User and Task
- Use timestamps
- Use `populate()` to fetch related user data
- Use `lean()` for query results
- Perform CRUD operations

## Models

### User Model

The User model contains:

- Name
- Email
- Age
- Validation rules
- Timestamps

### Task Model

The Task model contains:

- Title
- Description
- Completed status
- User reference
- Timestamps

## Reference

Task documents reference the User model using:

```js
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}