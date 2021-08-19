const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    location: String,
    remote: Boolean,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    link: String,
    contractType: {
      type: String,
      enum: ['CDD', 'CDI', 'Part-time', 'Freelance', 'Internship'],
    },
    level: {
      type: String,
      enum: ['junior', 'experienced', 'senior', 'expert'],
    },
    company: String,
    type: {
      type: String,
      enum: ['Web Dev', 'UI/UX', 'Data Analyse', 'Cyber Security'],
    },
  },
  {
    // timestamps: {
    //     createdAt: "posted_at",
    //     updatedAt: "updated_at"
    // }
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
