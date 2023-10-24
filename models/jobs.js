const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const geoCoder = require('../utils/geocoder');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Please enter Job title.'],
    trim: true,
    maxlength: [100, 'Job title con not exceed 100 characters.'],
  },
  slug: String,
  description: {
    type: String,
    require: [true, 'Please enter Job description.'],
    maxlength: [1000, 'Job title con not exceed 1000 characters.'],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please add a valid Email address.'],
  },
  address: {
    type: String,
    require: [true, 'Please add an address.'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  company: {
    type: String,
    require: [true, 'Please add company name.'],
  },
  industry: {
    type: [String],
    require: true,
    enum: {
      values: [
        'Business',
        'IT',
        'Banking',
        'Education',
        'Telecommunication',
        'Others',
      ],
      message: 'Please select correct options for industry.',
    },
  },
  jobType: {
    type: String,
    require: true,
    enum: {
      values: ['Permanent', ' Temporary', 'Internship'],
      message: 'Please select correct Job type.',
    },
  },
  mineducation: {
    type: String,
    require: true,
    enum: {
      values: ['Bachelor', 'Masters', 'Phd'],
      message: 'Please select correct options for education.',
    },
  },
  positions: {
    type: Number,
    default: 1,
  },
  experience: {
    type: String,
    require: true,
    enum: {
      values: [
        'No Experience',
        '1 Year - 2 Years',
        '2 Year - 5 Years',
        '5 Years+',
      ],
      message: 'Please select correct options for Experience',
    },
  },
  salary: {
    type: Number,
    require: [true, 'Please enter expected salary for this job.'],
  },
  postinDate: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
  },
  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

// creating Job slug before save
jobSchema.pre('save', function (next) {
  // Create slug before save into DB
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Setting up Location
jobSchema.pre('save', async function (next) {
  const loc = await geoCoder.geocode(this.address);

  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
});

module.exports = mongoose.model('Job', jobSchema);
