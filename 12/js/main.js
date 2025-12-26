import { initializeForm } from './upload-form.js';
import './big-picture.js';
import './upload-form-validation.js';
import './image-preview-scale.js';
import './image-preview-effects.js';
import { loadData } from './fetch-data.js';
import { showAlertBox } from './alert-box.js';
import { initializeFiltering } from './filters.js';

loadData()
  .then((photoObjects) => initializeFiltering(photoObjects))
  .catch(showAlertBox);

initializeForm();
