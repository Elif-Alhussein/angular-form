import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { usePreset } from '@primeng/themes';
import MyPreset from './theme/MyPresets';

usePreset(MyPreset);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
