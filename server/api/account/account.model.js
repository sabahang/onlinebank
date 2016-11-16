'use strict';

import mongoose from 'mongoose';

var AccountSchema = new mongoose.Schema({
  name: String,
  sum: Number,
  active: Boolean
});

export default mongoose.model('Account', AccountSchema);
