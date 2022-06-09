import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set => ({
    tooladdress: '', //상점 아이템 url주소값용
    settooladdress: (input) => set({ tooladdress: input }),//상점 아이템 url주소값용
    Backaddress: '', //상점 아이템 url주소값용
    setBacksaddress: (input) => set({ Backaddress: input }),//상점 아이템 url주소값용
    isMinime: '', //상점 아이템 url주소값용
    setisMinime: (input) => set({ isMinime: input }),//상점 아이템 url주소값용
    
    placeX: '', //미니룸 아이템 배치 좌표저장용
    setplaceX: (input) => set({placeX:input}), //미니룸 아이템 배치 좌표저장용
    placeY: '', //미니룸 아이템 배치 좌표저장용
    setplaceY: (input) => set({placeY:input}), //미니룸 아이템 배치 좌표저장용
    isPoint: '', //미니룸 아이템 배치 좌표저장용
    setPoint: (input) => set({isPoint:input}), //미니룸 아이템 배치 좌표저장용


    BuyItem:'',
    setBuyItem: (input) => set({BuyItem:input}), //상점 - > 미니룸 랜더링용
    Itemhold:'',
    setItemhold: (input) => set({Itemhold:input}), //상점 - > 미니룸 랜더링용

    countItem:0,
    setcountItem: () => set(state => ({countItem:state.countItem+1})), //상점 - > 미니룸 랜더링용

    DiaryPost:'',
    setDiaryPost: (input) => set({DiaryPost:input}), //상점 - > 미니룸 랜더링용
    Checkday: new Date(),
    setCheckday2: (input) => set({Checkday:input}), //상점 - > 미니룸 랜더링용
    Lsearch: '',
    setLsearch: (input) => set({Lsearch:input}),
    
    Lsearchcount:0, //검색 새로고침용
    setLsearchcount: () => set(state => ({Lsearchcount:state.Lsearchcount+1})), //검색 새로고침용

    FolderName: '', //프로필 랜더링용
    setFolderName: (input) => set({ FolderName: input }),//프로필 랜더링용
    PhotoName: '', //프로필 랜더링용
    setPhotoName: (input) => set({ Photo: input }),//프로필 랜더링용
    Post: '', //프로필 랜더링용
    SetPost: (input) => set({ Post: input }),//프로필 랜더링용
    Body: '', //프로필 랜더링용
    SetBody: (input) => set({ Body: input }),//프로필 랜더링용
    
    
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