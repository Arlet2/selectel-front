import { ReactNode } from "react"

import styles from './styles.module.css';

interface IPageLayoutProps {
    header: ReactNode;
    footer: ReactNode;
    children: ReactNode;
}

/* Компонент лэйаута страницы */

export const PageLayout: React.FC<IPageLayoutProps> = ({header, footer, children}) => {
    return (
        <div className={styles.container}>
            {header}
            <div className={styles.wrapper}>
                {children}
            </div>
            {footer}
        </div>
    )
}