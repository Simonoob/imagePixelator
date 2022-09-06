import { atom } from 'jotai'

export const blocksAtom = atom(24)
export const sourceImageAtom = atom<File | undefined>(undefined)
export const sourceImageLoadedAtom = atom(false)
