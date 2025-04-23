import { getGiftOption, getGiftOptions } from "../apis/GiftOptionApi";

export function useGetGiftOptions() {
  return useQuery({ queryKey: ["giftOptions"], queryFn: getGiftOptions });
}

export function useGetGiftOption(id) {
  return useQuery({
    queryKey: ["giftOption", id],
    queryFn: () => getGiftOption(id),
  });
}
