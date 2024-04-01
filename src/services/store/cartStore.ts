import {create} from 'zustand';

interface Products{
    id:null  | String,

}

interface CartState{
    qt: null | number,
    setQt: (number:number)=>void;
    removeQt: (number: number)=> void;

}

export const useCartStore = create<CartState>((set)=>({
    qt: 0,
    setQt: (number) => set((state) => ({ qt: state.qt + number })),
    removeQt: (number)=> set((state)=> ({qt: state.qt-number}))

}))