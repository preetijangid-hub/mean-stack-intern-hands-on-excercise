const mongoose = require("mongoose");

const User = require("./models/User");
const Task = require("./models/Task");

const MONGO_URI = "mongodb://127.0.0.1:27017/day22_mongoose";

async function main() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected successfully");

    // ---------------- CREATE USER ----------------
    const user = await User.create({
      name: "Preeti",
      email: "preeti@example.com",
      age: 22,
    });

    console.log("User created:", user);

    // ---------------- CREATE TASK ----------------
    const task = await Task.create({
      title: "Learn Mongoose ODM",
      description: "Practice schemas, models, refs and populate",
      user: user._id,
    });

    console.log("Task created:", task);

    // ---------------- READ + POPULATE ----------------
    const tasks = await Task.find()
      .populate("user")
      .lean();

    console.log("Tasks with user:", tasks);

    // ---------------- UPDATE ----------------
    const updatedTask = await Task.findByIdAndUpdate(
     task._id,
  {
    completed: true,
  },
  {
    returnDocument: "after",
    runValidators: true,
  }
).populate("user");

    console.log("Updated task:", updatedTask);

    // ---------------- DELETE ----------------
    const deletedTask = await Task.findByIdAndDelete(task._id);

    console.log("Deleted task:", deletedTask);

    // ---------------- DELETE USER ----------------
    await User.findByIdAndDelete(user._id);

    console.log("User deleted");

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

main();