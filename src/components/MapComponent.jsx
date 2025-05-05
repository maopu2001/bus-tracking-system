"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { timeDiff } from "../libs/timeDiff";

const UniversityLoc = [22.613093, 92.164563];

const ZoomIn = 18;
const NormalZoom = 13;
const InitialView = {
  lat: 22.65802316870434,
  lng: 92.17314352612269,
  zoom: NormalZoom,
};

const MapComponent = ({ buses, busLoc, type }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    
    mapRef.current = L.map("map").setView(
      [InitialView.lat, InitialView.lng],
      InitialView.zoom
    );

    const varsityIcon = L.icon({
      iconUrl: "/loc-icon.png",
      iconSize: [60, 55],
      iconAnchor: [30, 55],
      popupAnchor: [0, -60],
    });

    if (type === "carto")
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { attribution: "© Zero Or One", maxZoom: 18 }
      ).addTo(mapRef.current);
    else
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© Zero Or One",
        maxZoom: 18,
      }).addTo(mapRef.current);

    // Add University Location
    L.marker(UniversityLoc, { icon: varsityIcon })
      .bindPopup("Rangamati Science and Technology University")
      .addTo(mapRef.current)
      .on("click", () => mapRef.current?.setView(UniversityLoc, ZoomIn));

    const HomeButton = L.Control.extend({
      options: { position: "topright" },

      onAdd: function () {
        const btn = L.DomUtil.create(
          "button",
          "leaflet-bar leaflet-control leaflet-control-custom"
        );
        btn.innerHTML =
          '<svg viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>';
        btn.className =
          "bg-white hover:bg-white/80 rounded-md border-2 border-gray-300 w-10 h-10 grid place-content-center";
        btn.style.cursor = "pointer";
        btn.onclick = () => {
          mapRef.current?.setView(
            [InitialView.lat, InitialView.lng],
            InitialView.zoom
          );
        };

        return btn;
      },
    });

    mapRef.current.addControl(new HomeButton());
    updateBusMarkers();
  }, [type]);


  const updateBusMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (!mapRef.current) return;

    buses.forEach((bus) => {
      const Info = busLoc.get(bus.id);
      if (!Info) return;

      const busIcon = L.divIcon({
        className: "custom",
        html: `
        <div style="position: relative;">
          <img src="/bus-icon.png" style="width: 32px; height: 32px;" />
          <div class="custom-bus-icon">${bus.id}</div>
        </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      });

      const marker = L.marker([Info.latitude, Info.longitude], {
        icon: busIcon,
      })
        .bindPopup(
          `
          <div class="text-center">
            <h3 class="font-bold">Bus No - ${bus.id} : ${bus.name}</h3>
            <p>Last Update: ${timeDiff(Info.lastUpdateTime)}</p>
          </div>
        `
        )
        .addTo(mapRef.current)
        .on("click", () =>
          mapRef.current?.setView([Info.latitude, Info.longitude], ZoomIn)
        );

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    updateBusMarkers();
  }, [buses, busLoc]);

  return <div id="map" className="h-[500px] w-full " />;
};

export default MapComponent;
