import { model, models } from 'mongoose';
import busSchema from './buses';
import busRouteSchema from './busRoutes';
import locationSchema from './locations';

let Bus, BusRoute, Location;

export const initializeSchemas = () => {
  Bus = models.Bus || model('Bus', busSchema);
  BusRoute = models.BusRoute || model('BusRoute', busRouteSchema);
  Location = models.Location || model('Location', locationSchema);
};

export { Bus, BusRoute, Location };
