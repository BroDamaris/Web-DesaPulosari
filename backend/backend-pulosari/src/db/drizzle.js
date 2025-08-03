import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../models/schema';

export const createDb = (d1) => drizzle(d1, { schema });
