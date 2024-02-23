import { ReactNode } from "react"
import { Toaster } from 'react-hot-toast';

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
            <Toaster position="bottom-right"/>
            {header}
            <div className={styles.wrapper}>
                {children}
            </div>
            {footer}
        </div>
    )
}
