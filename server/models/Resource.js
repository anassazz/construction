import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  resourceName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Matériel', 'Logiciel', 'Humain', 'Autre','Equipment','Software'] // Liste de types possibles
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  supplier: {
    type: String,
    required: true,
    trim: true
  }
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
