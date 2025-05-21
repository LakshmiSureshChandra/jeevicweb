import { useQuery } from "@tanstack/react-query";

// Mock data for gift options
const mockGiftOptions = [
  { id: 1, name: "Gift Box 1", description: "A beautiful gift box", price: 29.99 },
  { id: 2, name: "Gift Set 2", description: "Luxury gift set", price: 49.99 },
  { id: 3, name: "Custom Gift 3", description: "Personalized gift option", price: 39.99 },
  // Add more mock gift options as needed
];

export function useGetGiftOptions() {
  return useQuery({
    queryKey: ["giftOptions"],
    queryFn: () => Promise.resolve(mockGiftOptions),
  });
}

export function useGetGiftOption(id) {
  return useQuery({
    queryKey: ["giftOption", id],
    queryFn: () => Promise.resolve(mockGiftOptions.find(option => option.id === id)),
  });
}
