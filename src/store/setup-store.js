import { create } from "zustand";

export const useSetupStore = create((set) => ({
    personalDetails: {
        name: "",
        email: "",
        phone: "",
        dob: "",
        industry: "",
        profession: "",
        state: "",
        pin: ""
    },
    bankDetails: {
        recipient: "",
        accountNo: "",
        ifsc: "",
        branch: ""
    },
    skillDetails: {
        type: "",
        category: "",
        skills: []
    },
    component: 0,

    setPersonalDetails: (state) => set({ personalDetails: state }),
    setBankDetails: (state) => set({ bankDetails: state }),
    setSkillDetails: (state) => set({ skillDetails: state }),
    compState: (state) => set({ component: state })

}));