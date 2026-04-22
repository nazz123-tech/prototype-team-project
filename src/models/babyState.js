import { model, Schema } from "mongoose";

const babyStateSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 42
  },
  analogy: {
    type: String,
    required: true,
    trim: true
  },
  babySize: {
    type: Number,
    required: true
  },
  babyWeight: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: 'Некоректне посилання на зображення'
    }
  },
  babyActivity: {
    type: String,
    required: true
  },
  babyDevelopment: {
    type: String,
    required: true
  },
  interestingFact: {
    type: String,
    required: true
  },
  momDailyTips: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length === 7;
      }
    }
  }
}, {
  timestamps: true,
  collection: 'baby_states'
});
export const BabyState=model("BabyState",babyStateSchemaa)

