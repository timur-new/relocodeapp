import { createContext, useContext, useMemo, useState, ReactNode } from "react"

export type VisaKey = "EB-1A" | "EB-2 NIW" | "O-1" | "L-1A" | "H-1B"

export interface ExampleItem {
  title: string
  description?: string
  url?: string
  criterionId?: string
}

export interface FaqItem {
  question: string
  answer: string
  criterionId?: string
}

export interface VideoItem {
  title: string
  url: string
  criterionId?: string
}

interface AdminMaterialsState {
  examplesByVisa: Record<VisaKey, ExampleItem[]>
  faqsByVisa: Record<VisaKey, FaqItem[]>
  videosByVisa: Record<VisaKey, VideoItem[]>
  addExample: (visa: VisaKey, item: ExampleItem) => void
  addFaq: (visa: VisaKey, item: FaqItem) => void
  addVideo: (visa: VisaKey, item: VideoItem) => void
}

const AdminMaterialsContext = createContext<AdminMaterialsState | undefined>(undefined)

export function AdminMaterialsProvider({ children }: { children: ReactNode }) {
  const [examplesByVisa, setExamplesByVisa] = useState<Record<VisaKey, ExampleItem[]>>({
    "EB-1A": [
      { title: "Completed Awards Criterion Sample", description: "Annotated example for awards evidence", criterionId: "major-awards" },
    ],
    "EB-2 NIW": [
      { title: "NIW Proposed Endeavor Example", description: "Structure and evidence mapping" },
    ],
    "O-1": [],
    "L-1A": [],
    "H-1B": [],
  })

  const [faqsByVisa, setFaqsByVisa] = useState<Record<VisaKey, FaqItem[]>>({
    "EB-1A": [
      { question: "How many criteria should I target?", answer: "Aim for 4-6 with strong evidence.", criterionId: undefined },
    ],
    "EB-2 NIW": [],
    "O-1": [],
    "L-1A": [],
    "H-1B": [],
  })

  const [videosByVisa, setVideosByVisa] = useState<Record<VisaKey, VideoItem[]>>({
    "EB-1A": [
      { title: "How to present awards evidence", url: "https://example.com/video/awards" },
    ],
    "EB-2 NIW": [],
    "O-1": [],
    "L-1A": [],
    "H-1B": [],
  })

  const value = useMemo<AdminMaterialsState>(() => ({
    examplesByVisa,
    faqsByVisa,
    videosByVisa,
    addExample: (visa, item) => setExamplesByVisa(prev => ({ ...prev, [visa]: [...(prev[visa] ?? []), item] })),
    addFaq: (visa, item) => setFaqsByVisa(prev => ({ ...prev, [visa]: [...(prev[visa] ?? []), item] })),
    addVideo: (visa, item) => setVideosByVisa(prev => ({ ...prev, [visa]: [...(prev[visa] ?? []), item] })),
  }), [examplesByVisa, faqsByVisa, videosByVisa])

  return (
    <AdminMaterialsContext.Provider value={value}>
      {children}
    </AdminMaterialsContext.Provider>
  )
}

export function useAdminMaterials(): AdminMaterialsState {
  const ctx = useContext(AdminMaterialsContext)
  if (!ctx) throw new Error("useAdminMaterials must be used within AdminMaterialsProvider")
  return ctx
}

