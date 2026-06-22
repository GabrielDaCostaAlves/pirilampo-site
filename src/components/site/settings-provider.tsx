"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/constants";

const SettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function SettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SiteSettings {
  return useContext(SettingsContext);
}
