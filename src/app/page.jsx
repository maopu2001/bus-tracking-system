"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FaBus, FaRoute } from "react-icons/fa";
import { useQuery } from "react-query";
import { Switch } from "@/components/ui/switch";

const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 animate-pulse rounded-lg"></div>
  ),
});

export default function Home() {
  const [type, setType] = useState("open");
  const [selectedRoute, setSelectedRoute] = useState(null);

  const { data: buses, isFetched: busesIsFetched } = useQuery({
    queryKey: ["buses"],
    queryFn: fetchBuses,
  });

  const { data: busRoutes, isFetched: busRoutesIsFetched } = useQuery({
    queryKey: ["busRoutes"],
    queryFn: fetchBusRoutes,
  });

  const { data: busLoc } = useQuery({
    queryKey: ["busLoc"],
    queryFn: fetchBusLoc,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchInterval: 10000, //every10 seconds
  });

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
            <FaBus className="text-4xl" />
            Track My Bus - RMSTU
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <label className="flex items-center mb-4 relative z-50 gap-2 cursor-pointer">
              <span className="font-bold">Select Map Type:</span>
              <span
                className={`rounded-md px-2 py-1 ${
                  type === "open" ? "bg-blue-200" : ""
                }`}
              >
                OpenSreetMap
              </span>
              <Switch
                checked={type === "carto"}
                onCheckedChange={(checked) =>
                  setType(checked ? "carto" : "open")
                }
              />
              <span
                className={`rounded-md px-2 py-1 ${
                  type === "carto" ? "bg-blue-200" : ""
                }`}
              >
                Carto
              </span>
            </label>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {busesIsFetched && (
                <MapComponent buses={buses} busLoc={busLoc} type={type} />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaRoute />
                Available Routes
              </h2>
              <div className="space-y-2">
                {busRoutesIsFetched &&
                  busRoutes?.map((busRoute) => (
                    <button
                      key={busRoute.id}
                      onClick={() => setSelectedRoute(busRoute.id)}
                      className={`w-full p-3 text-left rounded-lg transition-colors ${
                        selectedRoute === busRoute.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <b>Route - {busRoute.id}:</b> {busRoute.startingPoint} to{" "}
                      {busRoute.endingPoint}
                    </button>
                  ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Route Information</h2>
              {selectedRoute ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <b>Starting Point:</b>{" "}
                    {
                      busRoutes?.find((r) => r.id === selectedRoute)
                        ?.startingPoint
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Ending Point:</b>{" "}
                    {
                      busRoutes?.find((r) => r.id === selectedRoute)
                        ?.endingPoint
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Start Time:</b>{" "}
                    {busRoutes?.find((r) => r.id === selectedRoute)?.startTime}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Select a route to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const fetchBuses = async () => {
  const res = await fetch("/api/buses");
  const data = await res.json();
  return data.buses;
};

const fetchBusRoutes = async () => {
  const res = await fetch("/api/busRoutes");
  const data = await res.json();
  return data.busRoutes;
};

const fetchBusLoc = async () => {
  const res = await fetch("/api/busLoc");
  const data = await res.json();

  const busLocations = new Map();
  data.data.map((loc) =>
    busLocations.set(loc.id, {
      longitude: loc.lng,
      latitude: loc.lat,
      lastUpdateTime: loc.updatedAt,
    })
  );
  return busLocations;
};
