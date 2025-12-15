import { createContext, useContext, useState } from "react";

interface IAutoStatus {
    enabled: boolean;
    set_enabled: (val: boolean) => void;
}
const AutoStatus = createContext<IAutoStatus | null>(null);

export const useAutoStatus = () => {
    const currentAutoStatus = useContext(AutoStatus);
    if (!currentAutoStatus) {
        throw new Error("useAutoStatus must be used within a AutoStatusProvider");
    }

    return currentAutoStatus;
}

interface Iprops {
    children: React.ReactNode;
}
const AutoStatusProvider = (props: Iprops) => {
    const [enabled, set_enabled] = useState<boolean>(false);

    return (
        <AutoStatus.Provider value={{ enabled, set_enabled }}>
            {props.children}
        </AutoStatus.Provider>
    )
}

export default AutoStatusProvider;