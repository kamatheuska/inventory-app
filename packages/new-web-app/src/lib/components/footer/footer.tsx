import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.root}>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Copyright Nicolas Ramirez
            </a>
        </footer>
    );
}
