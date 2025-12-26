import { renderPhotos } from './photo-render.js';
import { initializeForm } from './upload-form.js';
import './big-picture.js';
import './upload-form-validation.js';
import './image-preview-scale.js';
import './image-preview-effects.js';
import { loadData } from './fetch-data.js';
import { showAlertBox } from './alert-box.js';

loadData()
  .then((photoObjects) => renderPhotos(photoObjects))
  .catch(showAlertBox);

initializeForm();
