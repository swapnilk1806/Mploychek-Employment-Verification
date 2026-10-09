require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/mploychek";


// ============================================================
// USER SCHEMA
// ============================================================

const userSchema = new mongoose.Schema(
  {
    userId: String,

    password: String,

    name: String,

    email: String,

    role: String,

    status: String
  },
  {
    timestamps: true
  }
);


// ============================================================
// RECORD SCHEMA
// ============================================================

const recordSchema = new mongoose.Schema(
  {
    userId: String,

    candidateName: String,

    department: String,

    verificationType: String,

    status: String,

    submittedOn: String
  },
  {
    timestamps: true
  }
);


const User =
  mongoose.model(
    "User",
    userSchema
  );


const Record =
  mongoose.model(
    "Record",
    recordSchema
  );


// ============================================================
// SEED DATABASE
// ============================================================

async function seedDatabase() {

  try {

    console.log("");
    console.log(
      "Connecting to MongoDB..."
    );

    await mongoose.connect(
      MONGO_URI
    );

    console.log(
      "MongoDB connected."
    );


    // ========================================================
    // CLEAR EXISTING DATA
    // ========================================================

    await User.deleteMany({});

    await Record.deleteMany({});


    // ========================================================
    // DEFAULT USERS
    // ========================================================

    const users = [

      // GENERAL USER 1

      {
        userId: "user1",

        password: "user123",

        name: "Swapnil Kadam",

        email:
          "swapnil@mploychek.com",

        role: "General User",

        status: "Active"
      },


      // GENERAL USER 2

      {
        userId: "user2",

        password: "user123",

        name: "Rahul Sharma",

        email:
          "rahul@mploychek.com",

        role: "General User",

        status: "Active"
      },


      // GENERAL USER 3

      {
        userId: "user3",

        password: "user123",

        name: "Priya Patel",

        email:
          "priya@mploychek.com",

        role: "General User",

        status: "Active"
      },


      // GENERAL USER 4

      {
        userId: "user4",

        password: "user123",

        name: "Amit Verma",

        email:
          "amit@mploychek.com",

        role: "General User",

        status: "Active"
      },


      // GENERAL USER 5

      {
        userId: "user5",

        password: "user123",

        name: "Sneha Joshi",

        email:
          "sneha@mploychek.com",

        role: "General User",

        status: "Active"
      },


      // ADMIN

      {
        userId: "admin",

        password: "admin123",

        name: "Admin User",

        email:
          "admin@mploychek.com",

        role: "Admin",

        status: "Active"
      }

    ];


    await User.insertMany(
      users
    );


    // ========================================================
    // DEFAULT RECORDS
    // ========================================================

    const records = [

      // USER 1

      {
        userId: "user1",

        candidateName:
          "Rahul Sharma",

        department:
          "Engineering",

        verificationType:
          "Employment",

        status:
          "Completed",

        submittedOn:
          "2026-10-01"
      },

      {
        userId: "user1",

        candidateName:
          "Priya Patel",

        department:
          "Human Resources",

        verificationType:
          "Education",

        status:
          "In Progress",

        submittedOn:
          "2026-10-02"
      },

      {
        userId: "user1",

        candidateName:
          "Amit Verma",

        department:
          "Finance",

        verificationType:
          "Address",

        status:
          "Pending",

        submittedOn:
          "2026-10-03"
      },


      // USER 2

      {
        userId: "user2",

        candidateName:
          "Sneha Joshi",

        department:
          "Operations",

        verificationType:
          "Employment",

        status:
          "Completed",

        submittedOn:
          "2026-10-04"
      },

      {
        userId: "user2",

        candidateName:
          "Karan Mehta",

        department:
          "Sales",

        verificationType:
          "Education",

        status:
          "Completed",

        submittedOn:
          "2026-10-05"
      },

      {
        userId: "user2",

        candidateName:
          "Neha Singh",

        department:
          "Marketing",

        verificationType:
          "Identity",

        status:
          "In Progress",

        submittedOn:
          "2026-10-06"
      },


      // USER 3

      {
        userId: "user3",

        candidateName:
          "Rohit Patil",

        department:
          "Engineering",

        verificationType:
          "Employment",

        status:
          "Completed",

        submittedOn:
          "2026-10-01"
      },

      {
        userId: "user3",

        candidateName:
          "Pooja Shah",

        department:
          "Design",

        verificationType:
          "Education",

        status:
          "Pending",

        submittedOn:
          "2026-10-07"
      },


      // USER 4

      {
        userId: "user4",

        candidateName:
          "Vikas More",

        department:
          "Technology",

        verificationType:
          "Address",

        status:
          "Completed",

        submittedOn:
          "2026-10-02"
      },

      {
        userId: "user4",

        candidateName:
          "Anjali Deshmukh",

        department:
          "Finance",

        verificationType:
          "Employment",

        status:
          "In Progress",

        submittedOn:
          "2026-10-05"
      },


      // USER 5

      {
        userId: "user5",

        candidateName:
          "Akash Jadhav",

        department:
          "Engineering",

        verificationType:
          "Identity",

        status:
          "Completed",

        submittedOn:
          "2026-10-03"
      },

      {
        userId: "user5",

        candidateName:
          "Riya Kulkarni",

        department:
          "Human Resources",

        verificationType:
          "Employment",

        status:
          "Pending",

        submittedOn:
          "2026-10-07"
      }

    ];


    await Record.insertMany(
      records
    );


    // ========================================================
    // SUCCESS
    // ========================================================

    console.log("");
    console.log(
      "=========================================="
    );

    console.log(
      "       DATABASE SEEDED SUCCESSFULLY"
    );

    console.log(
      "=========================================="
    );

    console.log("");

    console.log(
      "Users created: 6"
    );

    console.log(
      "General Users: 5"
    );

    console.log(
      "Admins: 1"
    );

    console.log(
      "Records created: 12"
    );

    console.log("");

    console.log(
      "GENERAL USER LOGIN"
    );

    console.log(
      "------------------------------------------"
    );

    console.log(
      "user1 / user123"
    );

    console.log(
      "user2 / user123"
    );

    console.log(
      "user3 / user123"
    );

    console.log(
      "user4 / user123"
    );

    console.log(
      "user5 / user123"
    );

    console.log("");

    console.log(
      "ADMIN LOGIN"
    );

    console.log(
      "------------------------------------------"
    );

    console.log(
      "admin / admin123"
    );

    console.log(
      "=========================================="
    );

    console.log("");


    await mongoose.disconnect();

    process.exit(0);

  } catch (error) {

    console.error("");

    console.error(
      "DATABASE SEED FAILED"
    );

    console.error(
      error.message
    );

    console.error("");

    process.exit(1);
  }
}


seedDatabase();