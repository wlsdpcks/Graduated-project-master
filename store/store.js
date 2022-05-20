import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set => ({
    tooladdress: '', //상점 아이템 url주소값용
    settooladdress: (input) => set({ istooladdress: input }),//상점 아이템 url주소값용
    Backaddress: '', //상점 아이템 url주소값용
    setBacksaddress: (input) => set({ Backaddress: input }),//상점 아이템 url주소값용
    placeX: '', //미니룸 아이템 배치 좌표저장용
    setplaceX: (input) => set({placeX:input}), //미니룸 아이템 배치 좌표저장용
    placeY: '', //미니룸 아이템 배치 좌표저장용
    setplaceY: (input) => set({placeY:input}), //미니룸 아이템 배치 좌표저장용
    FolderName: '', //상점 아이템 url주소값용
    setFolderName: (input) => set({ FolderName: input }),//상점 아이템 url주소값용
    PhotoName: '', //상점 아이템 url주소값용
    setPhotoName: (input) => set({ Photo: input }),//상점 아이템 url주소값용
    Post: '', //상점 아이템 url주소값용
    SetPost: (input) => set({ Post: input }),//상점 아이템 url주소값용
    Body: '', //상점 아이템 url주소값용
    SetBody: (input) => set({ Body: input }),//상점 아이템 url주소값용
    
    
    name:'',// 에딧프로필 수정용
    age:'',// 에딧프로필 수정용
    about:'',// 에딧프로필 수정용
    phone:'',// 에딧프로필 수정용
    birthday:'',// 에딧프로필 수정용
    userImg:'',// 에딧프로필 수정용
    setname: (input) => set({name:input}), // 에딧프로필 수정용
    setage: (input) => set({age:input}), // 에딧프로필 수정용
    setabout: (input) => set({about:input}), // 에딧프로필 수정용
    setphone: (input) => set({phone:input}), // 에딧프로필 수정용
    setbirthday: (input) => set({birthday:input}), // 에딧프로필 수정용
    setuserImg: (input) => set({userImg:input}), // 에딧프로필 수정용
  }));

const useStore = create(devtools(store));

export default useStore;