export type DemoBookingPayload = {
  companyName: string;
  designation: string;
  message: string;
  name: string;
  email: string;
  phone: string;
  purposes: string[];
  demoDate: string;
  demoSlot: string;
  interestedPlan: string;
  source: "navbar" | "pricing" | "hero" | "pricing-section";
};

const API_BASE = String(
  import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:8081/api",
).replace(/\/+$/, "");

export async function submitDemoBooking(payload: DemoBookingPayload) {
  const response = await fetch(`${API_BASE}/v1/client-demos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result?.message || "We could not book your demo. Please try again.");
  }
  return result;
}
