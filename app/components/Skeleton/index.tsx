import cn from 'classnames';

import styles from './styles.module.css';

interface ISkeletonProps{
    view?: 'logo' | 'text' | 'rectangle'
}

export const Skeleton: React.FC<ISkeletonProps> = ({view = 'rectangle'}) => {
    return (
        <div className={cn(styles.skeleton, view)}></div>
    )

}