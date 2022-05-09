import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
    isaddress: 'ss', //상점 아이템 url주소값용
    setIsaddress: (input) => set({ isaddress: input }),//상점 아이템 url주소값용
    placeX: '200', //미니룸 아이템 배치 좌표저장용
    placeY: '200', //미니룸 아이템 배치 좌표저장용
    setplaceX: (input) => set({placeX:input}), //미니룸 아이템 배치 좌표저장용
    setplaceY: (input) => set({placeY:input}), //미니룸 아이템 배치 좌표저장용

  })

const useStore = create(devtools(store));

export default useStore;