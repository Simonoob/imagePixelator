import { atom } from 'jotai'

export const blocksAtom = atom(36)
export const sourceImageAtom = atom<File | undefined>(undefined)
export const sourceImageLoadedAtom = atom(false)
