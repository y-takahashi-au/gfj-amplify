import { defineBackend } from '@aws-amplify/backend';
import { createEvent } from './functions/create-event/resource.js';

defineBackend({
    createEvent,
});
