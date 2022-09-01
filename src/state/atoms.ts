import { atom } from 'jotai'
import placeholder from '/public/images/placeholder.png'

export const blocksAtom = atom(24)
export const sourceImageAtom = atom<File | undefined>(undefined)
