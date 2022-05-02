import styles from "./Box.module.less";

export const Box = ({ children }: { children: JSX.Element }) => <div className={styles.box}>{children}</div>;
