import { atom } from "recoil";

export const darkModeState = atom({
    key: 'darkMode',
    default: 'dark'
  })

  export const moviesDataState = atom({
    key: 'moviesData',
    default: "",
  })