import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Référence au modèle "Project" ???
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
