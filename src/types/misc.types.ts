/**
 * @brief list interface for the landing page
 */
export interface LandingPageList {
    title: string;
    description: string;
    icon: string;
}

/**
 * @brief Props for the Sidebar component.
 */
export interface SidebarProps {
    toggleSideBar: () => void;
    isOpen: boolean;
}
