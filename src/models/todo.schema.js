const { Schema, model } = require("mongoose");
const todoSchema = new Schema(
  {
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    course: { type: String, required: true },
    platform: { type: String, required: true },
    start: { type: Date, default: "2023" },
    end: { type: Date, default: "2024" },
    status: { type: Boolean, default: false },
    userId:{type:String},
    userName:{type:String}
  },
  { versionKey: false }
);

const todoModel = model("todos", todoSchema);

module.exports = todoModel;
