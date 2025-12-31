import { setupPrefix } from './prefix';
import { setupValidation } from './validation';

export function setupApp(app: any) {
  setupPrefix(app);
  setupValidation(app);
}
