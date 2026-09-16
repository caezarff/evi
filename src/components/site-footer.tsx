"use client";

import { useEffect, useState } from "react";

const WEATHER_URL =
  "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-25.43&lon=-49.27";

type WeatherResponse = {
  properties?: {
    timeseries?: Array<{
      data?: {
        instant?: {
          details?: { air_temperature?: number };
        };
      };
    }>;
  };
};

const curitibaTime = () =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

export function SiteFooter({
  backgroundColor = "#fff",
  interactive = true,
}: {
  backgroundColor?: string;
  interactive?: boolean;
}) {
  const [time, setTime] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setTime(curitibaTime());
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch(WEATHER_URL);
        if (!response.ok) return;
        const weather = (await response.json()) as WeatherResponse;
        const value =
          weather.properties?.timeseries?.[0]?.data?.instant?.details
            ?.air_temperature;
        if (mounted && typeof value === "number" && Number.isFinite(value)) {
          setTemperature(value);
        }
      } catch {
        // Keep the placeholder when the weather service is unavailable.
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), 30 * 60_000);
    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <footer
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-6 gap-y-4 px-6 py-7 text-sm leading-none tracking-tight text-[#141414]/65 sm:px-10 lg:px-16 max-sm:grid-cols-2"
      style={{ backgroundColor }}
    >
      <span>evi @2026</span>
      <span className="text-center max-sm:col-span-2 max-sm:row-start-2">
        Entre luz e memória.
      </span>
      <div className="justify-self-end text-right">
        <div className="flex items-center justify-end gap-2 tabular-nums">
          <span>Curitiba</span>
          <span aria-hidden="true" className="opacity-40">
            /
          </span>
          <time>{time ?? "--:--"}</time>
          <span aria-hidden="true" className="opacity-40">
            /
          </span>
          <a
            href="https://docs.api.met.no/doc/License.html"
            title="Temperatura prevista por MET Norway · CC BY 4.0"
            aria-label={`Temperatura prevista para Curitiba: ${temperature === null ? "indisponível" : `${temperature.toFixed(1)} graus Celsius`}. Fonte: MET Norway, CC BY 4.0`}
            tabIndex={interactive ? 0 : -1}
            className="underline-offset-2 hover:underline"
          >
            {temperature === null ? "—°C" : `${temperature.toFixed(1)}°C`}
          </a>
        </div>
      </div>
    </footer>
  );
}
