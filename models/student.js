//import required packeges
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String, //name of student
    batch: String, // Batch name or number
    college: String, // Name of the college
    status: String, // Placement status (e.g., "placed", "not_placed")
    DSAFinalScore: Number, // DSA (Data Structures and Algorithms) final score
    WebDFinalScore: Number, // Web Development final score
    ReactFinalScore: Number, // React final score
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model(`Student`, studentSchema);
module.exports = Student;
